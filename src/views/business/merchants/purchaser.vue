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
                <el-input v-model="search.username" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item label="企业名称:">
                <el-input v-model="search.name" placeholder="请输入搜索内容"></el-input>
            </el-form-item>
            <el-form-item label="供应商:">
                <el-select v-model="search.spid" @change="getMerchants">
                    <el-option v-for="item in supplier" :key="item.no" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="审核状态：">
                <el-select v-model="search.state" @change="getMerchants">
                    <el-option v-for="item in status" :key="item.value" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getMerchants">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="list">
            <el-table-column prop="username" label="登录名" width="130"></el-table-column>
            <el-table-column prop="name" label="企业名称"></el-table-column>
            <el-table-column prop="manager" label="联系人"></el-table-column>
            <el-table-column prop="managertel" label="联系电话"></el-table-column>
            <el-table-column prop="region" label="企业所在区域">
                <template slot-scope="scope">
                    <regionTransform :region="scope.row.region"></regionTransform>
                </template>
            </el-table-column>
            <el-table-column prop="address" label="详细地址"></el-table-column>
            <el-table-column label="录入时间" width="150">
                 <template slot-scope="scope">
                    {{scope.row.created | getTime}}
                 </template>
            </el-table-column>
            <el-table-column  label="审核时间">
                <template slot-scope="scope">
                    {{scope.row.auditime | getTime}}
                 </template>
            </el-table-column>
            <el-table-column prop="state" label="平台审核状态">
                <template slot-scope="scope">{{ list[scope.$index].state | getState }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="toEdit(list[scope.$index].id)" type="text" >编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import { getMerchants, getSupplierList } from '@/api/getData'
import pagination from '@/components/pagination'
import regionTransform from '@/components/common/regionTransform'

export default {
    data () {
        return { // 请求列表参数
            search: {
                page: 0,
                size: 20,
                state: 'all'
            },
            status: [
                {value: 'all', label: '全部'}, {value: 'normal', label: '已审核'}, {value: 'waiting', label: '未审核'}, {value: 'refused', label: '已拒绝'}
            ],
            list: [],
            supplier: [],
            page: {
                total: 1
            }
        }
    },
    filters: {
        getState (value) {
            let text = ''
            if (value == 'normal') {
                text = '已审核'
            } else if (value == 'waiting') {
                text = '未审核'
            } else if (value == 'refused') {
                text = '已拒绝'
            }
            return text
        }
    },
    mounted () {
        this.getSupplierList()
        this.getMerchants()
    },
    methods: {
        // 获取供应商列表
        async getSupplierList () {
            let res = await getSupplierList()
            this.supplier = res.data.list
            console.log(res)
        },
        async getMerchants () {
            let res = await getMerchants(this.search)
            this.list = res.data.merchants
            this.page.total = res.data.count
            console.log(res)
        },
        toEdit (id) {
            this.$router.push({path: 'purchaserEdit', query: {id: id}})
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getMerchants()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getMerchants()
        }
    },
    components: {
        pagination,
        regionTransform
    }
}
</script>

<style scoped lang="less">
</style>
