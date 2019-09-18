import request from './request';
const apiBase = '/api';

const Api = () => {
  getGoods = () => {
    return request({
      url: `${apiBase}/goods`,
      method: 'get'
    })
  }
}

export default Api;