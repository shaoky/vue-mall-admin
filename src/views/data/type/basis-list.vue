<template>
    <div class="merchants-goods">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品数据</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-button type="primary" @click="editField({}, -1)">新增</el-button>

        <el-table class="mt20" border :data="list">
            <el-table-column label="分类名称">
                <template slot-scope="scope">
                    <span v-if="scope.row.parentId === 0">{{scope.row.goodsClassName}}</span>
                    <span class="sub-type-line" v-else :style="{marginLeft: scope.row.level * 15 + 'px'}">{{scope.row.goodsClassName}}</span>
                </template>
            </el-table-column>
            <el-table-column label="排序" prop="sort" width="80px;"></el-table-column>
            <el-table-column label="分类图标" width="180px;">
                <template slot-scope="scope">
                    <img :src="scope.row.imageUrl" style="max-height: 60px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="状态" width="80px;">
                <template slot-scope="scope">{{ list[scope.$index].isOpen | getIsOpen }}</template>
            </el-table-column>
            <el-table-column label="操作" width="320px">
                <template slot-scope="scope">
                    <el-button type="text" @click="editField(scope.row, scope.$index)">编辑</el-button>
                    <el-button type="text" @click="delGoodsType(scope.row.goodsClassId, list, scope.$index)">删除</el-button>
                    <el-button type="text" @click="editField(scope.row,-1)">添加子类</el-button>
                    <!-- <el-button type="text" @click="$router.push({name:'goodsAttr',params:{goodsClassId:scope.row.goodsClassId}})">查看属性</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination> -->
        <!-- 新增编辑 -->
        <el-dialog :title="isAdd ? '新增分类' : '编辑分类'" :visible.sync="dialogVisible" width="500px" center>
                <el-form label-width="120px">
                    <el-form-item label="分类名称：">
                        <el-input style="max-width:300px;" v-model="form.goodsClassName"></el-input>
                    </el-form-item>
                    <el-form-item label="分类排序：">
                        <el-input style="width:300px;" v-model.number="form.sort"></el-input>
                    </el-form-item>
                    <el-form-item label="分类图片：">
                        <el-upload
                            class="avatar-uploader"
                            :action="imgBaseUrl"
                            :show-file-list="false"
                            :on-success="handleAvatarSuccess">
                            <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="商品类型：">
                        <span style="margin-right: 20px;">{{form.gbName || goodsBasisInfo.gbName}}</span>
                        <el-button type="primary" size="small" @click="goodsTypedialogVisible = true">选择</el-button>
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
        <el-dialog title="商品类型"  :visible.sync="goodsTypedialogVisible" width="500px" center>
            <el-table border :data="goodsBasisList" highlight-current-row  @current-change="getGoodsBasisInfo">
                <el-table-column label="商品标题" prop="gbName"></el-table-column>
                <el-table-column label="属性数量" prop="attrNum"></el-table-column>
                <el-table-column label="规格数量" prop="specNum"></el-table-column>
            </el-table>
            <pagination @handleCurrentChange='handleCurrentChange1' @handleSizeChange="handleSizeChange1"  :total="goodsBasis.total"></pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="goodsTypedialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit1">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 商品属性 -->
        <!-- <el-dialog title="商品属性" :visible.sync="attrVisible" width="700px" center>
            <el-button type="primary" @click="addAttr()">新增</el-button>
            <el-table class="mt20" border :data="list" default-expand-all style="width: 761px;">
                <el-table-column label="分类名称" prop="goodsClassName" width="100px;"></el-table-column>
                <el-table-column label="排序" prop="order" width="80px;"></el-table-column>
                <el-table-column label="状态" width="80px;">
                    <template slot-scope="scope">{{ list[scope.$index].isOpen | getIsOpen }}</template>
                </el-table-column>
                <el-table-column label="操作" width="280px">
                    <template slot-scope="scope">
                        <el-button type="text" @click="editField(scope.row, scope.$index)">编辑</el-button>
                        <el-button type="text" @click="delGoodsType(scope.row.goodsClassId, list, scope.$index)">删除</el-button>
                        <el-button type="text" @click="editField(scope.row,-1)">添加子类</el-button>
                        <el-button type="text" @click="editAttr(scope.row)">添加属性</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog> -->
    </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env'
import { getGoodsTypeList, addGoodsType, delGoodsType, updateGoodsType, getGoodsBasisList } from '@/api/getData'
import datePicker from '@/components/date-picker'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            goodsClassId: '',
            form: {
                isOpen: true,
                classId: null
            },
            bakForm: {},
            list: [],
            index: '',
            isAdd: true,
            dialogVisible: false,
            attrVisible: true,
            /**
             * 商品类型
             */
            search1: {
                page: 0,
                size: 20
            },
            goodsBasis: {
                total: null
            },
            goodsBasisInfo: {},
            goodsBasisList: [],
            goodsTypedialogVisible: false
        }
    },
    mounted () {
        this.bakForm = {...this.form}
        this.getGoodsTypeList()
        this.getGoodsBasisList()
    },
    methods: {
        async getGoodsTypeList () {
            let res = await getGoodsTypeList({type: 1})
            this.list = res.data.list
        },
        async getGoodsBasisList () {
            let res = await getGoodsBasisList(this.search1)
            this.goodsBasisList = res.data.list
            this.goodsBasis.total = res.data.count
        },
        // 删除属性
        async delGoodsType (id, list, index) {
            try {
                let res = await delGoodsType({goodsClassId: id})
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    list.splice(index, 1)
                }
            } catch (err) {

            }
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getGoodsTypeList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsTypeList()
        },
        async editField (item, isAdd) {
            // isAdd 新增属性传-1，编辑的时候传的下标
            if (isAdd === -1) {
                this.isAdd = true
                this.form = {...this.bakForm}
                if (item.goodsClassId) {
                    this.form.classId = item.goodsClassId
                } else {
                    this.form.classId = null
                }
            } else {
                console.log(item)
                this.isAdd = false
                // this.index = isAdd
                this.form = {...item}
                // delete this.form.gbName
                if (this.form.isOpen === 1) {
                    this.form.isOpen = true
                } else {
                    this.form.isOpen = false
                }
            }
            this.dialogVisible = true
        },
        editAttr (item) {

        },
        async submit () {
            // if (this.form.isOpen) {
            //     this.form.isOpen = 1
            // } else {
            //     this.form.isOpen = 0
            // }
            this.form.gbId = this.goodsBasisInfo.gbId || this.form.gbId
            if (this.isAdd) {
                try {
                    let res = await addGoodsType(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsTypeList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await updateGoodsType(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getGoodsTypeList()
                        this.dialogVisible = false
                    }
                } catch (err) {}
            }
        },
        handleAvatarSuccess (res, file) {
            this.form.imageUrl = res.data.url
        },
        /**
         * 商品类型
         */
        handleCurrentChange1 (val) {
            this.search1.page = val
            this.getGoodsBasisList()
        },
        handleSizeChange1 (val) {
            this.search1.size = val
            this.getGoodsBasisList()
        },
        getGoodsBasisInfo (val) {
            console.log(val)
            this.goodsBasisInfoBak = val
        },
        submit1 () {
            this.goodsBasisInfo = this.goodsBasisInfoBak
            this.goodsTypedialogVisible = false
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">
.sub-type-line{background: url('../../../assets/images/common/sub_type_line.gif') no-repeat; padding-left: 20px;}
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
