import axios from 'axios';
import Promise from 'promise-polyfill';
import Qs from 'qs';
// 创建axios实例
const service = axios.create({
    timeout: 5000, // 请求的超时时间
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

if (process.env.NODE_ENV == 'development') {    
    service.defaults.baseURL = 'https://www.baidu.com';} 
else if (process.env.NODE_ENV == 'debug') {    
    service.defaults.baseURL = 'https://www.ceshi.com';
} 
else if (process.env.NODE_ENV == 'production') {    
    service.defaults.baseURL = 'https://www.production.com';
}

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

export default service;


// axios 可以查看一下配置  dev环境可以在header携带cooike或者token
