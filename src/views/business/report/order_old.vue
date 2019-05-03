<template>
    <div class="reportOrder">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据报表</el-breadcrumb-item>
            <el-breadcrumb-item>订单统计</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="下单时间：">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <!-- <el-form-item label="供应商：">
                <el-select v-model="search.sid">
                    <el-option v-for="item in supplier" :key="item.no" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <hr />
        <div id="main" style="width: 100%;height:400px;"></div>
        <el-table border :data="data" class="mt20">
            <el-table-column label="日期" prop="time"></el-table-column>
            <el-table-column label="订单数量" prop="account"></el-table-column>
            <el-table-column label="订单金额" prop="ordermoney"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import echarts from 'echarts'
import datePicker from '@/components/date-picker'
import { getSupplierList, countlist } from '@/api/getData'
import { getTheMonth } from '@/utils/theMonth.js'

export default {
    data () {
        return {
            search: { },
            supplier: [],
            data: [],
            // 指定图表的配置项和数据
            option: {
                // Make gradient line here
                visualMap: [{
                    show: false,
                    type: 'continuous',
                    seriesIndex: 0
                }],
                tooltip: {
                    trigger: 'axis'
                },
                title: [{
                    text: '走势图'
                }],
                legend: {
                    data: ['金额', '订单量']
                },
                xAxis: [{
                    data: []
                }],
                yAxis: [
                    {
                        type: 'value',
                        name: '日订单金额',
                        position: 'left',
                        splitLine: {show: false}
                    },
                    {
                        type: 'value',
                        name: '订单数',
                        position: 'right',
                        min: 0,
                        max: 500,
                        interval: 100,
                        splitLine: {show: false},
                        axisLine: {
                            lineStyle: {
                                color: '#5793f3'
                            }
                        }
                    }
                ],
                grid: [{
                    bottom: '10%'
                }, {
                    top: '0%'
                }],
                series: [
                    {
                        name: '日订单金额',
                        type: 'line',
                        showSymbol: false,
                        data: []
                    },
                    {
                        name: '订单数',
                        type: 'bar',
                        showSymbol: false,
                        data: []
                    }
                ]
            }
        }
    },
    mounted () {
        this.getSupplierList()
        let val = getTheMonth()
        this.search.starttime = val[0]
        this.search.stoptime = val[1]
        this.countlist()
    },
    methods: {
        // 获取供应商列表
        async getSupplierList () {
            let res = await getSupplierList()
            this.supplier = res.data.list
        },
        async countlist () {
            let res = await countlist(this.search)
            console.log(res)
            this.data = res.data.obj
            this.option.xAxis[0].data = res.data.obj.map((item) => { return item.time })
            this.option.series[0].data = res.data.obj.map((item) => { return item.ordermoney })
            this.option.series[1].data = res.data.obj.map((item) => { return item.account })
            const myChart = echarts.init(document.getElementById('main'))
            myChart.setOption(this.option)
        },
        onSubmit () {
            this.countlist()
        },
        getTime (val) {
            console.log(val)
            this.search.starttime = val[0]
            this.search.stoptime = val[1]
        }
    },
    components: {
        datePicker
    }
}
</script>

<style scoped lang="less">
</style>
