import axios from '../config/axios'

// export const addCart = (data) => axios('h5/cart/add')
// export const getCartList = (data) => axios('h5/cart/list')
export const getExcelWithdrawal = (data) => axios('admin/common/excel/withdrawal', {data})
export const getExcelOrder = (data) => axios('admin/common/excel/order', {data})
export const getExcelShop = (data) => axios('admin/common/excel/shop', {data})
// 商品图片添加
export const addShopImg = (data) => axios('admin/localgoods/imgadd', {data})

/**
 * 地区
 */
export const getRegion = (data) => axios('common/regions', {data})

/**
 * 用户登录
 */
export const login = (data) => axios('admin/login', {data})

/**
 * 获取用户信息
 */
export const getUserInfo = (data) => axios('admin/user/admin/info', {data})

/**
 * 用户修改密码
 */
export const resetPassword = (data) => axios('admin/user/admin/password', {data})

/**
 * 用户登出
 */
export const loginout = (data) => axios('admin/loginout', {data})

/**
 * 通用的-供应商列表
 */
export const getSupplierList = (data) => axios('admin/suppliers/lists', {data})

/**
 * 首页数据
 */
export const getIndexData = (data) => axios('admin/index', {data})
export const getRelationMap = (data) => axios('admin/relationMap', {data})

/**
 **************************** 前台业务 *************************************
 */

/**
 *************** 用户管理
 */
export const getUserList = (data) => axios('admin/user/list', {data})
export const getUserMemberList = (data) => axios('admin/user/member/list', {data})
export const setUserMemberAudit = (data) => axios('admin/user/member/audit', {data})
export const getUserMemberInfo = (data) => axios('admin/user/member/info', {data})
export const getUserChildrenMemberInfo = (data) => axios('admin/user/member/childrenInfo', {data})
export const addUserLevel = (data) => axios('admin/user/level/add', {data}) // 新增与编辑
export const getUserLevelList = (data) => axios('admin/user/level/list', {data})
export const getUserLevelInfo = (data) => axios('admin/user/level/info', {data})
export const delUserLevel = (data) => axios('admin/user/level/delete', {data})

/**
 *************** 商品管理
 */
export const addGoods = (data) => axios('admin/goods/add', {data})
export const getGoodsList = (data) => axios('admin/goods/list', {data})
export const delGoods = (data) => axios('admin/goods/delete', {data})
export const getGoodsInfo = (data) => axios('admin/goods/info', {data})
export const setGoodsOpen = (data) => axios('admin/goods/isOpen/set', {data})
export const updateGoods = (data) => axios('admin/goods/update', {data})
export const addGoodsImage = (data) => axios('admin/goods/image/add', {data})
export const delGoodsImage = (data) => axios('admin/goods/image/delete', {data})
export const getGoodsAttr = (data) => axios('admin/goods/attrList', {data})
export const addGoodsSeries = (data) => axios('admin/goods/series/add', {data})
export const updateGoodsSeries = (data) => axios('admin/goods/series/update', {data})
export const getGoodsSeriesList = (data) => axios('admin/goods/series/list', {data})
export const deleteGoodsSeries = (data) => axios('admin/goods/series/delete', {data})

// 商品属性

// export const getGoodsTypeList = (data) => axios('admin/goods/isOpen/set', {data})
/**
 *************** 订单管理
 */
export const getOrderList = (data) => axios('admin/order/list', {data})
export const getOrderInfo = (data) => axios('admin/order/info', {data})
export const setOrderDelivery = (data) => axios('admin/order/delivery', {data})
export const setOrderCancel = (data) => axios('admin/order/cancel', {data})
export const setOrderRefund = (data) => axios('admin/order/refund/set', {data})
export const getRefundList = (data) => axios('admin/order/refund/list', {data})
export const getRefundInfo = (data) => axios('admin/order/refund/info', {data})
export const updateRefund = (data) => axios('admin/order/refund/update', {data})
/**
 *************** 财务管理
 */
export const getPutForWard = (data) => axios('admin/user/withdrawal/list', {data})
export const getPutForWardInfo = (data) => axios('admin/user/withdrawal/info', {data})
export const editPutForWard = (data) => axios('admin/user/withdrawal/update', {data})
export const getUserFinance = (data) => axios('admin/user/finance/list', {data})
/**
 *************** 优惠券管理
 */
