<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>系统操作日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <!-- 时间选择器 -->
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <!-- <el-form-item label="用户：">
                <el-select v-model="search.adminId" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item> -->
            <el-form-item label="用户：">
                <el-input v-model="search.username">用户</el-input>
            </el-form-item>
            <el-form-item label="主题：">
                <el-input v-model="search.log_info">用户</el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="report">
            <!-- <el-table-column label="生成日志服务器ip" prop="ip"></el-table-column> -->
            <el-table-column label="创建时间" prop="time">
                <template slot-scope="scope">{{ scope.row.time | getTime }}</template>
            </el-table-column>
            <el-table-column label="操作用户" prop="username"></el-table-column>
            <el-table-column label="日志主题" prop="log_info"></el-table-column>
            <el-table-column label="客户端请求ip" prop="ip"></el-table-column>
            <el-table-column label="客户端请求参数" prop="input"></el-table-column>
            <!-- <el-table-column label="客户端请求的接口方法" prop="method"></el-table-column> -->
            <!-- <el-table-column label="服务器返回参数" prop="responseData"></el-table-column> -->
            <el-table-column label="消耗时间" prop="usetime"></el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' :total="page.total"></pagination>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import { getAdminlogs } from '@/api/getData'

export default {
    data () {
        return {
            search: {
                page: 0,
                size: 20
            },
            // 表格
            report: [],
            page: {
                total: 1
            }
        }
    },
    mounted () {
        this.getList()
    },
    methods: {
        async getList () {
            let res = await getAdminlogs(this.search)
            console.log(res)
            this.report = res.data.list
            this.page.total = res.data.count
        },
        onSubmit () {
            this.getList()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getList()
        },
        // 选择时间
        getTime (val) {
            console.log(val)
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

<style scoped lang="less">

</style>
