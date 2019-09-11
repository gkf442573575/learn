import queryString from 'query-string';

//检查请求状态
function checkStatus(response) {
  if (response.status >= 200 && response.status < 500) {
    return response
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}

export default function request(options = {}) {
  const { data, url } = options;
  options = { ...options }
  options.mode = 'cors'//跨域
  delete options.url;
  if (data) {
    delete options.data;
    options.body = options.isForm ? queryString.stringify(data) : data;
  }
  options.headers = {
    'Content-Type': options.isForm ? 'application/x-www-form-urlencoded' : 'application/json'
  }
  return new Promise((resolve, reject) => {
    fetch(url, options, { credentials: 'include' })
      .then(checkStatus)
      .then(response => { resolve(response.json) })
      .catch(error => { reject(error) })
  })
}