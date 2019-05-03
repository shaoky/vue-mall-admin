<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>文章管理</el-breadcrumb-item>
            <el-breadcrumb-item>文章列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="分类：">
                <el-select v-model="form.catID" @change="getArticles">
                    <el-option  v-for="item in classify" :key="item.value" :label="item.name" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.statestr" @change="getArticles">
                    <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="区域：">
                <region @handleChange="getRegion"></region>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getArticles">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({path:'info',query:{id:-1}})">新建</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="文章标题" prop="title"></el-table-column>
            <el-table-column label="文章分类" prop="catID">
                <template slot-scope="scope">
                    {{ list[scope.$index].catid,classify | getClassify }}
                </template>
            </el-table-column>
            <el-table-column label="文章状态" prop="state">
                <template slot-scope="scope">
                    {{ list[scope.$index].state | getState }}
                </template>
            </el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">
                    {{scope.row.created | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <el-button @click="$router.push({path:'info',query:{id:scope.row.id}})" type="text" >编辑</el-button>
                    <el-button @click="del(scope.row.id)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
    </div>
</template>

<script>
import { getArticles, getCategories, delArticles } from '@/api/getData'
import pagination from '@/components/pagination'
import region from '@/components/common/region'

export default {
    data () {
        return {
            form: {
                page: 0,
                size: 20,
                statestr: 'all',
                regionid: '00000000'
            },
            status: [
                {label: '未发布', value: 'draft'}, {label: '已发布', value: 'published'}, {label: '全部', value: 'all'}
            ],
            list: [ ],
            page: {
                total: 20
            },
            classify: []
        }
    },
    // computed:{
    //     getClassify(){

    //     }
    // },
    filters: {
        getState (value) {
            let text = ''
            if (value == 'draft') {
                text = '未发布'
            } else if (value == 'published') {
                text = '已发布'
            }
            return text
        },
        getClassify (value, arr) {
            let text = ''
            let classify = arr
            classify.forEach(
                (item, index) => {
                    if (item.id == value) { text = item.name }
                }
            )
            return text
        }
    },
    mounted () {
        this.getArticles()
        // 获取所有分类
        this.getCategories()
    },
    methods: {
        async getArticles () {
            let res = await getArticles(this.form)
            this.list = res.data.articles
            this.page.total = res.data.count
            console.log(res)
        },
        async getCategories () {
            let classify = await getCategories()
            console.log(classify)
            this.classify = classify.data.items
        },
        getRegion (val) {
            this.form.regionid = val
        },
        async del (id) {
            this.$confirm('确定删除此文章？').then(
                async () => {
                    let res = await delArticles({id: id})
                    console.log(res)
                    if (res.code == 200) {
                        this.getArticles()
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    }
                }
            )
        },
        handleCurrentChange (val) {
            this.form.page = val
            this.getArticles()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getArticles()
        }
    },
    components: {
        pagination,
        region
    }
}
</script>

<style scoped lang="less">
</style>
