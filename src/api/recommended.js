import GetDate from '../common/js/axios'

export function getFilter(datasParams={}) {
  const api = '/api'
  const method = 'get'
  const url = '/profile/filter'
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}