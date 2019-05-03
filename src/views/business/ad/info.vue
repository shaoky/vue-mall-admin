<template>
  <div class="articleInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>前台业务</el-breadcrumb-item>
        <el-breadcrumb-item>广告管理</el-breadcrumb-item>
        <el-breadcrumb-item>广告详情</el-breadcrumb-item>
    </el-breadcrumb>
        <el-form label-width="120px">
            <el-form-item label="广告标题：">
                <el-input style="width:300px;" v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="广告位置：" >
                <el-select v-model="form.positionId">
                    <el-option v-for="(item,index) in positionList" :key="index" :label="item.title" :value="item.positionId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="广告类型：">
                <el-select v-model="form.adClass">
                    <el-option v-for="(item,index) in typeList" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="app：">
                <el-select v-model="form.app">
                    <el-option label="尚品舵手" value="1"></el-option>
                    <el-option label="惠民导航" value="2"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item label="安卓页面：">
                <el-input style="width:300px;" v-model="form.androidPage"></el-input>
            </el-form-item>
            <el-form-item label="苹果页面：">
                <el-input style="width:300px;" v-model="form.iosPage"></el-input>
            </el-form-item> -->
            <el-form-item label="操作：">
                <el-input style="width:300px;" v-model="form.operation"></el-input>
            </el-form-item>
            <!-- <el-form-item label="网页url：">
                <el-input style="width:300px;" v-model="form.webPage"></el-input>
            </el-form-item> -->
            <el-form-item label="广告排序：">
                <el-input style="width:300px;" v-model="form.sort"></el-input>
            </el-form-item>
            <el-form-item label="广告图片：">
                <el-upload
                    class="avatar-uploader"
                    :action="imgBaseUrl"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>
            <el-form-item label="是否启用：">
                <el-checkbox v-model="form.isOpen"></el-checkbox>
            </el-form-item>

            <div class="btn">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <el-button type="primary">删除</el-button>
            </div>
        </el-form>
  </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env'
import { getAdPositionList, addAd, updateAd, getAdInfo } from '@/api/getData'
import ueditor from '@/components/ueditor'
import region from '@/components/common/region'

export default {
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            adId: null,
            isAdd: true,
            form: {
                imageUrl: '',
                isOpen: false,
                operation: '',
                valueMap: ''
            },
            positionList: [],
            typeList: [
                {label: '商品详情', value: 1},
                {label: '网页链接', value: 2},
                {label: '店铺分享', value: 3},
                {label: '抢购详情', value: 4},
                {label: '跳转活动页', value: 5},
                {label: '待开发中', value: 100},
                {label: '不跳转', value: -1}
            ],
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted () {
        this.getAdPositionList()
        if (!this.$route.query.adId) {
            this.isAdd = true
        } else {
            this.adId = parseInt(this.$route.query.adId)
            this.getAdInfo()
            this.isAdd = false
        }
    },
    methods: {
        // 获取广告位置
        async getAdPositionList () {
            let res = await getAdPositionList()
            this.positionList = res.data.list
        },
        // 获取广告详情
        async getAdInfo () {
            let res = await getAdInfo({adId: this.adId})
            this.form = res.data.info
            if (this.form.isOpen === 0) {
                this.form.isOpen = false
            } else if (this.form.isOpen === 1) {
                this.form.isOpen = true
            }
        },
        async onSubmit () {
            if (this.form.adClass === 1) {
                this.form.type = 1
                this.form.androidPage = 'com.jsojs.luxuries.app.ui.activity.CommodityDetailsActivity'
                this.form.iosPage = 'JSGoodsInfoViewController'
                this.form.webPage = '/shop/info/?id=' + this.form.operation
                this.form.valueMap = JSON.stringify({goodsId: parseInt(this.form.operation)})
            }
            if (this.form.adClass === 2) {
                this.form.type = 2
                if (this.form.app === 1) {
                    this.form.androidPage = 'com.jsojs.luxuries.app.ui.activity.WebBaseActivity'
                } else {
                    this.form.androidPage = 'com.jsojs.huiminnav.app.ui.activity.WebBaseActivity'
                }
                this.form.iosPage = 'JSHomeWebViewController'
                this.form.webPage = this.form.operation
                this.form.valueMap = JSON.stringify({url: this.form.operation})
            }
            if (this.form.adClass === 3) {
                this.form.type = 1
                this.form.androidPage = 'com.jsojs.luxuries.app.ui.activity.ShareWebActivity'
                this.form.iosPage = 'InviteShopperViewController'
                this.form.webPage = this.form.operation
                this.form.valueMap = ''
            }
            if (this.form.adClass === 4) {
                this.form.type = 1
                this.form.androidPage = 'com.jsojs.huiminnav.app.ui.activity.CommodityRushActivity'
                this.form.iosPage = 'JSGoodsPurchaseDetailViewController'
                this.form.webPage = '/shop/info/?id=' + this.form.operation
                this.form.valueMap = JSON.stringify({goodsId: parseInt(this.form.operation)})
            }
            if (this.form.adClass === 5) {
                this.form.type = 1
                this.form.androidPage = 'com.jsojs.huiminnav.app.ui.activity.WebBaseActivity'
                this.form.iosPage = 'JSActivetyWebViewController'
                this.form.webPage = this.form.operation
                this.form.valueMap = JSON.stringify({url: this.form.operation})
            }
            if (this.form.adClass === 100) {
                this.form.type = 1
                this.form.androidPage = 'com.jsojs.huiminnav.app.ui.activity.DevelopmentActivity'
                this.form.iosPage = 'InviteShopperViewController'
                this.form.webPage = this.form.operation
                this.form.valueMap = ''
            }

            if (this.form.adClass === -1) {
                this.form.type = 1
                this.form.androidPage = ''
                this.form.iosPage = ''
                this.form.webPage = this.form.operation
                this.form.valueMap = ''
            }
            if (this.isAdd) {
                try {
                    let res = await addAd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.$router.go(-1)
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await updateAd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '修改成功',
                            type: 'success'
                        })
                        this.$router.go(-1)
                    }
                } catch (err) {}
            }
            // this.form = {}
        },
        handleAvatarSuccess (res, file) {
            this.form.imageUrl = res.data.url
            console.log(this.form.imageUrl)
            // this.imageUrl = URL.createObjectURL(file.raw)
        }
    },
    components: {
        ueditor,
        region
    }
}
</script>

<style scoped lang="less">

.btn{padding-left:120px;}
</style>
