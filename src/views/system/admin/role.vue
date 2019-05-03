<template>
    <div class="role-index">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色分组</el-breadcrumb-item>
        </el-breadcrumb>
        <el-table :data="list">
            <el-table-column label="ID" prop="grId"></el-table-column>
            <el-table-column label="名称" prop="grName"></el-table-column>
            <el-table-column label="描述" prop="grRemarks"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="$router.push({path:'role-child'})">添加子级成员</el-button>
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.grId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-button type="primary" style="margin-top:20px" @click="edit(-1)">添加</el-button>

        <el-dialog  title="添加角色"  :visible.sync="visible"  width="30%"  center>
            <el-form label-width="120px">
                <el-form-item label="名称：">
                    <el-input style="width:200px;" v-model="form.grName"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input style="width:300px;" v-model="form.grRemarks"></el-input>
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
import { getRoleList, addRole, editRole, delRole } from '@/api/getData'

export default {
    data () {
        return {
            form: { grPid: 0 },
            list: [],
            visible: false,
            isAdd: true
        }
    },
    mounted () {
        this.getRoleList()
    },
    methods: {
        // 获取列表
        async getRoleList () {
            let res = await getRoleList()
            console.log(res)
            this.list = res.data.list
        },
        // 新增角色
        async submit () {
            if (this.isAdd) {
                await addRole(this.form)
            } else {
                await editRole(this.form)
            }
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
            this.getRoleList()
        },
        // 删除角色分组
        async del (n) {
            await delRole({grId: n})
            this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
            })
            this.getRoleList()
        },
        edit (n) {
            this.form = { grPid: 0 }
            this.visible = true
            if (n === -1) {
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = {...n}
            }
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
</style>
