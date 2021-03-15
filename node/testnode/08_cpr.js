const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const token = 'c5979fc686394217b300067c9a5de5bd';
const failCasenum = [];
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
      referrer:
        `http://coronary.platform.shukun.net:9090/?endAt=2021-03-01&orderBy=study_datetime%3Adesc&page=${page}&startAt=2020-11-01`,
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
        eachFile(allcase)
      }
    })
    .catch((err) => {
      console.log('err', err);
    });
}

function eachFile(arr, index = 0){
  if(index > arr.length - 1){
    return
  }
  getcpr(arr[index], function() {
    index++
    eachFile(arr, index)
  })
}

function getcpr(caseId, cb) {
  fetch(`http://coronary.platform.shukun.net:9090/files/${caseId}/cpr.json`, {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'cache-control': 'no-cache',
      pragma: 'no-cache',
      authorization: 'Bearer ',
      cookie: `lng=zh-CN; platform-token=Bearer%${token}`,
    },
    referrer: `http://coronary.platform.shukun.net:9090/case?caseId=${caseId}&endAt=2021-03-01&page=1&startAt=2020-11-01`,
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  })
    .then((r) => r.buffer())
    .then((res) => {
      fs.writeFile(
        `${path.join(__dirname, '/cpr/')}${caseId}_cpr.json`,
        res,
        'binary',
        (err) => {
          if (err) {
            console.log(`生成失败 >>>${caseId}`);
            failCasenum.push(caseId);
          }
          console.log(`生成成功 >>>${caseId}`);
          cb()
        }
      );
    })
    .catch((err) => {
      failCasenum.push(caseId);
      console.log('err', err);
      cb()
    });
}

getCases(1);
getCases(2);
getCases(3);
getCases(4);
getCases(5);
