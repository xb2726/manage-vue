import request from '../utils/request';


export function login (query) {
  return request({
    url: '/manage/login',
    method: 'post',
    params: query
  })
}

export function logout () {
  return request({
    url: '/manage/login/logout',
    method: 'get'
  })
}