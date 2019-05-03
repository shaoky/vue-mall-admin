<template>
    <div class="region-components">
        <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions"
            @change="handleChange" v-if="options.length > 0">
        </el-cascader>
    </div>
</template>

<script>
import { getRegion } from '@/api/getData'

export default {
    data () {
        return {
            options: [],
            selectedOptions: []
        }
    },
    props: {
        selected: {
            type: Array,
            default () {
                // 不设默认值，需要，请按照下面格式传入
                // return ['11000000', '11010000', '11010100']
            }
        }
    },
    mounted () {
        this.selectedOptions = this.selected
        this.getRegion()
    },
    methods: {
        async getRegion () {
            let res
            if (!window.localStorage.region) {
                res = await getRegion({
                    id: '00000000'
                })
                res = this.buildModel(res.data.regions)
                window.localStorage.setItem('region', JSON.stringify(res))
            } else {
                res = JSON.parse(window.localStorage.region)
            }
            // console.log(res)
            this.options = res
        },
        buildModel (data) {
            data.forEach((val) => {
                val.value = val.id
                val.label = val.name
                if (typeof val.regions === 'object') {
                    val.children = val.regions
                    delete val.regions
                    this.buildModel(val.children)
                }
                delete val.id
                delete val.name
            })
            return data
        },
        handleChange (value) {
            // console.log(value)
            // console.log(this.selectedOptions)
            this.$emit('handleChange', value[2])
        }
    }
}
</script>

<style scoped lang="less">
    .el-cascader{width: 300px;}
</style>
