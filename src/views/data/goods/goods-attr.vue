<template>
    <div class="merchants-goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品数据</el-breadcrumb-item>
            <el-breadcrumb-item>商品属性</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button type="primary" @click="editField({}, -1)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="属性名称" prop="attrName"></el-table-column>
            <el-table-column label="商品类型" prop="goodsClassName"></el-table-column>
            <el-table-column label="属性类型" prop="attrTypeName"></el-table-column>
            <el-table-column label="排序" prop="sort"></el-table-column>
            <el-table-column label="状态" width="80px;">
                <template slot-scope="scope">{{ scope.row.isOpen | getIsOpen }}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px">
                <template slot-scope="scope">
                    <el-button type="text" @click="editField(scope.row, scope.$index)">编辑</el-button>
                    <el-button type="text" @click="delGoodsAttr(scope.row.attrId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination> -->
        <!-- 新增编辑 -->
        <el-dialog :title="isAdd ? '新增属性' : '编辑属性'" :visible.sync="dialogVisible" width="500px" center>
                <el-form label-width="120px">
                    <el-form-item label="属性名称：">
                        <el-input style="max-width:300px;" v-model="form.attrName"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="字段名称：">
                        <el-input style="width:300px;" v-model.number="form.fieldName"></el-input>
                    </el-form-item> -->
                    <el-form-item label="字段提示：">
                        <el-input style="width:300px;" v-model.number="form.attrPrompt"></el-input>
                    </el-form-item>
                    <el-form-item label="属性类型：">
                        <el-select v-model="form.attrType">
                            <el-option v-for="item in attrType" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="下拉框的值：" v-if="form.attrType == 2">
                        <el-input style="width:300px;" v-model="form.attrContent"></el-input><br/>
                        多个值用,隔开
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input style="width:300px;" v-model.number="form.sort"></el-input>
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
import { getGoodsAttrList, addGoodsAttr, delGoodsAttr, updateGoodsAttr } from '@/api/getData'
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            goodsClassId: '',
            form: {
                isOpen: true,
                sort: 100
            },
            search: {
                goodsClassId: null
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
        this.search.goodsClassId = parseInt(this.$route.params.goodsClassId)
        this.form.goodsClassId = this.search.goodsClassId
        this.bakForm = {...this.form}
        this.getGoodsAttrList()
    },
    methods: {

        async getGoodsAttrList () {
            let res = await getGoodsAttrList(this.search)
            this.list = res.data.list
        },
        // 删除属性
        async delGoodsAttr (id) {
            this.$confirm('确定删除此商品属性？').then(
                async () => {
                    try {
                        let res = await delGoodsAttr({attrId: id})
                        if (res.code === 200) {
                            this.getGoodsAttrList()
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
            this.getGoodsAttrList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsAttrList()
        },
        async editField (item, isAdd) {
            // isAdd 新增属性传-1，编辑的时候传的下标

            if (isAdd === -1) {
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
                    let res = await addGoodsAttr(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsAttrList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await updateGoodsAttr(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsAttrList()
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
