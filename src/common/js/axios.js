import Axios from 'axios'

export default function GetDate (api, method, url, params) {
  url = api + url
  return new Promise((resolve, reject) => {
    Axios({
      method: method,
      url: url,
      data: params
    })
      .then(function (response) {
        resolve(response.data)
      })
      .catch(function (error) {
        reject(error)
      })
  })
}