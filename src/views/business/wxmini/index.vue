<template>
    <div class="wxmini">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>小程序管理</el-breadcrumb-item>
            <el-breadcrumb-item>小程序列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="供应商：">
                <el-input v-model="search.name"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">查询</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="供应商名称" prop="name"></el-table-column>
            <el-table-column label="供应商帐号" prop="susername"></el-table-column>
            <el-table-column label="小程序名称" prop="categories"></el-table-column>
            <el-table-column label="小程序版本" prop="templatename"></el-table-column>
            <el-table-column label="运营状态" prop="state"></el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
    </div>
</template>

<script>
import { getMiniList } from '@/api/getData'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            search: {
                page: 0,
                size: 20
            },
            list: [],
            page: {
                total: 20
            }
        }
    },
    // filters: {
    //     getRelease (value) {
    //         let text = ''
    //     },
    //     getExamine (value) {

    //     }
    // },
    mounted () {
        this.getMiniList()
    },
    methods: {
        // 获取小程序列表
        async getMiniList () {
            let res = await getMiniList(this.search)
            console.log(res)
            res.data.suppliers.forEach(
                (item, index) => {
                    if (item.wxpublicstatus == 0) {
                        if (item.wxsubmitstatus === -1) {
                            this.$set(item, 'state', '待提交')
                        } else if (item.wxsubmitstatus === 0) {
                            this.$set(item, 'state', '审核成功')
                        } else if (item.wxsubmitstatus === 1) {
                            this.$set(item, 'state', '审核失败 ')
                        } else if (item.wxsubmitstatus === 2) {
                            this.$set(item, 'state', '审核中 ')
                        }
                    } else if (item.wxpublicstatus == 1) {
                        this.$set(item, 'state', '已发布')
                    }
                }
            )
            this.list = res.data.suppliers
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getMiniList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getMiniList()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
