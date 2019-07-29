import GetDate from '../common/js/axios'

export function PostSms(datasParams) {
  const api = '/api'
  const method = 'post'
  const url = '/posts/sms_send'
  const data = Object.assign({}, datasParams, {
  	tpl_id: '175794',
    key: "57a99f376f5f628340470390a059ec0f"
  })
  return GetDate(api, method, url, data)
}

export function GetSms (datasParams) {
  const api = '/api'
  const method = 'post'
  const url = '/posts/sms_back'
  const data = Object.assign({}, datasParams)
  return GetDate(api, method, url, data)
}