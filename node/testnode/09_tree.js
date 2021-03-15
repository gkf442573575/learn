const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const token = 'c5979fc686394217b300067c9a5de5bd';

function getCases(page) {
  fetch(
    `http://coronary.platform.shukun.net:9090/api/coronary/cases?end=2021-03-01&limit=100&order_by=study_datetime%3Adesc&page=${page}&search=&start=2020-11-01&straitness=&type=all`,
    {
      headers: {
        accept: '*/*',
        'accept-language': 'zh-CN,zh;q=0.9',
        authorization: `Bearer ${token}`,
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        pragma: 'no-cache',
        'response-language': 'zh',
        cookie: `lng=zh-CN; platform-token=Bearer%${token}`,
      },
      referrer: `http://coronary.platform.shukun.net:9090/?endAt=2021-03-01&orderBy=study_datetime%3Adesc&page=${page}&startAt=2020-11-01`,
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    }
  )
    .then((r) => r.json())
    .then((res) => {
      let allcase = [];
      if (res && res.items) {
        for (let index = 0; index < res.items.length; index++) {
          if (res.items[index].children) {
            const child = res.items[index].children;
            allcase = child.map((item) => item.case_num).concat(allcase);
          }
        }
        // console.log('allcase', allcase.length)
        eachFile(allcase);
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
}

function eachFile(arr, index = 0) {
  if (index > arr.length - 1) {
    return;
  }
  treeLoad(arr[index], 1, 1, () => {
    index++;
    eachFile(arr, index);
  });
}

function getTree(one, two, caseId, cb) {
  const fileName = `tree${one}_${two}`;
  return new Promise((resolve, reject) => {
    fetch(
      `http://coronary.platform.shukun.net:9090/files/${caseId}/straight_seg/${fileName}/${fileName}.json`,
      {
        headers: {
          accept: '*/*',
          'accept-language': 'zh-CN,zh;q=0.9',
          'cache-control': 'no-cache',
          pragma: 'no-cache',
          cookie: `lng=zh-CN; platform-token=Bearer%${token}`,
        },
        referrer: `http://coronary.platform.shukun.net:9090/case?caseId=${caseId}`,
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
      }
    )
      .then((r) => r.buffer())
      .then((res) => {
        const caseIdPath = path.join(__dirname, '/trees/', caseId);
        if (!fs.existsSync(caseIdPath)) {
          fs.mkdirSync(caseIdPath);
        }
        const treePath = path.join(
          __dirname,
          `/trees/`,
          caseId,
          '/',
          fileName,
          '/'
        );
        if (!fs.existsSync(treePath)) {
          fs.mkdirSync(treePath);
        }
        fs.writeFileSync(`${treePath}${fileName}.json`, res, 'binary');
        const fileJson = fs.readFileSync(
          `${treePath}${fileName}.json`,
          'utf-8'
        );
        if (!isJson(fileJson)) {
          // 如果不是json就移除
          fs.unlinkSync(`${treePath}${fileName}.json`);
          fs.rmdirSync(treePath);
        }
        resolve();
      })
      .catch((err) => {
        reject();
      });
  });
}

function treeLoad(caseId, one = 1, two = 1, cb) {
  if (one === 3 && two === 21) {
    console.log(`执行完成 >>> ${caseId}`)
    //递归执行完成
    cb();
  } else {
    if (two === 21) {
      two = 1;
      one++;
    }
    const oneStr = String(one);
    const twoStr = two < 10 ? `0${two}` : String(two);
    // 递归
    getTree(oneStr, twoStr, caseId).then(() => {
      two++;
      treeLoad(caseId, one, two, cb);
    }).catch(() => {
      two++;
      treeLoad(caseId, one, two, cb);
    });
  }
}

function isJson(str) {
  try {
    JSON.parse(str);
    return true;
  } catch (error) {
    return false;
  }
}

// getCases(1);
// getCases(2);
// getCases(3);
// getCases(4);
// getCases(5);
