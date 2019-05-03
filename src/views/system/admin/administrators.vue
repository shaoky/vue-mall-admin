<template>
    <div class="administrators">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>员工管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="状态：">
                <el-select v-model="search.status">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="(item,index) in state" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input placeholder="请输入姓名，账号等查询" v-model="search.userName"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAdminList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit(-1)">添加管理员</el-button>
            </el-form-item>
        </el-form>

        <el-table :data="list">
            <el-table-column label="ID" prop="adminId"></el-table-column>
            <el-table-column label="用户名" prop="loginName"></el-table-column>
            <el-table-column label="真实姓名" prop="realName"></el-table-column>
            <el-table-column label="昵称" prop="nickName"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">
                    {{scope.row.status | getState}}
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.adminId)">删除</el-button>
                    <el-button type="text" @click="reset(scope.row.adminId)">重置密码</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="count"></pagination>

        <el-dialog  title="新增/编辑"  :visible.sync="visible"  width="50%"  center>
            <el-form label-width="120px">
                <el-form-item label="登录账号：">
                    <el-input v-model="form.loginName"></el-input>
                </el-form-item>
                <el-form-item label="密码：" v-if="isAdd">
                    <el-input v-model="form.loginPwd" type="password"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名：">
                    <el-input v-model="form.realName"></el-input>
                </el-form-item>
                <el-form-item label="昵称：">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="状态：" v-if="!isAdd">
                    <el-select v-model="form.status">
                        <el-option v-for="(item,index) in state" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="角色分组：">
                    <el-cascader style="min-width:200px;" :options="roleList" v-model="selectedRole"   @change="handleChange">
                    </el-cascader>
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
import { getRoleList, getAdminList, addAdmin, editAdmin, delAdmin, editAdminPassword } from '@/api/getData'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            search: {page: 0, size: 20, status: 0},
            form: {},
            list: [],
            selectedRole: [],
            roleList: [],
            count: 0,
            isAdd: true,
            visible: false,
            state: [{label: '正常', value: 1}, {label: '离职', value: 2}, {label: '锁定', value: 3}]
        }
    },
    filters: {
        getState (value) {
            let text = ''
            if (value === 1) {
                text = '正常'
            } else if (value === 2) {
                text = '离职'
            } else if (value === 3) {
                text = '锁定'
            }
            return text
        }
    },
    mounted () {
        Promise.all([this.getAdminList(), this.getRoleList()])
    },
    methods: {
        // 获取管理员列表
        async getAdminList () {
            let res = await getAdminList(this.search)
            console.log(res)
            this.list = res.data.list
            this.count = res.data.count
        },
        // 获取所有角色列表
        async getRoleList () {
            let res = await getRoleList()
            let data = res.data.list
            this.roleList = this.recursion(data)
            console.log(this.roleList)
        },
        // 重置密码
        reset (id) {
            // this.$confirm('确认重置密码？').then(async () => {

            // })
            this.$confirm('确认重置密码？').then(async () => {
                await editAdminPassword({adminId: id})
                this.$notify({
                    title: '成功',
                    message: '重置成功，默认密码为 123456',
                    type: 'success'
                })
            })
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getAdminList()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getAdminList()
        },
        handleChange (val) {
            this.form.grId = val[val.length - 1]
        },
        edit (n) {
            this.form = {}
            this.visible = true
            if (n === -1) {
                this.isAdd = true
                this.selectedRole = []
            } else {
                this.isAdd = false
                this.form = {...n}
                this.selectedRole = this.form.selectedRole
                delete this.form.selectedRole
            }
        },
        // 删除
        del (id) {
            this.$confirm('确认删除员工？').then(async () => {
                await delAdmin({adminId: id})
                this.$notify({
                    title: '成功',
                    message: '删除成功',
                    type: 'success'
                })
                this.getAdminList()
            })
        },
        // 新增 编辑
        async submit () {
            if (this.isAdd) {
                await addAdmin(this.form)
            } else {
                await editAdmin(this.form)
            }
            this.visible = false
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.getAdminList()
        },
        // 数据递归
        recursion (data) {
            if (data.length <= 0) {
                return
            }
            for (let item of data) {
                item.value = item.grId
                item.label = item.grName
                delete item.grId
                delete item.grName
                delete item.grPid
                delete item.grRemarks
                delete item.level
                if (item.children.length === 0) {
                    delete item.children
                }
                if (typeof item.children === 'object' && item.children.length > 0) {
                    this.recursion(item.children)
                }
            }
            return data
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
.administrators{
    .el-input{width:200px;}
}
</style>
