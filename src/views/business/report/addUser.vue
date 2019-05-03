<template>
    <div class="reportOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
            <el-breadcrumb-item>综合概况</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getComprehensive">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="时间" prop="time"></el-table-column>
            <el-table-column label="累计会员数" prop="totalMember"></el-table-column>
            <el-table-column label="新增会员数" prop="newMember"></el-table-column>
            <el-table-column label="累计注册人数" prop="totalRegisterMember"></el-table-column>
            <el-table-column label="新增注册人数" prop="newRegisterMember"></el-table-column>
            <el-table-column label="交易订单数" prop="allTotalOrder"></el-table-column>
            <el-table-column label="交易金额" prop="allTotalMoney"></el-table-column>
            <el-table-column label="有效订单数" prop="validOrder"></el-table-column>
            <el-table-column label="有效订单金额" prop="validMoney"></el-table-column>
            <el-table-column label="提现金额" prop="drawalMoeny"></el-table-column>
        </el-table>
    </div>
</template>

<script>

import datePicker from '@/components/date-picker'
import { getComprehensive } from '@/api/getData'
import { getTheMonth } from '@/utils/theMonth.js'

export default {
    data () {
        return {
            search: {},
            list: []
        }
    },
    mounted () {
        let val = getTheMonth()
        this.search.timeStart = val[0]
        this.search.timeStop = val[1]
        this.getComprehensive()
    },
    methods: {
        async getComprehensive () {
            let res = await getComprehensive(this.search)
            console.log(res)
            this.list = res.data.list
        },
        // 选择时间
        getTime (val) {
            // console.log(val)
            this.search.timeStart = val[0]
            this.search.timeStop = val[1]
        }
    },
    components: {
        datePicker
    }
}
</script>

<style scoped lang="less">
</style>
