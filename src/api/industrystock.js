import request from '../utils/request';

export function pageQuery (query) {
  return request({
    url: '/manage/industry/page',
    method: 'get',
    params: query
  })
}

export function readRecord (query) {
  return request({
    url: '/manage/industryRecord',
    method: 'post',
    params: query
  })
}