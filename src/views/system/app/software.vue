<template>
    <div class="software">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>APP管理</el-breadcrumb-item>
            <el-breadcrumb-item>软件管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true"  class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="edit(-1)">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="id" prop="softwareId"></el-table-column>
            <el-table-column label="app名称" prop="appName"></el-table-column>
            <el-table-column label="boundid" prop="boundId"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <el-dialog title="提示"  :visible.sync="dialogVisible"  width="30%"  center>
            <el-form label-width="120px">
                <el-form-item label="软件名称：">
                    <el-input style="width:200px;" v-model="form.appName"></el-input>
                </el-form-item>
                <el-form-item label="软件标识：">
                    <el-input style="width:200px;" v-model="form.boundId"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {getAppSoftware, addAppSoftware, editAppSoftware} from '@/api/getData'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            list: [],
            search: {
                page: 0,
                size: 20
            },
            page: {
                total: 20
            },
            // 添加/修改
            form: {},
            isAdd: true,
            dialogVisible: false
        }
    },
    mounted () {
        this.getAppSoftware()
    },
    methods: {
        // 获取列表
        async getAppSoftware () {
            let res = await getAppSoftware(this.search)
            this.list = res.data.list
            this.page.total = res.data.count
            console.log(res)
        },
        edit (n) {
            this.form = {}
            this.dialogVisible = true
            if (n === -1) {
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = {...n}
            }
        },
        async onSubmit () {
            if (this.isAdd) {
                let res = await addAppSoftware(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: '新增成功',
                        type: 'success'
                    })
                }
                this.getAppSoftware()
                this.dialogVisible = false
            } else {
                let res = await editAppSoftware(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: '编辑成功',
                        type: 'success'
                    })
                }
                this.getAppSoftware()
                this.dialogVisible = false
            }
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getAppversions()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getAppversions()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
.software{}
</style>
