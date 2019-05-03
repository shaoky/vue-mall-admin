<template>
    <div class="role-child">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>后台栏目管理</el-breadcrumb-item>
        </el-breadcrumb>
                        <!-- show-checkbox
                @check="handleSelect" -->
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
                    </span>

                </span>
                </el-tree>
            </div>
        </div>
        <el-button type="primary" style="margin-top:20px" @click="add">添加一级网页分组</el-button>
        <el-dialog  title="添加/编辑分组成员"  :visible.sync="visible"  width="30%"  center>
            <el-form label-width="120px">
                <el-form-item label="网页名称：">
                    <el-input style="max-width:300px;" v-model="form.columnName"></el-input>
                </el-form-item>
                <el-form-item label="网页URL：">
                    <el-input style="max-width:300px;" v-model="form.columnURL"></el-input>
                </el-form-item>
                <el-form-item label="排序：">
                    <el-input style="max-width:300px;" v-model.number="form.sort"></el-input>
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
import { getWebpage, addWebpage, editWebpage, delWebpage } from '@/api/getData'

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
        this.getWebpage()
    },
    methods: {
        // 获取列表
        async getWebpage () {
            let res = await getWebpage()
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
                this.form.columnPid = n.id
                this.isAdd = true
            } else {
                this.isAdd = false
                if (n.grPid === 0) {
                    this.form.columnPid = 0
                    this.form.columnId = n.id
                } else {
                    this.form.columnPid = n.columnPid
                    this.form.columnId = n.id
                    this.form.columnURL = n.columnURL
                    this.form.sort = n.sort
                }
                this.form.columnName = n.label
            }
        },
        async submit (data) {
            if (this.isAdd) {
                await addWebpage(this.form)
                this.getWebpage()
            } else {
                await editWebpage(this.form)
                this.getWebpage()
            }
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
        },

        async remove (node, data) {
            await delWebpage({columnId: data.id})
            this.getWebpage()
            this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
            })
        },
        // 添加一级网页分组
        add (n) {
            this.form = { columnPid: 0 }
            this.visible = true
            this.isAdd = true
        },
        // 数据递归
        recursion (data) {
            if (data.length <= 0) {
                return
            }
            for (let item of data) {
                item.id = item.columnId
                item.label = item.columnName
                delete item.columnId
                delete item.columnName
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
