<template>
    <div class="reportOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
            <el-breadcrumb-item>产品销售排行</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item>
                <el-select v-model="search.timeType" multiple placeholder="选择时间">
                    <el-option value="2" label="支付订单"></el-option>
                    <el-option value="3" label="发货订单"></el-option>
                    <el-option value="4" label="完成订单"></el-option>
                    <el-option value="5" label="退款中订单"></el-option>
                    <el-option value="6" label="已退款订单"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="时间：" v-if="search.timeType.length > 0">
                <!-- 时间选择器 -->
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <!-- <el-form-item label="供应商:">
                <el-select v-model="search.region" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list" class="mt20">
            <el-table-column label="商品名称" prop="goodsName"></el-table-column>
            <el-table-column label="销售数量" prop="saleCount"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import { getGoodssales } from '@/api/getData'

export default {
    data () {
        return {
            search: {
                timeType: []
            },
            list: []
        }
    },
    mounted () {
        this.getGoodssales()
    },
    methods: {
        // 获取销售销售排行榜
        async getGoodssales () {
            let res = await getGoodssales(this.search)
            console.log(res)
            this.list = res.data.list
        },
        onSubmit () {
            this.getGoodssales()
        },
        // 选择时间
        getTime (val) {
            // console.log(val)
            this.search.begintime = val[0]
            this.search.endtime = val[1]
        }
    },
    components: {
        datePicker
    }

}
</script>

<style scoped lang="less">
</style>
