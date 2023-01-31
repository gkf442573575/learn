import fetch from 'node-fetch';
import * as https from 'https';
import { mkdirSync, writeFileSync, existsSync, createWriteStream } from 'fs';
import { join } from 'path';

const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

const PACS_URL_IP = '172.22.52.60';
const RIS_PORT = 8443;
const RIS_API_PORT = 8088;

const JSESSIONID = 'DE9253C17E49FD7018B313BAF3123BA2';
const io = 'mPwszvYnVOLTKIcyAQDC';

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
          const reg = /https\:\/\/[\/\.\:\w\s]+\={1}\/preview/g;
          const imgList = reportContent.match(reg);
          resolve(imgList);
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

function getRegIdByPatientId(patientId) {
  return new Promise((resolve, reject) => {
    const url = `https://${PACS_URL_IP}:${RIS_API_PORT}/getStudyListForMIV?patient_id=${patientId}`;
    fetch(url, {
      method: 'GET',
      mode: 'cors',
      agent: httpsAgent,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res.length) {
          resolve(res[0].reg_id || '');
        } else {
          reject(new Error('无reg'));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function downLoadReport(patientId) {
  return new Promise(async (resolve, reject) => {
    try {
      const reg_id = await getRegIdByPatientId(patientId);
      if (!reg_id) {
        throw Error('无regid');
      }
      const patientPath = join(__dirname, `report/${patientId}_${reg_id}`);
      if (!existsSync(patientPath)) {
        mkdirSync(patientPath);
      }
      const imgList = await getReport(patientId, reg_id);
      let index = 1;
      for (const item of imgList) {
        let msg = await downloadImg(item, patientId, reg_id, index);
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

downLoadReport('ES00043839');
