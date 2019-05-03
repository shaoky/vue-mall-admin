<template>
    <div>
        <el-container>
            <el-aside width="200px" >
                <!-- v-if="group[groupIndex]" -->
            <el-menu router :default-active="asideIndex" >
                <aside-menu :group="group" :path="path"></aside-menu>
            </el-menu>
            </el-aside>
            <div class="right-main">
                <keep-alive>
                    <router-view v-if="$route.meta.keepAlive"></router-view>
                </keep-alive>
                <router-view v-if="!$route.meta.keepAlive"></router-view>
            </div>
        </el-container>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import asideMenu from '@/components/aside'

export default {
    data () {
        return {
            path: '/business'
        }
    },
    computed: {
        asideIndex () {
            return this.$route.path
        },
        group () {
            return this.$store.state.groups.group
        }
    },
    mounted () {
        this.setNavIndex('/business')
    },
    methods: {
        ...mapMutations(['setNavIndex'])
    },
    components: {
        asideMenu
    }
}
</script>

<style scoped>

</style>
