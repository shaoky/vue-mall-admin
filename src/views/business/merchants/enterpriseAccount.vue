<template>
    <div class="enterpriseAccount">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>企业子账号</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form v-model="search" :inline="true">
            <el-form-item>
                <el-select v-model="search.state" @change="getSupplierchilds">
                    <el-option v-for="(item,index) in status" :key="index" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入" v-model="search.text"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getSupplierchilds">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="主账号" prop="username"></el-table-column>
            <el-table-column label="企业名称" prop="name"></el-table-column>
            <el-table-column label="子帐号" prop='childaccount'></el-table-column>
            <el-table-column label="用户名称" prop='cname'></el-table-column>
            <el-table-column label="角色" prop='role'></el-table-column>
            <el-table-column label="状态" prop='isjob'>
                <template slot-scope="scope">{{ list[scope.$index].isjob | getState }}</template>
            </el-table-column>
            <el-table-column label="创建时间" prop='created'>
                <template slot-scope="scope">
                    {{scope.row.created | getTime}}
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange'  @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import { getSupplierchilds } from '@/api/getData'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            search: {// 请求参数
                page: 0,
                size: 20,
                state: 0
            },
            list: [],
            page: {
                total: 20
            },
            status: [
                {label: '全部', value: 0}, {label: '主账号', value: 1}, {label: '企业名称', value: 2}, {label: '子账号', value: 3}
            ]
        }
    },
    filters: {
        getState (value) {
            let text = ''
            if (value == 1) {
                text = '在职'
            } else if (value == 2) {
                text = '离职'
            }
            return text
        }
    },
    mounted () {
        this.getSupplierchilds()
    },
    methods: {
        async getSupplierchilds () {
            let res = await getSupplierchilds(this.search)
            this.list = res.data.childs
            this.page.total = res.data.count
            console.log(res)
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getSupplierchilds()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getSupplierchilds()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
