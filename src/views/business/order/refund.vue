<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-form-item label="订单号：">
                <el-input v-model="search.orderNo" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="用户：">
                <el-input v-model="search.userName" placeholder="用户名/id"></el-input>
            </el-form-item>
            <el-form-item label="时间：">
                <!-- 时间选择器 -->
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model="search.refundStatus" @change="getRefundList">
                    <el-option v-for="item in orderstate" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-button type="primary" @click="getRefundList">查询</el-button>
        </el-form>

        <el-table :data="orderList" border>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="退货单号" prop="refundNo"></el-table-column>
            <el-table-column label="类型" prop="refundStatusName"></el-table-column>
            <el-table-column label="收货人" prop="name"></el-table-column>
            <el-table-column label="用户名" prop="userName"></el-table-column>
            <el-table-column label="退款金额" prop="refundMoney"></el-table-column>
            <el-table-column label="申请时间">
                <template slot-scope="scope">
                    {{scope.row.createTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="处理时间">
                <template slot-scope="scope">
                    {{scope.row.resolveTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="退货理由" prop="refundReason"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="$router.push({name: 'refundInfo', params: {refundId: scope.row.refundId}})" type="text" >退货详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="count"></pagination>
    </div>
</template>

<script>
import { getRefundList } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
import datePicker from '@/components/date-picker'

export default {
    mixins: [status],
    data () {
        return {
            search: {

            },
            orderList: [],
            orderstate: [
                {value: null, label: '全部'}, {value: 1, label: '退款中'}, {value: 2, label: '已退款'}, {value: 3, label: '已拒绝'}
            ],
            count: 0
        }
    },
    mounted () {
        this.getRefundList()
    },
    methods: {
        async getRefundList () {
            try {
                let res = await getRefundList(this.search)
                this.orderList = res.data.list
                this.count = res.data.count
            } catch (err) { console.log(err) }
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getRefundList()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getRefundList()
        },
        getTime (val) {
            this.search.begintime = val[0]
            this.search.endtime = val[1]
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style lang="less" scoped>
</style>
