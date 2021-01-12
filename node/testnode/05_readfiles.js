const fs = require('fs')
const path = require('path')
// 模糊匹配
const glob = require("glob")

const files =  glob.sync('12*_n.json', {
  cwd: path.resolve(__dirname, 'file'),
  nodir: true,
  nosort: true
})
console.log('files', files)
const ishave =  fs.existsSync(path.resolve(__dirname, 'file/123_1_n.json'))

console.log('ishave', ishave)