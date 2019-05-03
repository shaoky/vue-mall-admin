<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>广告列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="标题：">
                <el-input v-model="form.title"></el-input>
            </el-form-item>
            <el-form-item label="位置：">
                <el-select v-model="form.positionId" @change="getAdList">
                    <el-option  v-for="item in positionList" :key="item.value" :label="item.title" :value="item.positionId"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="状态：" >
                <el-select v-model="form.isOpen" @change="getAdList">
                    <el-option  v-for="item in status" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getAdList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({path:'info'})">新建</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="广告标题" prop="title"></el-table-column>
            <el-table-column label="广告位置" prop="positionTitle"></el-table-column>
            <el-table-column label="广告图片" prop="imageUrl">
                <template slot-scope="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态" prop="isOpen">
                <template slot-scope="scope">{{ list[scope.$index].isOpen | getIsOpen }}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <el-button @click="$router.push({path:'info',query:{adId:scope.row.adId}})" type="text" >编辑</el-button>
                    <el-button @click="del(scope.row.adId)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
    </div>
</template>

<script>
import { getAdList, getAdPositionList, delAd } from '@/api/getData'
import pagination from '@/components/pagination'
// import region from '@/components/common/region'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            form: {
                page: 1,
                size: 20,
                title: '',
                isOpen: null,
                positionId: null
            },
            status: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            list: [ ],
            page: {
                total: 20
            },
            positionList: []
        }
    },
    // computed:{
    //     getClassify(){

    //     }
    // },
    filters: {
        getState (value) {
            let text = ''
            if (value === 'draft') {
                text = '未发布'
            } else if (value === 'published') {
                text = '已发布'
            }
            return text
        },
        getClassify (value, arr) {
            let text = ''
            let classify = arr
            classify.forEach(
                (item, index) => {
                    if (item.id === value) { text = item.name }
                }
            )
            return text
        }
    },
    mounted () {
        this.getAdList()
        // 获取所有分类
        this.getAdPositionList()
    },
    methods: {
        async getAdList () {
            let res = await getAdList(this.form)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        async getAdPositionList () {
            let res = await getAdPositionList({page: 1, size: 100})
            this.positionList = res.data.list
        },
        getRegion (val) {
            this.form.regionid = val
        },
        async del (id) {
            this.$confirm('确定删除此广告？').then(
                async () => {
                    let res = await delAd({adId: id})
                    console.log(res)
                    if (res.code === 200) {
                        this.getAdList()
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
            this.getAdList()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getAdList()
        }
    },
    activated () {
        this.getAdList()
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
