<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="商品名称：">
                <el-input v-model="search.goodsName"></el-input>
            </el-form-item>
            <el-form-item label="库存：">
                <el-select v-model="search.goodsStockStatus" @change="getGoodsList">
                    <el-option v-for="item in goodsStockStatusList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否会员产品：">
                <el-select v-model="search.isMemberGoods" @change="getGoodsList">
                    <el-option label="全部" :value="null"></el-option>
                    <el-option label="会员产品" :value="1"></el-option>
                    <el-option label="非会员产品" :value="0"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品状态：" >
                <el-select v-model="search.isOpen" @change="getGoodsList">
                    <el-option  v-for="item in goodsStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getGoodsList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="$router.push({path:'add'})">添加商品</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="goodsList">
            <el-table-column label="商品标题" prop="goodsName"></el-table-column>
            <el-table-column label="商品分类" prop="goodsClassName"></el-table-column>
            <el-table-column label="商品图片" prop="imageUrl">
                <template slot-scope="scope">
                    <img :src="scope.row.goodsImage" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="商品价格" prop="shopPrice"></el-table-column>
            <el-table-column label="会员价格" prop="memberPrice"></el-table-column>
            <el-table-column label="升级会员产品">
                <template slot-scope="scope">{{ scope.row.isMemberGoods | getWhether }}</template>
            </el-table-column>
            <el-table-column label="库存" prop="goodsStock"></el-table-column>
            <el-table-column label="是否包邮" prop="order">
                <template slot-scope="scope">{{ scope.row.isFreeShipping | getWhether}}</template>
            </el-table-column>
            <el-table-column label="商品排序" prop="sort">
                <template slot-scope="scope">{{ scope.row.sort }}</template>
            </el-table-column>
            <el-table-column label="商品状态" prop="isOpen">
                <template slot-scope="scope">{{ scope.row.isOpen | getIsOpen }}</template>
            </el-table-column>
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <el-button @click="$router.push({path:'info',query:{goodsId:scope.row.goodsId}})" type="text" >编辑</el-button>
                    <el-button @click="setGoodsOpen(scope.row)" type="text">{{scope.row.isOpen ? '下架' : '上架'}}</el-button>
                    <el-button @click="delGoods(scope.row.goodsId)" type="text">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
    </div>
</template>

<script>
import { getGoodsList, delGoods, setGoodsOpen } from '@/api/getData'
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
                isMemberGoods: null
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
            positionList: []
        }
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
        async delGoods (id) {
            this.$confirm('确定删除此商品？').then(
                async () => {
                    let res = await delGoods({goodsId: id})
                    console.log(res)
                    try {
                        if (res.code === 200) {
                            this.getGoodsList()
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
        async setGoodsOpen (row) {
            let isOpen
            if (row.isOpen) {
                isOpen = 0
            } else {
                isOpen = 1
            }
            try {
                let res = await setGoodsOpen({goodsId: row.goodsId, isOpen: isOpen})
                this.getGoodsList()
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success'
                })
                console.log(res)
            } catch (err) {}
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

<style scoped lang="less">
</style>
