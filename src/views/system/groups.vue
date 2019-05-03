<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button @click="edit(-1)">添加</el-button>

        <el-table border stripe :data="groups" class="mt20">
            <el-table-column prop="id" label="ID" width="80px" />
            <el-table-column prop="name" label="名称" width="300px" />
            <el-table-column prop="description" label="详细描述" />
            <el-table-column labe="操作">
            <template slot-scope="scope">
                <el-button size="mini" @click="edit(scope.$index)">编辑</el-button>
                <el-button size="mini" @click="access(scope.$index)">权限</el-button>
            </template>
            </el-table-column>
        </el-table>

        <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
            <el-form :model="dialog.group">
            <el-form-item label="名称">
                <el-input v-model="dialog.group.name"></el-input>
            </el-form-item>

            <el-form-item label="描述">
                <el-input type="textarea" v-model="dialog.group.description"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button style="width:100%" type="primary" @click="save()">确定</el-button>
            </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    name: 'groups',

    data () {
        return {
            dialog: {
                title: '编辑',
                visible: false,
                group: {}
            }
        }
    },

    computed: {
        groups () {
            return this.$store.state.groups.groups
        }
    },

    mounted () {
        this.setAsideIndex('/system/groups')
        this.load()
    },

    methods: {
        ...mapMutations(['setAsideIndex']),
        load () {
            this.$store.dispatch(this.types.AGetGroups)
        },

        edit (index) {
            this.dialog.visible = true

            if (index === -1) {
                this.dialog.group = {}
            } else {
                this.dialog.group = this.groups[index]
            }
        },

        access (index) {
            const id = this.groups[index].id
            this.$router.push({name: 'group-access', params: {id: id}})
        },

        save () {
            if (this.dialog.group.id) {
                const id = this.dialog.group.id
                this.$http.put(`groups/${id}`, this.dialog.group)
            } else {
                this.$http.post('groups', this.dialog.group).then(resp => {
                    this.load()
                })
            }

            this.dialog.group = {}
            this.dialog.visible = false
        }
    }
}
</script>
