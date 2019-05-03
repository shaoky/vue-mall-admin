<template>
    <div class="port-logs">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>日志管理</el-breadcrumb-item>
            <el-breadcrumb-item>接口日志</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item label="时间：">
                <!-- 时间选择器 -->
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item label="用户：">
                <el-select v-model="search.region" placeholder="请选择">
                    <el-option label="全部" value="全部"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="report">
            <el-table-column label="生成日志服务器ip" prop="__source__"></el-table-column>
            <el-table-column label="创建时间" prop="__time__">
                <template slot-scope="scope">{{ report[scope.$index].__time__ | getTime }}</template>
            </el-table-column>
            <el-table-column label="日志主题" prop="__topic__"></el-table-column>
            <el-table-column label="客户端请求ip" prop="requestIP"></el-table-column>
            <el-table-column label="客户端请求的接口方法" prop="requestURI"></el-table-column>
            <el-table-column label="用户token" prop="token"></el-table-column>
            <el-table-column label="数据查看">
                <template slot-scope="scope">
                    <el-button type="text" @click="see(scope.row)">查看数据</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <el-dialog  title="数据查看" :visible.sync="dialogVisible" width="50%" center>
            <div class="request">
                <div class="title">请求参数</div>
                <pre>{{request}}</pre>
            </div>
            <div class="respons">
                <div class="title">响应数据</div>
                <pre>{{respons}}</pre>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
// import { getApilogs } from '@/api/getData'

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
            },
            dialogVisible: false,
            respons: {},
            request: {}
        }
    },
    mounted () {

    },
    methods: {
        async getList () {
            let res = await getApilogs(this.search)
            console.log(res)
            this.report = res.data.logs
            this.page.total = res.data.count
        },
        onSubmit () {
            this.getList()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getList()
        },
        // 选择时间
        getTime (val) {
            this.search.begintime = val[0]
            this.search.endtime = val[1]
        },
        see (row) {
            this.respons = JSON.stringify(JSON.parse(row.responseData), null, '--')
            if (row.requestParam) {
                this.request = JSON.stringify(JSON.parse(row.requestParam), null, '--')
            }
            this.dialogVisible = true
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">
.port-logs{
    .request,.respons{margin-bottom:20px;
        .title{color:#007CFC;font-size:16px;}
    }
}
</style>
