<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-form-item>
                <el-select v-model="search.timeType" placeholder="选择时间">
                    <el-option value="2" label="支付时间"></el-option>
                    <el-option value="3" label="发货时间"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item v-if="search.timeType">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item label="订单号：">
                <el-input v-model="search.orderNo" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="用户：">
                <el-input v-model="search.userName" placeholder="用户名/id"></el-input>
            </el-form-item>
            <el-form-item label="订单状态：">
                <el-select v-model="search.orderStatus" @change="getOrderList">
                    <el-option v-for="item in orderstate" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getOrderList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getExcelOrder">下载excel</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="orderList" border>
            <el-table-column label="订单号" prop="orderNo" width="200"></el-table-column>
            <el-table-column label="订单类型">
                <template slot-scope="scope">
                    {{scope.row.orderStatus | orderStatusName}}
                </template>
            </el-table-column>
            <el-table-column label="收货人" prop="userName"></el-table-column>
            <el-table-column label="订单金额" prop="totalMoney"></el-table-column>
            <el-table-column label="应付金额" prop="payableMoney"></el-table-column>
            <el-table-column label="实付金额" prop="payMoney"></el-table-column>
            <el-table-column label="下单时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="支付时间">
                <template slot-scope="scope">
                    {{scope.row.paymentTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push({name: 'orderInfo', params: {orderId: scope.row.orderId}})" type="text" >订单详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="count"></pagination>
    </div>
</template>

<script>
import { getOrderList, getExcelOrder } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
import { baseUrl } from '@/config/env'
import datePicker from '@/components/date-picker'

export default {
    mixins: [status],
    data () {
        return {
            search: {

            },
            orderList: [],
            orderstate: [
                {value: 0, label: '全部'}, {value: 1, label: '未付款'}, {value: 2, label: '待发货'}, {value: 3, label: '已发货'}, {value: 4, label: '交易完成'}, {value: 5, label: '退款中'}, {value: 6, label: '已退款'}, {value: 7, label: '已取消'}
            ],
            count: 0
        }
    },
    mounted () {
        this.getOrderList()
    },
    methods: {
        async getOrderList () {
            try {
                let res = await getOrderList(this.search)
                this.orderList = res.data.list
                this.count = res.data.count
            } catch (err) { console.log(err) }
        },
        async getExcelOrder () {
            let res = await getExcelOrder(this.search)
            if (res.code === 200) {
                location.href = baseUrl + res.data
            }
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getOrderList()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getOrderList()
        },
        // 选择时间
        getTime (val) {
            // console.log(val)
            this.search.startTime = val[0]
            this.search.endTime = val[1]
        }
    },
    activated () {
        this.getOrderList()
    },
    components: {
        pagination,
        datePicker
    }
}
</script>

<style lang="less" scoped>
</style>
