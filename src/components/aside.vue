<template>
    <div class="aside-menu">
        <div v-if="groups[groupIndex]">
            <template v-for="(item,index) in groups[groupIndex].children">
                <el-submenu :index="index+'1'" :key="index">
                    <template slot="title">
                        <span>{{item.columnName}}</span>
                    </template>
                    <template v-for="(item1,index1) in item.children">
                        <el-menu-item-group :key="index1">
                            <el-menu-item :index="item1.columnURL">{{item1.columnName}}</el-menu-item>
                        </el-menu-item-group>
                    </template>
                </el-submenu>
            </template>
        </div>
    </div>
</template>

<script>
import { getUserAuthority } from '@/api/getData'

export default {
    data () {
        return {
            groupIndex: null,
            groups: this.group
        }
    },
    props: {
        group: [Array, String],
        path: [String]
    },
    mounted () {
        if (!this.groups) {
            let p = Promise.resolve()
            p.then((res) => {
                if (!this.group) {
                    // this.$store.dispatch('AGetAuthority')
                }
                let resp = getUserAuthority()
                return resp// 必须调接口，dispatch修改了vuex的状态，但在then链里取到的group还是原先的
            }).then((res) => {
                this.groups = res.data
                let path = this.path
                for (let [index, item] of res.data.entries()) {
                    if (item.columnURL === path) {
                        this.groupIndex = index
                    }
                }
            })
        } else {
            let path = this.path
            for (let [index, item] of this.groups.entries()) {
                if (item.columnURL === path) {
                    this.groupIndex = index
                }
            }
        }
    },
    methods: {

    },
    components: {

    }
}
</script>

<style scoped lang="less">
</style>
