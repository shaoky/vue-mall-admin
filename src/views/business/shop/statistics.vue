<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="店铺名称：">
                <el-input v-model="search.shopName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="日期">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getStatisticsList">查询</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="getExcelOrder">下载excel</el-button>
            </el-form-item> -->
        </el-form>

        <el-table border :data="statisticsList">
            <el-table-column label="日期">
                <template slot-scope="scope">
                    {{ scope.row.createTime | getDate}}
                </template>
            </el-table-column>
            <!-- <el-table-column prop="needMoney" label="所需金额"></el-table-column> -->
            <el-table-column prop="shopName" label="店铺名称"></el-table-column>
            <el-table-column prop="totalMoney" label="订单总金额"></el-table-column>
            <el-table-column prop="discountRate" label="享受折扣"></el-table-column>
            <el-table-column prop="payMoney" label="订单实付金额"></el-table-column>
            <el-table-column prop="shopMoney" label="商家收款"></el-table-column>
            <el-table-column prop="commissionMoney" label="产生佣金"></el-table-column>
            <el-table-column prop="platformMoney" label="平台提成"></el-table-column>
            <!-- <el-table-column label="操作" width="180"> -->
                <!-- <template slot-scope="scope"> -->
                    <!-- <el-button @click="toEdit(scope.row)" type="text" >编辑</el-button> -->
                    <!-- <el-button @click="$router.push({name: 'levelInfo', params: {levelId: scope.row.levelId}})" type="text" >配置规则</el-button> -->
                    <!-- <el-button @click="onDel(scope.row.levelId)" type="text" >删除</el-button> -->
                <!-- </template> -->
            <!-- </el-table-column> -->
        </el-table>
        <br>
        <el-form :inline="true">
            <el-form-item class="dis" label="总实付金额：">{{total.payMoney}}</el-form-item>
            <el-form-item class="dis" label="总商家收款：">{{total.shopMoney}}</el-form-item>
            <el-form-item class="dis" label="总支出佣金：">{{total.commissionMoney}}</el-form-item>
            <el-form-item class="dis" label="总平台提成：">{{total.platformMoney}}</el-form-item>
        </el-form>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination> -->

    </div>
</template>

<script>
import { getStatisticsList } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
import datePicker from '@/components/date-picker'
import { getTheMonth } from '@/utils/theMonth.js'
export default {
    mixins: [status],
    data () {
        return {
            statisticsList: [],
            search: {
                shopName: '',
                page: 1,
                size: 20
            },
            page: {
                total: 1
            },
            userList: [],
            total: {}
        }
    },
    mounted () {
        this.deForm = {...this.form}
        let val = getTheMonth()
        this.search.begintime = val[0] + 60 * 60 * 24
        this.search.endtime = val[1] + 60 * 60 * 24
        this.getStatisticsList()
    },
    methods: {
        async getStatisticsList () {
            console.log(this.search)
            let res = await getStatisticsList(this.search)
            this.statisticsList = res.data.list
            this.page.total = res.data.count
            this.total = res.data.all
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getStatisticsList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getStatisticsList()
        },
        // 选择时间
        getTime (val) {
            // console.log(val)
            this.search.begintime = val[0]
            this.search.endtime = val[1]
        }
    },
    components: {
        pagination, datePicker
    }
}
</script>
.dis{
    text-align: center;
    font-size:18px;
}
<style scoped lang="less">
</style>
