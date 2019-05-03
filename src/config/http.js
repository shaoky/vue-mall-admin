/**
 * http配置
 */

import axios from 'axios'
import store from '../store'
import router from '../router'
import {baseUrl} from '../config/env'
import {Notification} from 'element-ui'

// let loading

// axios 配置
const http = axios.create({
    baseURL: baseUrl,
    timeout: 1000 * 1000, // 1 秒
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json'
    }
})
// axios.defaults.headers.phoneType = 5
// axios.defaults.headers.storeToken = '5abb0a4abffbd39eb88fae12'
// axios.defaults.headers.token = 'TVRBd01ERTFOakV3NDEyMjkzN2UyMTg5NGY2OGJkMDExZjJiNWZkZmVmYWY='

// http request 拦截器
http.interceptors.request.use(
    config => {
        // loading = Loading.service({ fullscreen: true, text: '疯狂加载中'})
        const token = store.getters.getToken.token
        if (token) {
            config.headers['Authorization'] = token
            config.headers['from'] = 1
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

// http response 拦截器
http.interceptors.response.use(
    response => {
        // loading.close()
        if (response.data.code === 401) {
            store.commit('delToken')
            store.commit('delUserInfo')
            router.push({'path': '/'})
            Notification({type: 'error', title: '出错了!', message: response.data.error})
            return
        }

        if (response.data.code !== 200) {
            console.log('拦截器返回出错了', response)
            Notification({type: 'error', title: '出错了!', message: response.data.error})
        }

        return response
    },
    error => {
        // console.log(router)
        // loading.close()
        if (error.response.status === 401) {
            store.commit('delToken')
            store.commit('delUserInfo')
            router.push({'path': '/'})
            Notification({type: 'error', title: '出错了!', message: '登录超时,请重新登录'})
        } else {
            Notification({type: 'error', title: '出错了!', message: error.response.data.error})
        }

        return Promise.reject(error)
    }
)

export default http
