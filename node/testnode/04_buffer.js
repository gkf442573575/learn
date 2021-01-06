const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path')
var appid = 'wx23b8a7d8b44735de';
var secret = '60b257b6c0fc9286aca745b6a7907225';
fetch(
  'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' +
    appid +
    '&secret=' +
    secret
)
  .then((response) => response.json())
  .then((json) => json.access_token)
  .then((token) =>
    fetch(`https://api.weixin.qq.com/wxa/getwxacode?access_token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path: '/pages/index/index',
        line_color: {
          r: 76,
          g: 107,
          b: 241,
        },
        is_hyaline: true,
      }),
    })
  )
  .then((response) => response.buffer())
  .then((buffer) => {
    fs.writeFile(`${path.join(__dirname, '/imgs/')}test.png`, buffer, 'binary', (err) => {
      if (err) {
        console.log('生成失败');
      }
      console.log('文件生成成功');
    });
  });
