import Axios from 'axios'
import { Indicator } from 'mint-ui'

export default function GetDate(api, method, url, params) {
    url = api + url
    return new Promise((resolve, reject) => {
        Axios({
                method: method,
                url: url,
                data: params
            })
            .then(function(response) {
                resolve(response.data)
            })
            .catch(function(error) {
                reject(error)
            })
    })
}

//请求拦截
Axios.interceptors.request.use(config => {
    Indicator.open()
    return config
}, error => {
    return Promise.reject(error)
})

//响应拦截
Axios.interceptors.response.use(response => {
    Indicator.close()
    return response
}, error => {
    Indicator.close()
    return Promise.reject(error)
})