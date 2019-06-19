/**
 * 配置编译环境和线上环境之间的切换
 *
 * h5Url: web页面域名地址
 * baseUrl: api域名地址
 * routerMode: 路由模式
 * imgBaseUrl: 图片所在域名地址
 *
 */

// let h5Url = 'http://192.168.1.79:15010'
// 正式
// 测试
let baseUrl
// let baseUrl = 'http://192.168.3.197:8082/'
// let baseUrl = 'https://api.ggzlive.com'
let routerMode = 'history'
let imgBaseUrl

if (process.env.NODE_ENV === 'development') {
    // baseUrl = 'http://tp.test/'
    // baseUrl = 'http://192.168.3.58:82/'
    baseUrl = 'http://api.mall.shaoky.com/'
    imgBaseUrl = 'http://api.mall.shaoky.com/common/image/add'
} else if (process.env.NODE_ENV === 'production') {
    baseUrl = 'http://api.mall.shaoky.com/'
    imgBaseUrl = 'http://api.mall.shaoky.com/common/image/add'
}

export {
    baseUrl,
    // h5Url,
    routerMode,
    imgBaseUrl
}
