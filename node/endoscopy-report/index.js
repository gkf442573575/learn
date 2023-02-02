import fetch from 'node-fetch';
import * as https from 'https';
import xlsx from 'node-xlsx';

import { mkdirSync, writeFileSync, existsSync, createWriteStream } from 'fs';
import { join } from 'path';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const PACS_URL_IP = '172.22.52.60';
const RIS_PORT = 8443;

const JSESSIONID = 'DE9253C17E49FD7018B313BAF3123BA2';
const io = 'mPwszvYnVOLTKIcyAQDC';

const PATIENTID_INDEX = 1 // 流水号 头部第几项
const REGID_INDEX = 3 // 登记号 头部第几项
const EXCEL_PATH = './list1.xlsx' // 表格路径

const headers = {
  Cookie: `strongFlag=2; JSESSIONID=${JSESSIONID}; io=${io}`,
};

function getReport(patientId, regId) {
  const url = `https://${PACS_URL_IP}:${RIS_PORT}/zyPacs//report/getPatInfoByRegId?regId=${regId}`;
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers,
      body: null,
      method: 'POST',
      mode: 'cors',
      agent: httpsAgent,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.patInfo && res.patInfo.reportContent) {
          writeFileSync(
            join(__dirname, `report/${patientId}_${regId}/report.json`),
            JSON.stringify(res.patInfo, null, 2),
            'utf-8'
          );
          const reportContent = res.patInfo.reportContent;
          const reg = /https\:\/\/[\/\.\:\w\s\=]+?\/preview/g;
          const imgList = reportContent.match(reg);
          resolve(imgList || []);
        } else {
          resolve([]);
        }
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function downloadImg(url, patientId, regId, index) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      agent: httpsAgent,
    })
      .then((res) => {
        res.body.pipe(
          createWriteStream(
            join(__dirname, `report/${patientId}_${regId}/${index}.png`)
          )
        );
        resolve(`${patientId} >>> ${index}图像下载成功`);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function downLoadReport(patientId, regId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (!regId) {
        resolve();
        return;
      }
      const patientPath = join(__dirname, `report/${patientId}_${regId}`);
      if (!existsSync(patientPath)) {
        mkdirSync(patientPath);
      }
      const imgList = await getReport(patientId, regId);
      let index = 1;
      for (const item of imgList) {
        let msg = await downloadImg(item, patientId, regId, index);
        console.log(msg);
        index++;
      }
      console.log(`${patientId} >>>> 下载完成`);
      resolve();
    } catch (error) {
      console.log(`${patientId} >>>> 下载出错 ${error}`);
      reject(error);
    }
  });
}

async function readXlsx(path) {
  const sheets = xlsx.parse(path);
  let data = sheets[0].data;
  data.splice(0, 1);
  for (const item of data) {
    if (item && item.length && item[PATIENTID_INDEX] && item[REGID_INDEX]) {
      await downLoadReport(item[PATIENTID_INDEX], item[REGID_INDEX]);
    }
  }
}

readXlsx(EXCEL_PATH);
