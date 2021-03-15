const fetch = require('node-fetch');
const fs = require('fs')


fetch(
  'http://coronary.platform.shukun.net:9090/api/coronary/cases?end=2021-03-01&limit=50&order_by=study_datetime%3Adesc&page=9&search=&start=2020-11-01&straitness=&type=all',
  {
    headers: {
      accept: '*/*',
      'accept-language': 'zh-CN,zh;q=0.9',
      authorization: 'Bearer c5979fc686394217b300067c9a5de5bd',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'response-language': 'zh',
      cookie:
        'lng=zh-CN; platform-token=Bearer%20c5979fc686394217b300067c9a5de5bd',
    },
    referrer:
      'http://coronary.platform.shukun.net:9090/?endAt=2021-03-01&orderBy=study_datetime%3Adesc&page=1&startAt=2020-11-01',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
  }
)
  .then((r) => r.json())
  .then((res) => {
    let a = []
    let count = 0
    let childLen = 0
    res.items.forEach(item => {
      count += item.count
      childLen = childLen +  item.children.length
      a = item.children.concat(a)
    });
    console.log('childLen', childLen)
    console.log('count', count)
    // console.log('childLen', childLen)
    // fs.writeFileSync('case.json', JSON.stringify(res), 'utf8')
  }).catch(err => {
    console.log('err', err)
  });
