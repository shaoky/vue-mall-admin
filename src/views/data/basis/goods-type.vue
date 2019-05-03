<template>
    <div class="merchants-goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>基础数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="primary" @click="editField(), isAdd = true">新增</el-button>
        <el-table border :data="list" class="mt20">
            <el-table-column label="类型名称" prop="gbName"></el-table-column>
            <el-table-column label="关联分类" prop="goodsclassname"></el-table-column>
            <el-table-column label="属性数量" prop="attrNum"></el-table-column>
            <el-table-column label="规格数量" prop="specNum"></el-table-column>
            <el-table-column label="设置" width="180px">
                <template slot-scope="scope">
                    <el-button type="text" @click="$router.push({path:'/data/basis/goods-attr',query:{gbId:scope.row.gbId}})">属性列表</el-button>
                    <el-button type="text" @click="$router.push({path:'/data/basis/goods-spec',query:{gbId:scope.row.gbId}})">规格列表</el-button>
                </template>
            </el-table-column>
            <el-table-column label="操作" width="100px">
                <template slot-scope="scope">
                    <el-button type="text" @click="isAdd = false, editField(scope.row)">编辑</el-button>
                    <el-button type="text" @click="onDelete(scope.row.gbId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <!-- 新增编辑 -->
        <el-dialog title="添加/编辑" :visible.sync="dialogVisible" width="500px" center>
                <el-form label-width="100px">
                    <el-form-item label="类型名称：">
                        <el-input v-model="form.gbName"></el-input>
                    </el-form-item>
                </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getGoodsBasisList, addGoodsBasis, updateGoodsBasis, delGoodsBasis } from '@/api/getData'
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'

export default {

    data () {
        return {
            search: {
                page: 0,
                size: 20
            },
            propertys: [],
            goodsclassid: '',
            form: {
                gbName: ''
            },
            bakForm: {},
            list: [],
            index: '',
            index1: '',
            page: {
                total: 1
            },
            isAdd: true,
            dialogVisible: false
        }
    },
    mounted () {
        this.bakForm = {...this.form}
        this.getGoodsBasisList()
    },
    methods: {
        async getGoodsBasisList () {
            let res = await getGoodsBasisList(this.search)
            this.page.total = res.data.count
            this.list = res.data.list
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getGoodsattrs()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsattrs()
        },
        async editField (obj) {
            console.log(obj)
            // isAdd 新增属性传-1，编辑的时候传的下标
            if (this.isAdd) {
                this.form = {...this.bakForm}
            } else {
                this.form = {...obj}
            }
            this.dialogVisible = true
        },
        async submit () {
            if (this.isAdd) {
                let res = await addGoodsBasis(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                }
            } else {
                let res = await updateGoodsBasis(this.form)
            }
            this.getGoodsBasisList()
            this.dialogVisible = false
        },
        async onDelete (id) {
            let res = await delGoodsBasis({gbId: id})
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.getGoodsBasisList()
            }
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">

</style>
