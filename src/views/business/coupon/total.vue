<template>
    <div class="coupon-total">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
            <el-breadcrumb-item>统计管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getCouponTotal">查询</el-button>
            </el-form-item>
        </el-form>
        <el-form :inline="true">
            <el-form-item label="总发放优惠券数量：">{{total.allGrantCount}}</el-form-item>
            <el-form-item label="总发放优惠券金额：">{{total.allGrantMoney}}</el-form-item>
            <el-form-item label="总发消耗数量：">{{total.allConsumeCount}}</el-form-item>
            <el-form-item label="总发消耗金额：">{{total.allConsumeMoney}}</el-form-item>
            <el-form-item label="总过期数量：">{{total.allOverdueNumber}}</el-form-item>
            <el-form-item label="总过期金额：">{{total.allOverdueMoney}}</el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column label="日期" prop="date">
                <!-- <template slot-scope="scope">{{ scope.row.createTime | getTime }}</template> -->
            </el-table-column>
            <el-table-column label="发放优惠券数量" prop="grantNumber"></el-table-column>
            <el-table-column label="发放优惠券金额" prop="couMoney"></el-table-column>
            <el-table-column label="消费优惠券数量" prop="consumeNumber"></el-table-column>
            <el-table-column label="消费优惠券金额" prop="consumeMoney"></el-table-column>
            <el-table-column label="过期优惠券数量" prop="overdueNumber"></el-table-column>
            <el-table-column label="过期优惠券金额" prop="overdueMoney"></el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count" v-if="count>0"></pagination>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import { getCouponTotal } from '@/api/getData'
import pagination from '@/components/pagination'
import { getTheMonth } from '@/utils/theMonth.js'

export default {
    data () {
        return {
            search: {page: 0, size: 20},
            list: [],
            count: null,
            total: {}
        }
    },
    mounted () {
        let val = getTheMonth()
        this.search.timeStart = val[0]
        this.search.timeStop = val[1]
        this.getCouponTotal()
    },
    methods: {
        // 获取列表
        async getCouponTotal () {
            let res = await getCouponTotal(this.search)
            console.log(res)
            this.list = res.data.list
            this.total = res.data.common
            this.count = res.data.count
        },
        // 选择时间
        getTime (val) {
            // console.log(val)
            this.search.timeStart = val[0]
            this.search.timeStop = val[1]
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getCouponTotal()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getCouponTotal()
        }
    },
    components: {
        datePicker, pagination
    }
}
</script>

<style scoped lang="less">
</style>
