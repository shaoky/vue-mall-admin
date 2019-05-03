<template>
    <div class="reportOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
            <el-breadcrumb-item>订单统计</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
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
                <el-button type="primary" @click="countlist">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getOrderDataExcel">下载excel</el-button>
            </el-form-item>
        </el-form>
        <div style="font-size: 16px;">
            <h1>总订单数：{{ all.number }} | 总计销售金额：{{ all.orderMoney }} | 总计返现金额：{{ all.commissionMoney }}</h1>
        </div>
        <el-table border :data="list" class="mt20">
            <el-table-column label="时间">
                <template slot-scope="scope">
                    {{scope.row.receiveTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="订单数" prop="number"></el-table-column>
            <el-table-column label="销售流水金额" prop="orderMoney"></el-table-column>
            <el-table-column label="返现金额" prop="commissionMoney"></el-table-column>
        </el-table>

    </div>
</template>

<script>
import { baseUrl } from '@/config/env'
import datePicker from '@/components/date-picker'
import { countlist, getOrderDataExcel } from '@/api/getData'

export default {
    data () {
        return {
            search: { },
            list: [],
            all: {}
        }
    },
    mounted () {
        this.countlist()
    },
    methods: {
        // 获取销售销售排行榜
        async countlist () {
            let res = await countlist(this.search)
            this.list = res.data.list
            this.all = res.data.allmoney
        },
        async getOrderDataExcel () {
            let res = await getOrderDataExcel(this.search)
            if (res.code === 200) {
                location.href = baseUrl + res.data
            }
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
