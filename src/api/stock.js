import request from '../utils/request';

export function pageQuery (query) {
    return request({
        url: '/manage/stocks/page',
        method: 'get',
        params: query
    })
}
