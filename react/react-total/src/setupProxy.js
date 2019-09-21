const proxy = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(proxy('/api', {
    target: 'http://192.168.0.121:4000',
    changeOrigin: true,
    pathRewrite: {
      "^/api": "/"
    }
  }))
}