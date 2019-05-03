<template>
    <div class="commodity-menu" id="commodity">
        <el-table border :data="goodsList" highlight-current-row max-height="500" @current-change="handlesCurrentChange" overflow="scroll" ref="multipleTable" tooltip-effect="dark" style="width: 100%" :isSeckillGoods="isSeckillGoods">
            <!-- <el-table-column type="index"  width="55"></el-table-column> -->
            <el-table-column label="商品标题" prop="goodsName"></el-table-column>
            <el-table-column label="商品分类" porp="goodsClassName" ></el-table-column>
            <el-table-column label="商品图片" prop="imageUrl">
                <template slot-scope="scope">
                    <img :src="scope.row.goodsImage" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="库存" prop="goodsStock"></el-table-column>
            <el-table-column label="商品排序" prop="sort">
                <template slot-scope="scope">{{ scope.row.sort }}</template>
            </el-table-column>
            <el-table-column label="商品状态" prop="isOpen">
                <template slot-scope="scope">{{ scope.row.isOpen | getIsOpen }}</template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
        <div style="margin-top: 20px">
                <el-button @click="confrim()">确认</el-button>
                <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
    </div>
</template>
<script>
import { getGoodsList } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20,
                goodsName: '',
                isOpen: null,
                goodsStockStatus: null,
                isMemberGoods: null,
                dialogGoods: false,
                isSeckillGoods: 0
            },
            goodsStockStatusList: [
                {label: '全部', value: null}, {label: '待售罄', value: 1}, {label: '已售罄', value: 2}
            ],
            goodsStatus: [
                {label: '全部', value: null}, {label: '未发布', value: 0}, {label: '已发布', value: 1}
            ],
            goodsList: [ ],
            attrList: [],
            page: {
                total: 20
            },
            positionList: [],
            multipleSelection: [],
            goodslist: [],
            goodsid: 0

        }
    },
    props: ['isSeckillGoods'],
    created () {
        this.search.isSeckillGoods = 1
        // this.isSeckillGoods = 1
    },
    mounted () {
        this.getGoodsList()
    },
    methods: {
        async getGoodsList () {
            let res = await getGoodsList(this.search)
            this.goodsList = res.data.list
            this.page.total = res.data.count
        },
        handlesCurrentChange (val) {
            this.goodslist = val
            this.goodsid = val.goodsId
            // this.$emit('goodsids', this.goodslist)
            this.currentRow = val
        },

        toggleSelection (rows) {
            if (rows) {
                rows.forEach(row => { this.$refs.multipleTable.toggleRowSelection(row) })
                this.$emit('hide')
            } else {
                this.$emit('hide')
                this.$refs.multipleTable.clearSelection()
            }
        },
        confrim () {
            for (let item of this.multipleSelection) {
                this.goodslist.push(item.goodsId)
                // this.goodsid = item.goodsId
            }
            // this.$emit('goodsids', this.goodslist)
            this.$emit('goodsids', this.goodsid)
            console.log(this.goodslist)
            console.log(this.goodsid)
            this.$emit('hide')
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
            this.goodsid = val.goodsId
            // console.log(this.multipleSelection)
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getGoodsList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getGoodsList()
        }

    },
    components: {
        pagination
    }

}
</script>
