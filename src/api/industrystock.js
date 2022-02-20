import request from '../utils/request';

export function pageQuery (query) {
  return request({
    url: '/manage/industry/page',
    method: 'get',
    params: query
  })
}