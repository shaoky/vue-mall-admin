<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>本周必买</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-button type='primary' @click="edit(-1)">新建</el-button>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="标号" prop="title"></el-table-column>
            <el-table-column label="商品id" prop="goodsId"></el-table-column>
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
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="40%" overflow:="scroll" center >
            <el-form label-width="120px">
                <el-form-item label="商品选择：">
                    <el-button @click="checkGoods">选择商品</el-button>
                </el-form-item>
                <!--<el-form-item label="位置选择：">
                    <el-button @click="checkLocation">选择位置</el-button>
                </el-form-item>!-->
                <el-form-item label="排序">
                    <el-input v-model="form.gaSort"></el-input>
                </el-form-item>

                <!--<commodity-menu></commodity-menu>!-->
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="商品选择" :visible.sync="dialogGoods" width="40%" overflow="scroll" right>
                <commodity @goodsids="goodsids" @hide="hideGoods"></commodity>
        </el-dialog>
        <!--<el-dialog title="位置选择" :visible.sync="dialogLocation" width="40%" overflow="scroll" right >
                <commodity-menu></commodity-menu>
        </el-dialog>!-->
    </div>
</template>
<script>
import { getWeekBuylist, getWeekBuyadd, getWeekBuyupdate, getWeekBuydel } from '@/api/getData'
import commodityMenu from '@/components/commodity'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
export default {
    mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20,
                mark: 'HM-IndexWeekBuy'
            },
            list: [],
            dialogVisible: false,
            form: {},
            dialogGoods: false,
            dialogLocation: false,
            page: {
                total: 20
            },
            multipleSelection: [],
            goodslist: []

        }
    },
    mounted () {
        this.getWeekBuylist()
    },
    methods: {
        async getWeekBuylist () {
            let res = await getWeekBuylist(this.search)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.form.page = val
            this.getActivePostionList()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getActivePostionList()
        },
        goodsids (val) {
            this.goodslist = val
        },
        checkGoods () {
            this.dialogGoods = true
        },
        hideGoods () {
            this.dialogGoods = false
        },
        edit (index) {
        // -1 为新建
            this.form = {}
            this.dialogVisible = true
            if (index === -1) {
                this.isAdd = true
            // this.form.gapId = this.fatherId
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
        del (index) {
            this.$confirm('确认删除吗？').then(
                async () => {
                    try {
                        await getWeekBuydel({gapId: index})
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    } catch (err) {
                        console.log(err)
                    }

                    this.getWeekBuylist()
                }
            )
        },
        async submit () {
            if (this.form.isOpen) {
                this.form.isOpen = 1
            } else {
                this.form.isOpen = 0
            }
            this.form.mark = 'HM-IndexWeekBuy'
            if (this.isAdd) {
                // console.log(this.form)
                // console.log(this.$refs.commodity.multipleSelection)
                // this.form.goodsId = this.$refs.commodity.goodslist
                this.form.goodsId = this.goodslist
                try {
                    this.form.isOpen = 1
                    let res = await getWeekBuyadd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getActivePostionList()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res = await getWeekBuyupdate(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getActivePostionList()
                    }
                } catch (err) {}
            }
            this.getWeekBuylist()
        }
    },
    components: {
        pagination,
        'commodity': commodityMenu

    }

}
</script>
