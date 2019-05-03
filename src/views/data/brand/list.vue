<template>
    <div class="merchants-goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品数据</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button type="primary" @click="editField({}, isAdd = true)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="品牌名称" prop="brandName"></el-table-column>
            <el-table-column label="品牌首字母" prop="brandLetter"></el-table-column>
            <el-table-column label="品牌图片">
                <template slot-scope="scope">
                    <img :src="scope.row.brandImage" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="brandSort"></el-table-column>
            <el-table-column label="状态" width="80px;">
                <template slot-scope="scope">{{ scope.row.isOpen | getIsOpen }}</template>
            </el-table-column>
            <el-table-column label="相关" prop=""></el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button type="text" @click="isAdd = false, editField(scope.row)">编辑</el-button>
                    <el-button type="text" @click="delGoodsBrand(scope.row.brandId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination> -->
        <!-- 新增编辑 -->
        <el-dialog :title="isAdd ? '新增品牌' : '编辑品牌'" :visible.sync="dialogVisible" width="500px" center>
                <el-form label-width="120px">
                    <el-form-item label="品牌名称：">
                        <el-input style="max-width:300px;" v-model="form.brandName"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌首字母：">
                        <el-input style="width:300px;" v-model.number="form.brandLetter"></el-input>
                    </el-form-item>
                    <el-form-item label="品牌介绍：">
                        <el-input type="textarea" style="width:300px;" v-model="form.brandDesc"></el-input>
                    </el-form-item>

                    <el-form-item label="排序：">
                        <el-input style="width:300px;" v-model.number="form.brandSort"></el-input>
                    </el-form-item>
                    <el-form-item label="是否启用：">
                        <el-checkbox v-model="form.isOpen"></el-checkbox>
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
import { getGoodsBrandList, addGoodsBrand, delGoodsBrand, updateGoodsBrand } from '@/api/getData'
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            form: {
                isOpen: true,
                sort: 100
            },
            search: {
                page: 0,
                size: 20
            },
            /**
             * 新增/编辑
             */
            attrType: [
                {value: 1, label: '输入框'}, {value: 2, label: '下拉框'}
            ],
            bakForm: {},
            list: [],
            index: '',
            isAdd: true,
            dialogVisible: false
        }
    },
    mounted () {
        this.bakForm = {...this.form}
        this.getGoodsBrandList()
    },
    methods: {

        async getGoodsBrandList () {
            let res = await getGoodsBrandList(this.search)
            this.list = res.data.list
        },
        // 删除属性
        async delGoodsBrand (id) {
            this.$confirm('确定删除此商品属性？').then(
                async () => {
                    try {
                        let res = await delGoodsBrand({brandId: id})
                        if (res.code === 200) {
                            this.getGoodsBrandList()
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            })
                        }
                    } catch (err) {}
                }
            )
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getGoodsBrandList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsBrandList()
        },
        async editField (item) {
            // isAdd 新增属性传-1，编辑的时候传的下标

            if (this.isAdd) {
                this.isAdd = true
                this.form = {...this.bakForm}
            } else {
                // if (item.isOpen === 1) {
                //     item.open = true
                // } else {
                //     item.open = false
                // }
                this.isAdd = false
                // this.index = isAdd
                this.form = {...item}
                delete this.form.children
                // if (this.form.isOpen === 1) {
                //     this.form.isOpen = true
                // } else {
                //     this.form.isOpen = false
                // }
            }
            this.dialogVisible = true
        },
        async submit () {
            // if (this.form.open) {
            //     this.form.isOpen = 1
            // } else {
            //     this.form.isOpen = 0
            // }
            delete this.form.attrTypeName
            delete this.form.goodsClassName
            if (this.isAdd) {
                try {
                    let res = await addGoodsBrand(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsBrandList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await updateGoodsBrand(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsBrandList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            }
        },
        handleAvatarSuccess (res, file) {
            this.form.imageUrl = res.data.url
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">
.merchants-goods{
    .children{border-bottom:1px solid #f5f5f5;display:flex;
        .item{height:65px;border-right:1px solid #f5f5f5;display: flex;align-items: center; padding-left: 10px;}
        .item:nth-child(1){width:101px;margin-left:39px;border-left:1px solid #f5f5f5;color:#007CFC; text-indent: 20px;}
        .item:nth-child(2){width:80px;}
        .item:nth-child(3){width:180px;}
        .item:nth-child(4){width:81px;}
        .item:nth-child(5){width:280px; border-right: none;}
        // .item:nth-child(11){width:150px;}
    }
    .children:last-child{border:none;}
    .children:after{clear: both;content: "";width: 0;height: 0;display: block;}
}
</style>
<style lang="less">
.merchants-goods{
    .el-pagination{
        text-align:left;
    }
}
</style>