export const getTemplateList = (data) => axios('admin/coupon/index', {data})
export const addTemplateList = (data) => axios('admin/coupon/add', {data})
export const editTemplateList = (data) => axios('admin/coupon/update', {data})
export const updateTemplateState = (data) => axios('admin/coupon/update/state', {data})
export const delTemplate = (data) => axios('admin/coupon/delete', {data})
export const getTemplateGood = (data) => axios('admin/coupon/getattrgoods', {data})
export const getActiveList = (data) => axios('admin/coupon/active/index', {data})
export const addActive = (data) => axios('admin/coupon/active/add', {data})
export const editActive = (data) => axios('admin/coupon/active/update', {data})
export const updateActiveState = (data) => axios('admin/coupon/active/status', {data})
export const delActive = (data) => axios('admin/coupon/active/delete', {data})
export const getExchangeList = (data) => axios('admin/coupon/active/getredeem', {data})
export const getCouponTotal = (data) => axios('admin/coupon/count/list', {data})
/**
 *************** 数据报表
 */
export const getTransaction = (data) => axios('admin/statistics/transaction/profile', {data})
export const getComprehensive = (data) => axios('admin/statistics/comprehensive/overview', {data})

/**
 *************** 店铺管理
 */
export const getShopList = (data) => axios('admin/shop/list', {data})
export const getShopInfo = (data) => axios('admin/shop/info', {data})
export const getShopAdd = (data) => axios('admin/shop/add', {data})
export const getShopUpdate = (data) => axios('admin/shop/update', {data})
// 店铺设置折扣
export const updateDiscount = (data) => axios('admin/shop/discount/update', {data})
// 店铺审核
export const setShopAuditStatus = (data) => axios('admin/shop/auditStatus/set', {data})
// 店铺前端显示
export const setShopOpen = (data) => axios('admin/shop/isOpen/set', {data})
// export const getComprehensive = (data) => axios('admin/statistics/comprehensive/overview', {data})
// 店铺流水
export const getStatisticsList = (data) => axios('admin/shop/statistics/list', {data})
/**
 *************** 权限管理
 */
export const getRoleList = (data) => axios('admin/group/list', {data})
export const addRole = (data) => axios('admin/group/add', {data})
export const editRole = (data) => axios('admin/group/update', {data})
export const delRole = (data) => axios('admin/group/delete', {data})

export const getWebpage = (data) => axios('admin/auth/column/list', {data})
export const addWebpage = (data) => axios('admin/auth/column/add', {data})
export const editWebpage = (data) => axios('admin/auth/column/update', {data})
export const delWebpage = (data) => axios('admin/auth/column/delete', {data})

export const getAdminList = (data) => axios('admin/user/admin/list', {data})
export const addAdmin = (data) => axios('admin/user/admin/add', {data})
export const editAdmin = (data) => axios('admin/user/admin/update', {data})
export const delAdmin = (data) => axios('admin/user/admin/delete', {data})
export const editAdminPassword = (data) => axios('admin/user/admin/passwordReset', {data})

// 获取角色权限
export const getRoleAuthority = (data) => axios('admin/auth/column/getuser', {data})
export const addRoleAuthority = (data) => axios('/admin/auth/column/adduser', {data})

// 获取用户权限
export const getUserAuthority = (data) => axios('admin/auth/column/user', {data})

/**
 *************** 用户管理
 */

/**
 * 采购商列表
 */
export const getMerchants = (data) => axios('admin/merchants', {data})

/**
 * 获取采购商详情
 */
export const getMerchantsInfo = (data) => axios('admin/merchants/info', {data})

/**
 * 修改采购商信息
 */
export const editMerchants = (data) => axios('admin/merchants/patch', {data})

/**
 * 供应商列表
 */
export const getSuppliers = (data) => axios('admin/suppliers', {data})

/**
 *  编辑供应商
 */
export const editSuppliers = (data) => axios('admin/suppliers/edit', {data})

/**
 * 企业子帐号列表
 */
export const getSupplierchilds = (data) => axios('admin/supplierchilds', {data})

/**
 * 分销商列表
 */
export const getDistributors = (data) => axios('admin/distributors', {data})

/**
 *************** 数据报表
 */

// 订单统计
export const getOrdersCountlist = (data) => axios('orders/countlist', {data})

// 新增用户统计
export const getUserCount = (data) => axios('admin/usercount', {data})

// 商品新增统计
export const getGoodsCount = (data) => axios('admin/goodscount', {data})

