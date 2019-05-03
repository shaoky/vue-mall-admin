<template>
    <div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { getGoodsList, getOrderList } from '@/api/getData'

export default {
    data () {
        return {
            search: {
                page: 1,
                size: 150,
                goodsName: '',
                isOpen: null,
                goodsStockStatus: null,
                isMemberGoods: null
            },
            goodsList: [],
            page: {
                total: null
            }
        }
    },
    mounted () {
        console.time('sort')
        for (let i = 0; i < 50; i++) {
            this.getOrderList(i)
        }
        console.timeEnd('sort')
    },
    methods: {
        ...mapMutations(['setNavIndex']),
        async getOrderList (i) {
            console.log(i)
            let res = await getOrderList(this.search)
            this.goodsList = res.data.list
            this.page.total = res.data.count
            console.log(i)
        }
    },
    components: {
    }
}
</script>

<style scoped>

</style>
