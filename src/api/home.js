import GetDate from '../common/js/axios'

export function getShopping(datasParams={}) {
  const api = '/api'
  const method = 'get'
  const url = '/profile/shopping'
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}