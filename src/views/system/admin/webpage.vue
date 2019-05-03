<template>
    <div class="webpage">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>网页分组</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table :data="list">
            <el-table-column label="ID" prop="columnId"></el-table-column>
            <el-table-column label="名称" prop="columnName"></el-table-column>
            <el-table-column label="URL" prop="columnURL"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="$router.push({path:'webpage-child'})">添加子级成员</el-button>
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.columnId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top:20px" @click="edit(-1)">添加</el-button>

        <el-dialog  title="添加一级网页"  :visible.sync="visible"  width="30%"  center>
            <el-form label-width="120px">
                <el-form-item label="网页名称：">
                    <el-input style="width:200px;" v-model="form.columnName"></el-input>
                </el-form-item>
                <el-form-item label="网页URL：">
                    <el-input style="width:300px;" v-model="form.columnURL"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getWebpage, addWebpage, editWebpage, delWebpage } from '@/api/getData'

export default {
    data () {
        return {
            form: { columnPid: 0 },
            list: [],
            visible: false,
            isAdd: true
        }
    },
    mounted () {
        this.getWebpage()
    },
    methods: {
        // 获取一级网页列表
        async getWebpage () {
            let res = await getWebpage()
            console.log(res)
            this.list = res.data.list
        },
        edit (n) {
            this.form = { columnPid: 0 }
            this.visible = true
            if (n === -1) {
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = {...n}
            }
        },
        async submit () {
            if (this.isAdd) {
                await addWebpage(this.form)
            } else {
                await editWebpage(this.form)
            }
            this.$notify({
                title: '成功 ',
                message: '操作成功',
                type: 'success'
            })
            this.getWebpage()
            this.visible = false
        },
        // 删除
        async del (id) {
            await delWebpage({columnId: id})
            this.$notify({
                title: '成功 ',
                message: '删除成功',
                type: 'success'
            })
            this.getWebpage()
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
</style>
