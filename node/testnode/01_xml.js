const fs = require('fs'),
  xml2js = require('xml2js')
const parser = new xml2js.Parser()
const builder = new xml2js.Builder()
const configPath = __dirname + '/file/app_config.xml'
fs.readFile(configPath, function (err, data) {
  parser.parseString(data, function (err, result) {
    let preferenceArr = result.widget.preference
    preferenceArr.forEach(item => {
      let attr = item['$']
      if (attr.name === 'launch_url') {
        attr.value = '111111'
      }
    })
    let xml = builder.buildObject(result)
    fs.writeFile(configPath, xml, function (err) {
      console.log(err)
    })
  })
})
