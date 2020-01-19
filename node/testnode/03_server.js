const express = require('express');

const app = express();


app.listen(3000, () => {
    console.log('服务已开启');
});

app.get('/', (req, res, next) => {
    const userAgent = req.headers['user-agent'];
    let mobileList = ['Android', 'android', 'iPhone', 'iphone']
    let isMobile = mobileList.filter(item => userAgent.indexOf(item) > -1).length > 0 ? true : false;
    console.log('isMobile', isMobile);
    res.end();
})