<template>
    <div class="reportOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
            <el-breadcrumb-item>交易概况</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- <table class="v-table">
            <tr>
                <th>总有效订单</th>
                <th>总有效金额</th>
                <th>总返利金额</th>
                <th>总会员数</th>
                <th>未确认收货返利金额</th>
                <th>总已提现金额</th>
            </tr>
            <tr>
                <td>{{data.allValidOrder}}</td>
                <td>{{data.allValidMoeny}}</td>
                <td>{{data.allCommission || 0}}</td>
                <td>{{data.newMember}}</td>
                <td>{{data.allNoCommission || 0}}</td>
                <td>{{data.allWithdrawal || 0}}</td>
            </tr>
        </table> -->
        <div id="main" class="mt20" style="width: 100%;height:400px;"></div>
        <el-table border :data="list" class="mt20">
            <el-table-column label="时间" prop="time"></el-table-column>
            <el-table-column label="有效订单数" prop="validOrder"></el-table-column>
            <el-table-column label="有效交易金额" prop="validMoney"></el-table-column>
            <el-table-column label="返利金额" prop="commissionMoney"></el-table-column>
            <el-table-column label="新增会员数" prop="newMember"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import echarts from 'echarts'
import { getTransaction } from '@/api/getData'
import datePicker from '@/components/date-picker'
import { getTheMonth } from '@/utils/theMonth.js'

export default {

    data () {
        return {
            search: { },
            data: {allValidMoeny: 0, allValidOrder: 0, allReapMoeny: 0, allValidMember: 0},
            list: [],
            supplier: [],
            // 指定图表的配置项和数据
            option: {
                // Make gradient line here
                visualMap: [{
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0
                }],
                title: [{
                    text: '走势图'
                }],
                legend: {
                    data: ['有效交易金额', '获利金额', '有效订单数', '新增会员数']
                },
                tooltip: {
                    trigger: 'axis'
                },
                xAxis: [{
                    data: []
                }],
                yAxis: [
                    {
                        type: 'value',
                        name: '有效交易额/获利金额',
                        position: 'left',
                        splitLine: {show: false}
                    },
                    {
                        type: 'value',
                        name: '订单数/新增会员数',
                        position: 'right',
                        min: 0,
                        max: 100,
                        interval: 20,
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#5793f3'
                            }
                        }
                    }
                ],
                // grid: [{
                //     bottom: '10%'
                // }, {
                //     top: '0%'
                // }],
                series: [
                    {
                        name: '有效交易金额',
                        type: 'line',
                        showSymbol: false,
                        data: []
                    },
                    {
                        name: '返利金额',
                        type: 'line',
                        showSymbol: false,
                        data: []
                    },
                    {
                        name: '有效订单数',
                        type: 'bar',
                        showSymbol: false,
                        data: []
                    },
                    {
                        name: '新增会员数',
                        type: 'bar',
                        showSymbol: false,
                        data: []
                    }
                ]
            }
        }
    },
    mounted () {
        let val = getTheMonth()
        this.search.timeStart = val[0]
        this.search.timeStop = val[1]
        this.addShopcount()
    },
    methods: {
        // 获取新增商品数据
        async addShopcount () {
            let res = await getTransaction(this.search)
            console.log(res)
            this.data = res.data
            this.list = res.data.list
            let contraryList = this.list.reverse()
            this.option.xAxis[0].data = contraryList.map((item) => { return item.time })
            this.option.series[0].data = contraryList.map((item) => { return item.validMoney })
            this.option.series[1].data = contraryList.map((item) => { return item.commissionMoney })
            this.option.series[2].data = contraryList.map((item) => { return item.validOrder })
            this.option.series[3].data = contraryList.map((item) => { return item.newMember })
            const myChart = echarts.init(document.getElementById('main'))
            myChart.setOption(this.option)
        },
        onSubmit () {
            this.addShopcount()
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
