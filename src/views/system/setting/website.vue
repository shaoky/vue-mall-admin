<template>
    <div class="admin-add">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form label-width="160px">
            <el-form-item label="公司客服热线：">
                <el-input style="width:300px;"  v-model="website.servicePhone"></el-input>
            </el-form-item>
            <el-form-item label="公司客服微信：">
                <el-input style="width:300px;"  v-model="website.weixinAccount"></el-input>
            </el-form-item>
            <el-form-item label="配送费：">
                <el-input style="width:300px;" v-model="website.deliverMoney"></el-input>
            </el-form-item>
            <el-form-item label="满多少免配送费：">
                <el-input style="width:300px;" v-model="website.freeShippingMoney"></el-input>
            </el-form-item>
            <el-form-item label="发货后自动确认收货：">
                <el-input style="width:300px;" v-model="website.autoConfirmDelivery"></el-input>
            </el-form-item>
            <el-form-item label="提现周期每月：">
                <el-input style="width:300px;" v-model="website.withdrawalCycle"></el-input>
            </el-form-item>
            <el-form-item label="订单结算周期：">
                <el-input style="width:300px;" v-model="website.orderSettlementCycle"></el-input>
            </el-form-item>
            <el-form-item label="可申请退货周期：">
                <el-input style="width:300px;" v-model="website.refundAppleCycle"></el-input>
            </el-form-item>
            <el-form-item label="">
                <el-button type="primary" @click="save">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { getWebsite, saveWebsite } from '@/api/getData'
export default {
    data () {
        return {
            id: '',
            website: []
        }
    },
    mounted () {
        this.getOrderInfo()
    },
    methods: {
        async getOrderInfo () {
            let res = await getWebsite()
            this.website = res.data.info
        },
        async save () {
            let res = await saveWebsite(this.website)
            if (res.code === 200) {
                this.$notify({
                    title: '保存成功',
                    message: res.data,
                    type: 'success'
                })
                this.getOrderInfo()
            }
        }
    }
}
</script>

<style scoped lang="less">
</style>