// 商品销售排行
// export const getUserCount = (data) => axios('admin/countlist', {data})

/**
 *************** 广告管理
 */
// 广告内容管理
export const getAdList = (data) => axios('admin/ad/list', {data})
export const getAdInfo = (data) => axios('admin/ad/info', {data})
export const addAd = (data) => axios('admin/ad/add', {data})
export const updateAd = (data) => axios('admin/ad/update', {data})
export const delAd = (data) => axios('admin/ad/delete', {data})

//  广告位置管理
export const getAdPositionList = (data) => axios('admin/ad/position/list', {data})
export const addAdPosition = (data) => axios('admin/ad/position/add', {data})
export const updateAdPosition = (data) => axios('admin/ad/position/update', {data})
export const delAdPosition = (data) => axios('admin/ad/position/delete', {data})

/**
 *************** 数据报表
 */

/**
 * 订单统计
 */
export const countlist = (data) => axios('admin/statistics/orders', {data})

/**
 * 订单统计excel
 */
export const getOrderDataExcel = (data) => axios('admin/statistics/ordersExcel', {data})

/**
 * 新增用户统计
 */
export const addUsercount = (data) => axios('admin/usercount', {data})

/**
 * 新增商品统计
 */
export const addShopcount = (data) => axios('admin/goodscount', {data})

/**
 * 商品销售排行榜
 */
export const getGoodssales = (data) => axios('admin/statistics/goods', {data})

/**
 **************************** 系统管理 *************************************
 */

// app版本管理

// App列表
export const getAppversions = (data) => axios('admin/version/list', {data})

// 添加
export const addAppversions = (data) => axios('admin/version/add', {data})

// 编辑
export const editAppversions = (data) => axios('admin/version/update', {data})

// 删除
export const deleteAppversions = (data) => axios('admin/version/delete', {data})

// app软件管理

// 列表
export const getAppSoftware = (data) => axios('admin/software/list', {data})

// 添加
export const addAppSoftware = (data) => axios('admin/software/add', {data})

// 编辑
export const editAppSoftware = (data) => axios('admin/software/update', {data})

// 删除
export const deleteAppSoftware = (data) => axios('admin/software/delete', {data})

/**
 * 系统设置
 */
// 获取网站设置
export const getWebsite = (data) => axios('admin/setting/site/info', {data})
// 保存网站设置
export const saveWebsite = (data) => axios('admin/setting/site/update', {data})
// 获取用户管理列表
export const getAdmins = (data) => axios('admin/admins/all', {data})

// 获取指定的管理员账号
export const getAdminsOne = (data) => axios('admin/admins/one', {data})

// 修改指定的管理员账号
export const editAdminsOne = (data) => axios('admin/admins/update', {data})

// 获取权限组列表
export const getPermissions = (data) => axios('admin/groups', {data})

// 添加一个权限组
export const addPermissions = (data) => axios('admin/groups/list', {data})

// 修改指定权限组
export const editPermissions = (data) => axios('admin/groups/update', {data})

// 删除指定权限组
export const delPermissions = (data) => axios('admin/groups/delete', {data})

// 获取角色所有资源
export const getResources = (data) => axios('admin/resources', {data})

// 获取角色可访问资源
export const getPersonalgetResources = (data) => axios('admin/groups/resources/list', {data})

// 设置角色可访问资源
export const setResources = (data) => axios('admin/groups/resources', {data})

// 添加管理员
export const addAdmins = (data) => axios('admin/admins', {data})

// 重置密码
export const resetpassword = (data) => axios('admin/admins/password/reset', {data})

/**
 * 日志管理
 */

// 获取接口日志列表
export const getAdminlogs = (data) => axios('admin/log/operation/list', {data})

// 获取登录接口日志列表
export const getLoginlogs = (data) => axios('admin/log/login/list', {data})

/**
 **************************** 数据管理 *************************************
 */

/**
 * Poi店铺管理
 */

// 列表
export const getPoiStore = (data) => axios('admin/system/store/list', {data})

// 添加
export const addPoiStore = (data) => axios('admin/system/store/add', {data})

// 编辑
export const updatePoiStore = (data) => axios('admin/system/store/update', {data})

// 删除
export const deletePoiStore = (data) => axios('admin/system/store/delete', {data})

/**
 * 商品数据
 */

