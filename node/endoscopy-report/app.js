const register = require('babel-register');

register({
  presets: ['env'],
});

module.exports = require('./index.js');
