import Vue from 'vue'
import Router from 'vue-router'
import { routerMode } from '@/config/env'

Vue.use(Router)

export default new Router({
    mode: routerMode,
    routes: [
        {
            path: '/manage',
            component: (resovle) => { require(['../views/home.vue'], resovle) },
            children: [
                /**
                 * 首页
                 */
                {
                    name: 'index',
                    meta: {
                        title: '商城运营管理系统'
                    },
                    path: '/',
                    component: (resovle) => { require(['../views/index/index.vue'], resovle) }
                },
                /**
                 * 普通用户关系图
                 */
                {
                    name: 'relationMap',
                    meta: {
                        title: '平台用户关系图'
                    },
                    path: '/relationMap',
                    component: (resovle) => { require(['../views/index/relationMap.vue'], resovle) }
                },
                /**
                 * 前台业务
                 */
                {
                    name: 'business',
                    path: '/business',
                    component: (resovle) => { require(['../views/business/index.vue'], resovle) },
                    children: [
                        /**
                         * 用户管理
                         */
                        {
                            path: '/business/user/user-list',
                            meta: { title: '用户列表' },
                            component: (resovle) => { require(['../views/business/user/user-list.vue'], resovle) }
                        },
                        {
                            path: '/business/user/member-list',
                            meta: { title: '会员列表' },
                            component: (resovle) => { require(['../views/business/user/member-list.vue'], resovle) }
                        },
                        {
                            path: '/business/user/member-info/:userId',
                            name: 'memberInfo',
                            meta: { title: '会员详情' },
                            component: (resovle) => { require(['../views/business/user/member-info.vue'], resovle) }
                        },
                        {
                            path: '/business/user/level-list',
                            meta: { title: '会员等级规则' },
                            component: (resovle) => { require(['../views/business/user/level-list.vue'], resovle) }
                        },
                        {
                            path: '/business/user/level-info/:levelId',
                            name: 'levelInfo',
                            meta: { title: '会员规则编辑' },
                            component: (resovle) => { require(['../views/business/user/level-info.vue'], resovle) }
                        },
                        /**
                         * 商品管理
                         */
                        {
                            path: '/business/goods/index',
                            meta: { title: '商品列表' },
                            component: (resovle) => { require(['../views/business/goods/index.vue'], resovle) }
                        },
                        {
                            path: '/business/goods/add',
                            meta: { title: '商品添加' },
                            component: (resovle) => { require(['../views/business/goods/add.vue'], resovle) }
                        },
                        {
                            path: '/business/goods/info',
                            meta: { title: '商品编辑' },
                            component: (resovle) => { require(['../views/business/goods/info.vue'], resovle) }
                        },
                        /**
                         * 订单管理
                         */
                        {
                            path: '/business/order/index',
                            meta: { title: '订单列表', keepAlive: true },
                            component: (resovle) => { require(['../views/business/order/index.vue'], resovle) }
                        },
                        {
                            path: '/business/order/info/:orderId',
                            name: 'orderInfo',
                            meta: { title: '订单详情' },
                            component: (resovle) => { require(['../views/business/order/info.vue'], resovle) }
                        },
                        {
                            path: '/business/order/refund',
                            meta: { title: '退货订单管理' },
                            component: (resovle) => { require(['../views/business/order/refund.vue'], resovle) }
                        },
                        {
                            path: '/business/order/refundInfo/:refundId',
                            name: 'refundInfo',
                            meta: { title: '退货订单详情' },
                            component: (resovle) => { require(['../views/business/order/refundInfo.vue'], resovle) }
                        },

                        /**
                         * 数据报表
                         */
                        {
                            path: '/business/report/order',
                            meta: { title: '订单系统' },
                            component: (resovle) => { require(['../views/business/report/order.vue'], resovle) }
                        },
                        {
                            path: '/business/report/addUser',
                            meta: { title: '综合概况' },
                            component: (resovle) => { require(['../views/business/report/addUser.vue'], resovle) }
                        },
                        {
                            path: '/business/report/addShop',
                            meta: { title: '交易概况' },
                            component: (resovle) => { require(['../views/business/report/addShop.vue'], resovle) }
                        },
                        {
                            path: '/business/report/shopRank',
                            meta: { title: '订单销售排行' },
                            component: (resovle) => { require(['../views/business/report/shopRank.vue'], resovle) }
                        },

                        /**
                         * 广告管理
                         */
                        {
                            path: '/business/ad/index',
                            meta: {keepAlive: true},
                            component: (resovle) => { require(['../views/business/ad/index.vue'], resovle) }
                        },
                        {
                            path: '/business/ad/info',
                            component: (resovle) => { require(['../views/business/ad/info.vue'], resovle) }
                        },
                        {
                            path: '/business/ad/type',
                            component: (resovle) => { require(['../views/business/ad/type.vue'], resovle) }
                        },
                        // {
                        //     path: '/business/article/edit',
                        //     component: (resovle) => { require(['../views/business/article/edit.vue'], resovle) }
                        // },

                        // 财务管理
                        {
                            path: '/business/finance/put-forward',
                            component: (resovle) => { require(['../views/business/finance/put-forward.vue'], resovle) }
                        },
                        {
                            path: '/business/finance/user-finance',
                            component: (resovle) => { require(['../views/business/finance/user-finance.vue'], resovle) }
                        },
                        // 优惠券管理
                        {
                            path: '/business/coupon/template',
                            component: (resovle) => { require(['../views/business/coupon/template.vue'], resovle) }
                        },
                        {
                            path: '/business/coupon/active',
                            component: (resovle) => { require(['../views/business/coupon/active.vue'], resovle) }
                        },
                        {
                            path: '/business/coupon/total',
                            component: (resovle) => { require(['../views/business/coupon/total.vue'], resovle) }
                        },
                        // 活动管理
                        {
                            path: '/business/active/type',
                            component: (resovle) => { require(['../views/business/active/type.vue'], resovle) }
                        },
                        {
                            path: '/business/active/weekbuy',
                            component: (resovle) => { require(['../views/business/active/weekbuy.vue'], resovle) }
                        },
                        {
                            path: '/business/active/billboard',
                            component: (resovle) => { require(['../views/business/active/billboard.vue'], resovle) }
                        },
                        {
                            path: '/business/active/seckill',
                            component: (resovle) => { require(['../views/business/active/seckill.vue'], resovle) }
                        },
                        // 店铺管理
                        {
                            path: '/business/shop/list',
                            meta: { title: '店铺列表' },
                            component: (resovle) => { require(['../views/business/shop/list.vue'], resovle) }
                        },
                        {
                            path: '/business/shop/info',
                            component: (resovle) => { require(['../views/business/shop/info.vue'], resovle) }
                        },
                        {
                            path: '/business/shop/statistics',
                            meta: { title: '店铺流水' },
                            component: (resovle) => { require(['../views/business/shop/statistics.vue'], resovle) }
                        }

                    ]
                },
                /**
                 * 系统管理
                 */
                {
                    name: 'system',
                    path: '/system',
                    component: (resovle) => {
                        require(['../views/system/index.vue'], resovle)
                    },
                    children: [
                        // 网站设置
                        {
                            path: '/system/setting/website',
                            component: (resovle) => { require(['../views/system/setting/website.vue'], resovle) }
                        },
                        /** **************权限管理************/
                        {
                            path: '/system/admin/role',
                            component: (resovle) => { require(['../views/system/admin/role.vue'], resovle) }
                        },
                        {
                            path: '/system/admin/role-child',
                            component: (resovle) => { require(['../views/system/admin/role-child.vue'], resovle) }
                        },
                        {
                            path: '/system/admin/webpage',
                            component: (resovle) => { require(['../views/system/admin/webpage.vue'], resovle) }
                        },
                        {
                            path: '/system/admin/webpage-child',
                            component: (resovle) => { require(['../views/system/admin/webpage-child.vue'], resovle) }
                        },
                        {
                            path: '/system/admin/administrators',
                            component: (resovle) => { require(['../views/system/admin/administrators.vue'], resovle) }
                        },
                        {
                            path: '/system/admin/authority',
                            component: (resovle) => { require(['../views/system/admin/authority.vue'], resovle) }
                        },
                        /**
                         * 日志管理
                         */
                        {
                            path: '/system/log/system-logs',
                            meta: { title: '系统日志管理' },
                            component: (resovle) => { require(['../views/system/log/system-logs.vue'], resovle) }
                        },
                        {
                            path: '/system/log/port-logs',
                            meta: { title: '接口日志' },
                            component: (resovle) => { require(['../views/system/log/port-logs.vue'], resovle) }
                        },
                        {
                            path: '/system/log/user-logs',
                            meta: { title: '登录接口日志' },
                            component: (resovle) => { require(['../views/system/log/user-logs.vue'], resovle) }
                        },
                        /**
                         * APP管理
                         */
                        {
                            path: '/system/app/version',
                            meta: { title: '版本管理' },
                            component: (resovle) => { require(['../views/system/app/version.vue'], resovle) }
                        },
                        {
                            path: '/system/app/software',
                            meta: { title: '软件管理' },
                            component: (resovle) => { require(['../views/system/app/software.vue'], resovle) }
                        }
                    ]
                },
                /**
                 * 数据管理
                 */
                {
                    name: 'data',
                    path: '/data',
                    component: (resovle) => { require(['../views/data/index.vue'], resovle) },
                    children: [
                        {
                            path: '/data/store/index',
                            component: (resovle) => { require(['../views/data/store/index.vue'], resovle) }
                        },
                        {
                            name: 'goodsAttr',
                            path: '/data/goods/goods-attr/:goodsClassId',
                            meta: { title: '属性管理' },
                            component: (resovle) => { require(['../views/data/goods/goods-attr.vue'], resovle) }
                        },
                        {
                            path: '/data/goods/goods-type-relation',
                            meta: { title: '商品属性' },
                            component: (resovle) => { require(['../views/data/goods/goods-type-relation.vue'], resovle) }
                        },
                        /**
                         * 基础数据管理
                         */
                        {
                            path: '/data/basis/goods-type',
                            meta: { title: '商品类型' },
                            component: (resovle) => { require(['../views/data/basis/goods-type.vue'], resovle) }
                        },
                        {
                            path: '/data/basis/goods-attr',
                            meta: { title: '商品属性' },
                            component: (resovle) => { require(['../views/data/basis/goods-attr.vue'], resovle) }
                        },
                        {
                            path: '/data/basis/goods-spec',
                            meta: { title: '商品规格管理' },
                            component: (resovle) => { require(['../views/data/basis/goods-spec.vue'], resovle) }
                        },
                        /**
                         * 品牌管理
                         */
                        {
                            path: '/data/brand/list',
                            meta: { title: '品牌列表' },
                            component: (resovle) => { require(['../views/data/brand/list.vue'], resovle) }
                        },
                        // {
                        //     path: '/data/brand/info',
                        //     meta: { title: '品牌详情' },
                        //     component: (resovle) => { require(['../views/data/brand/info.vue'], resovle) }
                        // },
                        /**
                         * 类目管理
                         */
                        {
                            path: '/data/type/app-list',
                            meta: { title: '前台类目' },
                            component: (resovle) => { require(['../views/data/type/app-list.vue'], resovle) }
                        },
                        {
                            path: '/data/type/basis-list',
                            meta: { title: '后台基础类目' },
                            component: (resovle) => { require(['../views/data/type/basis-list.vue'], resovle) }
                        }
                    ]
                },
                {
                    name: 'asd',
                    path: '/test/index',
                    component: (resovle) => { require(['../views/test/index.vue'], resovle) },
                    children: [
                        {
                            path: '/test/concurrent',
                            component: (resovle) => { require(['../views/test/concurrent.vue'], resovle) }
                        }
                    ]
                }

            ]
        },
        {
            path: '/',
            meta: {
                title: '登录',
                auth: false
            },
            component: (resovle) => { require(['../views/login/index.vue'], resovle) }
        }
    ]
})
