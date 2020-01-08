function changeQuery(name, value, url) {
  let reg = new RegExp('(^|)' + name + '=([^&]*)(|$)')
  let tmp = name + '=' + value
  if (url.match(reg) != null) {
    return url.replace(reg, tmp)
  } else {
    if (url.match('[/?]')) {
      return url + '&' + tmp
    } else {
      return url + '?' + tmp
    }
  }
}
let url =
  'https://www.ilingdai.com/pay/center/wxpay_mweb_app_trade?tradeSn=2019121710155611214'

url = changeQuery('rand', Date.parse(new Date()), url)

console.log('1', url)
setTimeout(() => {
  url = changeQuery('rand', Date.parse(new Date()), url)

  console.log('2', url)
}, 1000)
