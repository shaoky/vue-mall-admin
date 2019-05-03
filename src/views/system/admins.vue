<template>
  <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button @click="$router.push({name:'admin-edit',query:{id:0}})">添加</el-button>

        <el-table border stripe :data="admins" class="mt20">
            <el-table-column prop="id" label="ID" width="80px" />
            <el-table-column prop="username" label="账号" width="200px" />
            <el-table-column prop="name" label="名称" width="200px" />
            <el-table-column prop="nickname" label="昵称" width="200px" />
            <el-table-column :formatter="groupFormatter" label="权限" width="100px" />
            <el-table-column prop="state" label="状态" width="100px" />
            <el-table-column labe="操作">
                <template slot-scope="scope">
                <el-button size="mini" @click="$router.push({name:'admin-edit',query:{id:scope.row.id}})">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>

export default {
    name: 'admins',

    data () {
        return {
            count: 0,
            admins: []
        }
    },

    computed: {
        groups () {
            return this.$store.state.groups.groups
        }
    },

    mounted () {
        this.load()
    },

    methods: {
        load () {
            this.$store.dispatch(this.types.AGetGroups)
            this.$http.get('admins').then(resp => {
                this.count = resp.data.count
                this.admins = resp.data.admins
            })
        },

        groupFormatter (row) {
            for (let index in this.groups) {
                const g = this.groups[index]
                if (g.id === row.groupID) {
                    return g.name
                }
            }

            return '未知的分组'
        }
    } // end methods
}
</script>
