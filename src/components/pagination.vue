<template>
    <div class="pagination-components">
        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1,10,20,40]"
            :page-size="20"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
    </div>
</template>

<script>

export default {
    data () {
        return {
            currentPage: 1 // 默认页码
        }
    },
    props: {
        // 总条数
        total: {
            type: Number,
            required: true
        }
    },
    mounted () {
    },
    methods: {
        // 设置每页多少条
        handleSizeChange (val) {
            this.$emit('handleSizeChange', val)
            const box = document.getElementById('mainBody')
            box.scrollTop = 0
        },
        // 当前多少页
        handleCurrentChange (val) {
            this.$emit('handleCurrentChange', val)
            const box = document.getElementById('mainBody')
            box.scrollTop = 0
        }
    }
}
</script>

<style scoped lang="less">

</style>
