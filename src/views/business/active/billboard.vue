<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>榜单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-button type='primary' @click="edit(-1)">新建</el-button>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="标号" prop="title"></el-table-column>
            <el-table-column label="排序" prop="gaSort"></el-table-column>
            <el-table-column label="状态" prop="state">
                <template slot-scope="scope">
                    {{ list[scope.$index].isOpen | getIsOpen }}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
               <template slot-scope="scope">
                   <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                   <el-button type="text" @click="del(scope.row.gapId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页!-->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination> -->
        <!-- 新增/编辑弹出框 -->
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="40%" overflow="scroll" center>
            <el-form label-width="120px">
                <el-form-item label="商品选择：">
                    <el-button @click="checkGoods">选择商品</el-button>
                </el-form-item>
                <el-form-item label="排序">
                    <el-input v-model="form.gaSort"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="商品选择" :visible.sync="dialogGoods" width="40%" overflow="scroll">
            <commodity @goodsids="goodsids" @hide="hideGoods"></commodity>
        </el-dialog>
    </div>
</template>
<script>
import { getBillBoardList, getBillBoardadd, getBillBoardupdate, getBillBoarddel } from '@/api/getData'
import pagination from '@/components/pagination'
import commodityMenu from '@/components/commodity'
import status from '@/mixins/status'
export default {
    mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20,
                mark: 'HM-IndexBillBoard'
            },
            list: [],
            dialogVisible: false,
            dialogGoods: false,
            page: {
                total: 20
            },
            goodslist: [],
            form: {}
        }
    },
    mounted () {
        this.getBillBoardList()
    },
    methods: {
        async getBillBoardList () {
            let res = await getBillBoardList(this.search)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        // 分页开始
        handleCurrentChange (val) {
            this.form.page = val
            this.getActivePostionList()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getActivePostionList()
        },
        // 分页结束
        // 商品选择
        checkGoods () {
            this.dialogGoods = true
        },
        hideGoods () {
            this.dialogGoods = false
        },
        goodsids (val) {
            this.goodslist = val
        },
        del (index) {
            this.$confirm('确认删除吗？').then(
                async () => {
                    try {
                        await getBillBoarddel({gapId: index})
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    } catch (err) {
                        console.log(err)
                    }

                    this.getBillBoardList()
                }
            )
        },
        edit (index) {
            // -1为新建
            this.form = {}
            this.dialogVisible = true
            if (index === -1) {
                // 新增
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = JSON.parse(JSON.stringify(this.list[index]))
                if (this.form.isOpen === 0) {
                    this.form.isOpen = false
                } else if (this.form.isOpen === 1) {
                    this.form.isOpen = true
                }
            }
        },
        async submit () {
            if (this.form.isOpen) {
                this.form.isOpen = 1
            } else {
                this.form.isOpen = 0
            }
            this.form.mark = 'HM-IndexBillBoard'
            if (this.isAdd) {
                // console.log(this.form)
                // console.log(this.$refs.commodity.multipleSelection)
                // this.form.goodsId = this.$refs.commodity.goodslist
                this.form.goodsId = this.goodslist

                try {
                    this.form.isOpen = 1
                    let res = await getBillBoardadd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getBillBoardList()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res = await getBillBoardupdate(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getBillBoardList()
                    }
                } catch (err) {}
            }
        }
    },
    components: {
        pagination,
        'commodity': commodityMenu
    }
}

</script>
