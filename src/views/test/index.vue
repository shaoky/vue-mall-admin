<template>
    <div>
        <el-container>
            <el-aside width="200px">
                <el-menu router :default-active="asideIndex">
                    <el-submenu index="1" key="1">
                        <template slot="title">
                            <span>测试</span>
                        </template>
                        <el-menu-item-group key="1.1">
                            <el-menu-item index="/test/concurrent">并发测试</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
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
            dialogVisible: true,
            path: '/system'
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
        this.setNavIndex('/system')
    },
    methods: {
        ...mapMutations(['setNavIndex']),
        handleClose (dene) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    // done()
                })
                .catch(_ => {})
        }
    },
    components: {
        asideMenu
    }
}
</script>

<style scoped>

</style>
