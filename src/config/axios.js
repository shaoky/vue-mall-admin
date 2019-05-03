import axios from '../config/http'
import { baseUrl } from '../config/env'

export default async (url = '', data = {}, type = 'POST') => {
    return new Promise((resolve, reject) => {
        url = baseUrl + url
        // console.log(url, data.data)
        // axios.post(baseUrl + url, {}, {params: data.data})
        if (type === 'POST') {
            axios.post(url, data.data)
                .then(res => {
                    // res = res.data
                    if (res.data.code === 200) {
                        resolve(res.data)
                    } else {
                        reject(res.data)
                    }
                })
                .catch(err => {
                    reject(err)
                })
        }

        if (type === 'GET') {
            axios.get(url)
                .then(res => {
                    // res = res.data
                    resolve(res.data)
                })
                .catch(err => {
                    reject(err)
                })
        }
    })
}
