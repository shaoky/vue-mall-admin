<template>
    <div class="role-child">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限设置</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">{{groupName}}：</div>
        <div class="custom-tree-container">
            <div class="block">
                <el-tree ref="eltree" :default-checked-keys="defaultChecked" :data="list" node-key="id" show-checkbox @check="handleSelect" :default-expand-all="true" :expand-on-click-node="false"></el-tree>
            </div>
        </div>
        <el-button type="primary" style="margin-top:20px;" @click="addRoleAuthority">保存</el-button>
    </div>
</template>

<script>
import { getWebpage, getRoleAuthority, addRoleAuthority, getUserAuthority } from '@/api/getData'

export default {
    data () {
        return {
            groupName: '',
            form: { },
            list: [],
            isAdd: true,
            visible: false,
            copyData: {},
            defaultChecked: []
        }
    },
    mounted () {
        this.form.grId = parseInt(this.$route.query.grId)
        this.groupName = this.$route.query.groupName
        this.getRoleAuthority()
        this.getWebpage()
    },
    methods: {
        // 获取用户权限
        async getUserAuthority () {
            let res = await getUserAuthority()
            console.log(res)
        },
        // 获取网页列表
        async getWebpage () {
            let res = await getWebpage()
            let data = res.data.list
            this.list = this.recursion(data)
            console.log(this.list)
        },
        // 获取角色权限
        async getRoleAuthority () {
            let res = await getRoleAuthority({grId: this.form.grId})
            console.log(res)
            this.defaultChecked = JSON.parse(res.data.info.columnId)
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
            console.log(this.$refs.eltree.getCheckedKeys())
            this.defaultChecked = this.$refs.eltree.getCheckedKeys()
            // 每次(选中，取消选中)点击都会传入id, 第一次选中数组保存id,并删除他的所有子代id，取消选择又会传入id，那就要 从这个数组中找出这个id的index，从数组中删除
            // if (this.defaultChecked.includes(n.id)) {
            //     let index = this.defaultChecked.findIndex((value) => value === n.id)
            //     this.defaultChecked.splice(index, 1)
            //     this.delChild(n.children)
            // } else {
            //     this.defaultChecked.push(n.id)
            //     this.pushChild(n.children)
            // }
            // console.log(this.defaultChecked)
        },
        // 添加权限
        async addRoleAuthority () {
            this.form.columnId = JSON.stringify(this.defaultChecked)
            await addRoleAuthority(this.form)
            this.$notify({
                title: '成功',
                message: '设置成功',
                type: 'success'
            })
            this.$store.dispatch('AGetAuthority')
            // this.getRoleAuthority()
        },
        pushChild (children) {
            if (children.length === 0) {
                return
            }
            for (let item of children) {
                if (this.defaultChecked.includes(item.id)) {
                    // let index = this.defaultChecked.findIndex((value) => value === item.id)
                    // this.defaultChecked.splice(index, 1)
                    continue
                } else {
                    this.defaultChecked.push(item.id)
                    if (item.children) {
                        this.pushChild(item.children)
                    }
                }
            }
        },
        delChild (children) {
            if (children.length === 0) {
                return
            }
            for (let item of children) {
                let index = this.defaultChecked.findIndex((value) => value === item.id)
                this.defaultChecked.splice(index, 1)
                if (item.children) {
                    this.delChild(item.children)
                }
            }
        }
    },
    components: {

    }
}
</script>

<style scoped lang="less">
.role-child{
    .title{font-size:18px;margin-bottom:20px;}
    .custom-tree-node {flex: 1;display: flex;align-items: center;justify-content: space-between;font-size: 14px;padding-right: 8px;}
}
</style>
