import request from '../utils/request';


export function login (query) {
  return request({
    url: '/manage/login',
    method: 'get',
    params: query
  })
}