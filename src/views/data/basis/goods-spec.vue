<template>
    <div class="merchants-goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
            <el-breadcrumb-item>{{info.gbName}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button type="primary" @click="editField({}, -1)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="属性名称" prop="specName"></el-table-column>
            <el-table-column label="属性类型" prop="specTypeName"></el-table-column>
            <el-table-column label="可选值列表" prop="specContent"></el-table-column>
            <el-table-column label="排序" prop="specSort"></el-table-column>
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
                        <el-input style="max-width:300px;" v-model="form.specName"></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="字段名称：">
                        <el-input style="width:300px;" v-model.number="form.fieldName"></el-input>
                    </el-form-item> -->
                    <el-form-item label="属性类型：">
                        <el-radio v-model="form.specType" :label="1">唯一属性</el-radio>
                        <el-radio v-model="form.specType" :label="2">单选属性</el-radio>
                        <el-radio v-model="form.specType" :label="3">多选属性</el-radio>
                    </el-form-item>
                    <el-form-item label="属性录入方式：">
                        <el-radio v-model="form.specWay" :label="1">手工录入</el-radio>
                        <el-radio v-model="form.specWay" :label="2">从默认值里选择</el-radio>
                    </el-form-item>
                    <el-form-item label="可选值：" v-if="form.specWay !== 1">
                        <el-input style="width:300px;" v-model="form.specContent"></el-input><br/>
                        多个值用,隔开
                    </el-form-item>
                    <el-form-item label="排序：">
                        <el-input style="width:300px;" v-model.number="form.specSort"></el-input>
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
import { getGoodsSpecList, addGoodsSpec, delGoodsSpec, updateGoodsSpec, getGoodsBasisInfo } from '@/api/getData'
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            gbId: null,
            info: {},
            form: {
                specType: 1,
                specWay: 1,
                isOpen: true,
                specSort: 10
            },
            search: {
                page: 1,
                size: 20
            },
            /**
             * 新增/编辑
             */
            attrType: [
                {value: 1, label: '手工录入'}, {value: 2, label: '单选'}, {value: 3, label: '多选'}
            ],
            bakForm: {},
            list: [],
            index: '',
            isAdd: true,
            dialogVisible: false
        }
    },
    mounted () {
        this.search.gbId = parseInt(this.$route.query.gbId)
        this.form.gbId = this.search.gbId
        this.bakForm = {...this.form}
        this.getGoodsSpecList()
        this.getGoodsBasisInfo()
    },
    methods: {
        async getGoodsBasisInfo () {
            let res = await getGoodsBasisInfo({gbId: this.search.gbId})
            this.info = res.data.info
        },
        async getGoodsSpecList () {
            let res = await getGoodsSpecList(this.search)
            this.list = res.data.list
        },
        // 删除属性
        async delGoodsSpec (id) {
            this.$confirm('确定删除此商品属性？').then(
                async () => {
                    try {
                        let res = await delGoodsSpec({attrId: id})
                        if (res.code === 200) {
                            this.getGoodsSpecList()
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
            this.getGoodsSpecList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsSpecList()
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
            delete this.form.specTypeName
            if (this.isAdd) {
                try {
                    let res = await addGoodsSpec(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsSpecList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await updateGoodsSpec(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsSpecList()
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
