import axios from 'axios';
import Qs from 'qs';
const basepath = document.querySelector("input[name='basepath']").getAttribute('value');
// 创建axios实例
const service = axios.create({
    baseURL: basepath,
    timeout: 5000, // 请求的超时时间
    //设置默认请求头，使post请求发送的是formdata格式数据
    headers: {
        "Content-Type": "application/x-www-form-urlencoded"
    },
    withCredentials: true, // 允许携带cookie
    transformRequest: [function(data) {
        let newData = ''
        for (let k in data) {
            newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
        }
        return newData
    }],
    paramsSerializer: function(params) {
        return Qs.stringify(params);
    }
})

export default service;