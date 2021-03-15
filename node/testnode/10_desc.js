const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const token = '6b5a200896de40c0a50a43bca6aa24ca';
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
  getDesc(arr[index], function() {
    index++
    eachFile(arr, index)
  })
}

function getDesc(caseId, cb) {
  fetch(
    `http://coronary.platform.shukun.net:9999/api/coronary/reports/${caseId}/desc`,
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
      referrer: `http://coronary.platform.shukun.net:9999/case?caseId=${caseId}&endAt=2021-03-01&page=1&startAt=2020-11-01`,
      referrerPolicy: 'strict-origin-when-cross-origin',
      body: null,
      method: 'GET',
      mode: 'cors',
    }
  )
  .then(r => r.json())
    .then((r) => {
      const str = JSON.stringify(r)
      fs.writeFileSync(path.join(__dirname, '/desc/', `${caseId}_desc.json`), str, 'utf8')
      console.log('生成成功 >>> ', caseId)
      cb();
    })
    .catch(() => {
      console.log('生成失败 >>> ', caseId)
      cb();
    });
}

getCases(1);
getCases(2);
getCases(3);
getCases(4);
getCases(5);