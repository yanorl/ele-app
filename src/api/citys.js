import GetDate from '../common/js/axios'

export function getCityInfo() {
    const api = '/api'
    const method = 'get'
    const url = '/posts/cities'
    const data = {}
    return GetDate(api, method, url, data)
}