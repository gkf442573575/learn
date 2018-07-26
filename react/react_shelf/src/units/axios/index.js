import axios from 'axios';
import Qs from 'qs';
const basepath = document.querySelector("input[name='basepath']").getAttribute('value');
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.transformRequest = [function(data) {
    let newData = ''
    for (let k in data) {
        newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
}];
axios.defaults.baseURL = basepath;
axios.defaults.withCredentials = true;
axios.defaults.paramsSerializer = function(params) {
    return Qs.stringify(params);
}
axios.defaults.timeout = 5000;

export default axios;