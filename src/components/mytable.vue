<template>
    <div>

    </div>
</template>

<script>
export default {
    data () {
        return {
            options: [
                {no: 1, name: '品牌', remind: '填写来源产地', rules: 'xx', type: 'combobox', ui: 'vailType', company: '度', operationType: '普通输入', screen: '筛选属性'},
                {no: 2, name: '产品系列', remind: '填写来源产地', rules: 'xx', type: 'combobox', ui: 'vailType', company: '度', operationType: '普通输入', screen: '筛选属性'}
            ]
        }
    },
    props: {
        childrenList: {
            type: Array
        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>

<style scoped lang="less">

</style>
