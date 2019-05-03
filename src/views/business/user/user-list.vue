<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-form-item label="用户名:">
                <el-input v-model="search.userName" placeholder="用户名称/用户编号/手机号" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="用户状态：">
                <el-select v-model="search.isMember" @change="getUserList">
                    <el-option v-for="item in status" :key="item.value" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="userList">
            <el-table-column prop="userNo" label="用户编号" width="130"></el-table-column>
            <el-table-column prop="userName" label="用户名称"></el-table-column>
            <el-table-column label="用户头像">
                <template slot-scope="scope">
                    <img :src="scope.row.userPhoto" style="max-height: 80px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column prop="userPhone" label="用户手机"></el-table-column>
            <el-table-column prop="weixinAccount" label="微信号"></el-table-column>
            <el-table-column prop="superiorName" label="推荐人名称"></el-table-column>
            <el-table-column prop="superiorNo" label="推荐人编号"></el-table-column>
            <el-table-column prop="auditStatusName" label="平台审核状态"></el-table-column>
            <!-- <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="toEdit(userList[scope.$index].id)" type="text" >查询</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import { getUserList } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20
            },
            status: [
                {value: null, label: '全部'}, {value: 1, label: '会员'}, {value: 0, label: '非会员'}
            ],
            page: {
                total: 1
            },
            userList: []
        }
    },
    mounted () {
        this.getUserList()
    },
    methods: {
        async getUserList () {
            let res = await getUserList(this.search)
            this.userList = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserList()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
