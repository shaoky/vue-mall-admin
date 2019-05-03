<template>
    <div class="role-child">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色成员管理</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="custom-tree-container">
            <div class="block">
                <el-tree
                :data="list"
                node-key="id"
                :default-expand-all="true"
                :expand-on-click-node="false">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ node.label }}</span>
                    <span>
                        <el-button type="text" size="mini" @click="() => append(data,-1)">
                            新增
                        </el-button>
                        <el-button type="text" size="mini" @click="() => append(data)">
                            编辑
                        </el-button>
                        <el-button type="text" size="mini" @click="() => remove(node, data)">
                            删除
                        </el-button>
                        <el-button type="text" size="mini" @click="$router.push({path:'/system/admin/authority',query:{grId:data.id,groupName:data.label}})" ><!-- v-if="data.level===2" -->
                            设置权限
                        </el-button>
                    </span>

                </span>
                </el-tree>
            </div>
        </div>
        <el-button type="primary" style="margin-top:20px" @click="add">添加一级角色分组</el-button>

        <el-dialog  title="添加分组成员"  :visible.sync="visible"  width="30%"  center>
            <el-form label-width="120px">
                <el-form-item label="名称：">
                    <el-input style="width:200px;" v-model="form.grName"></el-input>
                </el-form-item>
                <el-form-item label="描述：">
                    <el-input style="max-width:300px;" v-model="form.grRemarks"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit(copyData)">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getRoleList, addRole, editRole, delRole } from '@/api/getData'

export default {
    data () {
        return {
            form: { },
            list: [],
            isAdd: true,
            visible: false,
            copyData: {}
        }
    },
    computed: {

    },
    mounted () {
        this.getRoleList()
    },
    methods: {
        // 获取列表
        async getRoleList () {
            let res = await getRoleList()
            let data = res.data.list
            this.list = this.recursion(data)
            console.log(this.list)
        },
        append (n, c) { // 如果c参数是-1 就是新增
            this.copyData = n // 浅复制
            console.log(n)
            this.form = {}
            this.visible = true
            if (c === -1) {
                this.form.grPid = n.id
                this.isAdd = true
            } else {
                this.isAdd = false
                if (n.grPid === 0) {
                    this.form.grPid = 0
                    this.form.grId = n.id
                } else {
                    this.form.grPid = n.grPid
                    this.form.grId = n.id
                }

                this.form.grName = n.label
                this.form.grRemarks = n.grRemarks
            }
        },
        async submit (data) {
            if (this.isAdd) {
                await addRole(this.form)
                this.getRoleList()
            } else {
                await editRole(this.form)
                this.getRoleList()
            }
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
            // console.log(data)
            // const newChild = { id: id++, label: this.form.grName, children: [] }
            // if (!data.children) {
            //     this.$set(data, 'children', [])
            // }
            // data.children.push(newChild)
        },

        async remove (node, data) {
            await delRole({grId: data.id})
            this.getRoleList()
            this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
            })
            // console.log(data)
            // const parent = node.parent
            // const children = parent.data.children || parent.data
            // const index = children.findIndex(d => d.id === data.id)
            // children.splice(index, 1)
        },
        add () {
            this.form = { grPid: 0 }
            this.visible = true
            this.isAdd = true
        },

        // 数据递归
        recursion (data) {
            if (data.length <= 0) {
                return
            }
            for (let item of data) {
                item.id = item.grId
                item.label = item.grName
                delete item.grId
                delete item.grName
                if (typeof item.children === 'object' && item.children.length > 0) {
                    this.recursion(item.children)
                }
            }
            return data
        },
        handleSelect (n) {
            console.log(n)
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
.role-child{
    .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
}
</style>
