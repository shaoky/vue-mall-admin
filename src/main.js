// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/less/main.less'
// Vue.prototype.$http.defaults.headers.common['Authorization'] = 11
// Vue.prototype.$http.defaults.headers.phoneType = 5
import * as types from './store/types.js'
import { getTimeStr } from './utils/date.js'

Vue.use(Element)
Vue.prototype.types = types

Vue.config.productionTip = false

Vue.filter('getTime', (value) => {
    if (!value) return ''
    return getTimeStr(value * 1000, 'yyyy-MM-dd hh:mm:ss')
})

router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = `${to.meta.title} - 商城运营管理系统`
    } else {
        document.title = '商城运营管理系统'
    }
    if (to.meta.auth === true) {
        if (store.getters.getToken.token) {
            next()
        } else {
            next({
                path: '/login/index'
            })
        }
    } else {
        next()
    }
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
