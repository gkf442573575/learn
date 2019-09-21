import request from './request';
const apiBase = '/api';

export const getGoods = () => {
  return request({
    url: `${apiBase}/goods`,
    method: 'get'
  });
}