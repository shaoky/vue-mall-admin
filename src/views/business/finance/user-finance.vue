<template>
    <div class="user-finance">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户财务</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="用户：">
                <el-input style="width:300px;" v-model="search.name" placeholder="名称或id"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserFinance">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column label="用户账号" prop="loginName"></el-table-column>
            <el-table-column label="用户名称" prop="userName"></el-table-column>
            <el-table-column label="用户编号" prop="userNo"></el-table-column>
            <el-table-column label="可提现余额" prop="withdrawalAmount"></el-table-column>
            <el-table-column label="已提现余额" prop="withdrawalAmountCount"></el-table-column>
            <!-- <el-table-column label="直属客户数量" prop="userCount"></el-table-column> -->
            <!-- <el-table-column label="团队客户数量" prop="userCount1"></el-table-column> -->
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count" v-if="count>0"></pagination>
    </div>
</template>

<script>
import { getUserFinance } from '@/api/getData'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            search: {
                page: 0, size: 20
            },
            list: [],
            count: null
        }
    },
    mounted () {
        this.getUserFinance()
    },
    methods: {
        // 获取列表
        async getUserFinance () {
            let res = await getUserFinance(this.search)
            console.log(res)
            this.count = res.data.count
            this.list = res.data.list
        },

        handleCurrentChange (val) {
            this.search.page = val
            this.getUserFinance()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserFinance()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
