import GetDate from '../common/js/axios'

export function getShopping(datasParams={}) {
  const api = '/api'
  const method = 'get'
  const url = '/profile/shopping'
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}

export function getFilter(datasParams={}) {
  const api = '/api'
  const method = 'get'
  const url = '/profile/filter'
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}

export function getshop(page, size, datasParams={}) {
  const api = '/api'
  const method = 'post'
  const url = `/profile/restaurants/${page}/${size}`
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}