// 商品分类
export const getGoodsTypeList = (data) => axios('admin/goods/type/list', {data})
export const addGoodsType = (data) => axios('admin/goods/type/add', {data})
export const updateGoodsType = (data) => axios('admin/goods/type/update', {data})
export const delGoodsType = (data) => axios('admin/goods/type/delete', {data})
export const getGoodsTypeBasisInfo = (data) => axios('admin/goods/type/basis/info', {data})

// 商品属性
export const getGoodsAttrList = (data) => axios('admin/goods/attr/list', {data})
export const addGoodsAttr = (data) => axios('admin/goods/attr/add', {data})
export const updateGoodsAttr = (data) => axios('admin/goods/attr/update', {data})
export const delGoodsAttr = (data) => axios('admin/goods/attr/delete', {data})
// 商品属性关联
export const getGoodsAttrRelationList = (data) => axios('admin/goods/attrRelation/list', {data})
export const addGoodsAttrRelation = (data) => axios('admin/goods/attrRelation/add', {data})
export const updateGoodsAttrRelation = (data) => axios('admin/goods/attrRelation/update', {data})
export const delGoodsAttrRelation = (data) => axios('admin/goods/attrRelation/delete', {data})

/**
 * *************商品类型管理
 */
export const getGoodsBasisList = (data) => axios('admin/goods/basis/list', {data})
export const addGoodsBasis = (data) => axios('admin/goods/basis/add', {data})
export const updateGoodsBasis = (data) => axios('admin/goods/basis/update', {data})
export const getGoodsBasisInfo = (data) => axios('admin/goods/basis/info', {data})
export const delGoodsBasis = (data) => axios('admin/goods/basis/delete', {data})

/**
 * *************商品规格管理
 */
export const getGoodsSpecList = (data) => axios('admin/goods/spec/list', {data})
export const delGoodsSpec = (data) => axios('admin/goods/spec/delete', {data})
export const addGoodsSpec = (data) => axios('admin/goods/spec/add', {data})
export const updateGoodsSpec = (data) => axios('admin/goods/spec/update', {data})
export const getGoodsSpecInfo = (data) => axios('admin/goods/spec/info', {data})

/**
 * *************商品品牌管理
 */
export const getGoodsBrandList = (data) => axios('admin/goods/brand/list', {data})
export const delGoodsBrand = (data) => axios('admin/goods/brand/delete', {data})
export const addGoodsBrand = (data) => axios('admin/goods/brand/add', {data})
export const updateGoodsBrand = (data) => axios('admin/goods/brand/update', {data})
export const getGoodsBrandInfo = (data) => axios('admin/goods/brand/info', {data})

/**
 * 活动管理
 */
// 本周必买
export const getWeekBuylist = (data) => axios('admin/goods/activity/list', {data})
export const getWeekBuyadd = (data) => axios('admin/goods/activity/add', {data})
export const getWeekBuyinfo = (data) => axios('admin/goods/activity/info', {data})
export const getWeekBuyupdate = (data) => axios('admin/goods/activity/update', {data})
export const getWeekBuydel = (data) => axios('admin/goods/activity/delete', {data})
// 活动位置
export const getActivePostionList = (data) => axios('admin/goods/activity/position/list', {data})
export const addActivePosition = (data) => axios('admin/goods/activity/position/add', {data})
export const updateActivePosition = (data) => axios('admin/goods/activity/position/update', {data})
export const delActivePosition = (data) => axios('admin/goods/activity/position/delete', {data})
// 榜单
export const getBillBoardList = (data) => axios('admin/goods/activity/list', {data})
export const getBillBoardadd = (data) => axios('admin/goods/activity/add', {data})
export const getBillBoardinfo = (data) => axios('admin/goods/activity/info', {data})
export const getBillBoardupdate = (data) => axios('admin/goods/activity/update', {data})
export const getBillBoarddel = (data) => axios('admin/goods/activity/delete', {data})
// 抢购活动
export const getSeckillList = (data) => axios('admin/goods/seckill/list', {data})
export const getSeckillAdd = (data) => axios('admin/goods/seckill/add', {data})
export const getSeckilleUpdate = (data) => axios('admin/goods/seckill/update', {data})
export const getSeckillDel = (data) => axios('admin/goods/seckill/delete', {data})

/**
 * 通用模块
 */
export const addShopImage = (data) => axios('admin/common/image/add', {data})
export const delShopsImage = (data) => axios('admin/common/image/delete', {data})
export const shopImageList = (data) => axios('admin/common/image/list', {data})
