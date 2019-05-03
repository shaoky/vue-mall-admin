<template>
    <div class="distributors">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>分销商</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form  :inline="true">
            <el-form-item>
                <el-select v-model="search.types" @change="getDistributors">
                    <el-option v-for="(item,index) in types" :key="index"  :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入" v-model="search.text"></el-input>
            </el-form-item>

            <el-form-item label="状态：" >
                <el-select v-model="search.state" @change="getDistributors">
                    <el-option v-for='(item,index) in status' :key='index' :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getDistributors">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data='list'>
            <el-table-column label='主账号' prop="pusername"></el-table-column>
            <el-table-column label='企业名称' prop="sname"></el-table-column>
            <el-table-column label='分销账号' prop='username'></el-table-column>
            <el-table-column label='分销企业名称' prop='name'></el-table-column>
            <el-table-column label='地址区域' prop='region'>
                <template slot-scope="scope">
                    <regionTransform :region="scope.row.region"></regionTransform>
                </template>
            </el-table-column>
            <el-table-column label='状态' prop='state'>
                <template slot-scope="scope">{{list[scope.$index].state | getState}}</template>
            </el-table-column>
            <el-table-column label='操作'>
                <template slot-scope="scope">
                    <el-button @click="$router.push({path: 'distributorsEdit', query: {id: scope.row.id}})" type="text" >查看</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
    </div>
</template>

<script>
import { getDistributors } from '@/api/getData'
import pagination from '@/components/pagination'
import regionTransform from '@/components/common/regionTransform'

export default {
    data () {
        return {
            search: {
                page: 0,
                size: 20,
                state: 'all',
                types: 0
            },
            list: [],
            types: [
                {label: '全部', value: 0}, {label: '主账号', value: 1}, {label: '企业名称', value: 2}, {label: '分销帐号', value: 3}
            ],
            status: [
                {label: '待审核', value: 'waiting'}, {label: '锁定', value: 'locked'}, {label: '拒绝', value: 'refused'}, {label: '正常', value: 'normal'}, {label: '全部', value: 'all'}
            ],
            page: {
                total: 20
            },
            selectedstatus: ''
        }
    },
    filters: {
        getState (value) {
            let text = ''
            if (value == 'waiting') {
                text = '待审核'
            } else if (value == 'normal') {
                text = '正常'
            } else if (value == 'locked') {
                text = '锁定'
            } else if (value == 'refused') {
                text = '拒绝'
            }
            return text
        },
        getRegion (value) {
            if (!value) { return }
            let region = []
            region.push(value.slice(0, 2) + '000000', value.slice(0, 4) + '0000', value)
            return region
        }
    },
    mounted () {
        this.getDistributors()
    },
    methods: {
        async getDistributors () {
            let res = await getDistributors(this.search)
            this.list = res.data.suppliers
            this.page.total = res.data.count
            console.log(res)
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getDistributors()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getDistributors()
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
