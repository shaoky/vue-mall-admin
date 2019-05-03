<template>
    <div class="article-classify">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章分类</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-button type="primary" @click="edit(-1)">新建分类</el-button>
        </el-form>

        <el-table border :data="list" class="mt20">
            <el-table-column label="分类名称" prop="name"></el-table-column>
            <el-table-column label="关联个数" prop=""></el-table-column>
            <el-table-column label="分类位置" prop="">
                <template slot-scope="scope">{{ list[scope.$index].position | getPosition }}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' :total="page.total"></pagination> -->
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="分类名称：">
                    <!-- <el-select v-model="form" value-key="id" v-if="!isAdd">
                        <el-option v-for="(item,index) in list" :key="index" :label="item.name" :value="item"></el-option>
                    </el-select> -->
                    <el-input v-model="form.name"  style="max-width:168px;"></el-input>
                </el-form-item>
                <el-form-item label="分类位置：">
                    <el-select v-model="form.position">
                        <el-option v-for="(item,index) in position" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getCategories, delCategories, addCategories, updateCategories } from '@/api/getData'
import pagination from '@/components/pagination'
export default {
    data () {
        return {
            isAdd: true,
            fatherId: '',
            form: {},
            list: [ ],
            dialogVisible: false,
            // page: {
            //     total: 1
            // },
            position: [
                {label: '系统公告', value: 1}, {label: '使用指南', value: 2}, {label: '常见问题', value: 3}
            ]
        }
    },
    filters: {
        getPosition (value) {
            if (!value) { return }
            let text = ''
            if (value == 1) {
                text = '系统公告'
            } else if (value == 2) {
                text = '使用指南'
            } else if (value == 3) {
                text = '常见问题'
            }
            return text
        }
    },
    mounted () {
        this.getCategories()
    },
    methods: {
        async getCategories () {
            let res = await getCategories({page: 0, size: 20})
            this.list = res.data.items
            this.fatherId = res.data.id
            console.log(res)
        },
        del (id) {
            this.$confirm('确认删除此分类吗？').then(
                async () => {
                    let res = await delCategories({id: id})
                    console.log(res)
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getCategories()
                }
            )
        },
        edit (index) {
            // -1 为新建
            this.form = {}
            this.dialogVisible = true
            if (index === -1) {
                this.isAdd = true
                this.form.id = this.fatherId
            } else {
                this.isAdd = false
                this.form = JSON.parse(JSON.stringify(this.list[index]))
            }
        },
        // handleCurrentChange (val) {
        //     this.form.page = val
        //     this.getCategories()
        // },
        async submit () {
            if (this.isAdd) {
                // console.log(this.form)
                let res = await addCategories(this.form)
                console.log(res)
                this.$notify({
                    title: '成功',
                    message: '添加成功',
                    type: 'success'
                })
                this.dialogVisible = false
                this.getCategories()
            } else {
                // console.log(this.form)
                let res = await updateCategories(this.form)
                console.log(res)
                this.$notify({
                    title: '成功',
                    message: '编辑成功',
                    type: 'success'
                })
                this.dialogVisible = false
                this.getCategories()
            }
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
.article-classify{
    // .dialogContainer{
    //     width:400px;margin:0 auto;padding-left:33px;
    // }
}
</style>
