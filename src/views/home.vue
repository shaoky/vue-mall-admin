<template>
	<div class="wrap">
        <header class="v-header">
            <div class="logo">商城运营管理系统</div>
            <div class="nav">
                <!-- @select="handleSelect" -->
                <el-menu  :default-active="navIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                    <template v-for="(item,index) in group">
                        <el-menu-item :index="item.columnURL" :key="index">{{item.columnName}}</el-menu-item>
                    </template>
                    <!-- <el-menu-item index="/">首页</el-menu-item>
                    <el-menu-item index="/business">前台业务</el-menu-item>
                    <el-menu-item index="/system">系统管理</el-menu-item>
                    <el-menu-item index="/data">数据管理</el-menu-item> -->
                    <el-submenu index="5">
                        <template slot="title">角色账号</template>
                        <el-menu-item index="userInfo">个人信息</el-menu-item>
                        <el-menu-item index="editPasswrod">修改</el-menu-item>
                        <el-menu-item index="loginOut">登出</el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
        </header>

        <div class="mainBody" id="mainBody">
            <router-view />
        </div>

        <!-- 弹出框-个人信息 -->
        <el-dialog
            v-if="userInfo"
            title="个人信息"
            :visible.sync="userInfoVisible"
            width="30%" class="userInfo">
            <el-form ref="form" :model="userInfo" label-width="80px">
                <el-form-item label="用户名：">{{userInfo.nickName}}</el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="userInfoVisible = false">取 消</el-button>
                <el-button type="primary" @click="userInfoVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 弹出框-修改密码 -->
        <el-dialog v-if="userInfo" title="修改密码" :visible.sync="editPasswordVisible" width="30%" class="editPassword">
            <el-form ref="form" :model="editPassword" label-width="100px">
                <el-form-item label="用户名：">{{userInfo.nickName}}</el-form-item>
                <el-form-item label="旧密码：">
                    <el-input type="password" v-model="editPassword.loginPwd"></el-input>
                </el-form-item>
                <el-form-item label="新密码：">
                    <el-input type="password" v-model="editPassword.newLoginPwd"></el-input>
                </el-form-item>
                <el-form-item label="重复新密码：">
                    <el-input type="password" v-model="confirmNew"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editPasswordVisible = false">取 消</el-button>
                <el-button type="primary" @click="reset">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { resetPassword, loginout } from '@/api/getData'
import validator from '@/utils/validator.js'

export default {
    data () {
        return {
            userInfoVisible: false,
            editPasswordVisible: false,
            editPassword: {
                loginPwd: '',
                newLoginPwd: ''
            },
            confirmNew: ''
        }
    },
    computed: {
        ...mapGetters({
            navIndex: 'getNavIndex',
            userInfo: 'getUserInfo'
        }),
        group () {
            return this.$store.state.groups.group
        }
    },
    mounted () {
        if (!this.group) {
            this.$store.dispatch('AGetAuthority')
        }
        if (!this.userInfo) {
            // this.$store.dispatch(this.types.AGetUserInfo)
            this.AGetUserInfo()
        }
    },
    methods: {
        ...mapMutations(['MDelToken']),
        ...mapActions(['AGetUserInfo']),
        handleSelect (key, keyPath) {
            console.log(key)
            switch (key) {
            case '/':
                this.$router.push({name: 'index'})
                break
            case '/business':
                this.$router.push({path: '/business/order/index'})
                break
            case '/system':
                this.$router.push({path: '/system/setting/website'})
                break
            case '/data':
                this.$router.push({path: '/data/type/basis-list'})
                break
            case 'userInfo':
                this.userInfoVisible = true
                break
            case 'editPasswrod':
                this.editPasswordVisible = true
                break
            case 'loginOut':
                this.$confirm('是否确认退出登录?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // this.out()
                    this.MDelToken()
                    this.$router.push({'path': '/'})
                })
                break
            }
        },
        // 修改密码
        async reset () {
            if (validator.pass(this.editPassword.loginPwd)) {
                this.$message(validator.pass(this.editPassword.loginPwd))
                return
            }
            if (!this.editPassword.newLoginPwd) {
                this.$message('请输入新密码')
                return
            }
            if (!this.confirmNew) {
                this.$message('请再次输入新密码')
                return
            }
            if (this.editPassword.newLoginPwd !== this.confirmNew) {
                this.$message('两次输入的密码不一致')
                return
            }
            let res = await resetPassword(this.editPassword)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
            }
            this.editPasswordVisible = false
            console.log(res)
        },
        // 登出
        async out () {
            let res = await loginout()
            console.log(res)
        }
    }
}
</script>

<style lang="less">
@import "../assets/less/define.less";
.wrap{
    .v-header{display: flex; height: 80px; background: #007cfc;position: fixed; top: 0; left: 0; right: 0; z-index: 9; overflow: hidden;
        .logo{flex: 1; font-size: 26px;line-height: 80px; color: #fff; padding-left: 50px;}
        .nav{display: flex; align-items: center; margin-right: 52px;
            .el-menu-demo{background-color: transparent; border-bottom: none;
            }
            .el-menu--horizontal>.el-menu-item{height: 53px;}
        }
    }
    .mainBody{position: absolute; top: 80px; left: 0; right: 0; bottom: 0; overflow: hidden; overflow-y: auto; width: auto;
        /*左边导航*/
        .el-aside{ position: fixed; top: 80px; left: 0; bottom: 0; background-color: #fff; box-shadow: inset -2px 0 0 #e5e5e5;
            .el-menu{border-right: none;}
        }
        /*主体内容区*/
        .right-main{flex: 1; padding: 0 40px 40px 240px; background: #fff;}
    }
}

// 弹出框-用户信息
.userInfo{
    .el-dialog__body{}
}

/*
 * 导航样式覆盖
 */

.el-menu--horizontal>.el-menu-item{color: #fff!important; font-size: 16px; padding: 0 10px; margin: 0 21px!important;} // 默认颜色
// 选中颜色
.el-menu--horizontal>.el-menu-item.is-active{color: #fff!important; opacity: .8; border-bottom: 2px solid #fff;}
.el-menu--horizontal .el-menu-item:not(.is-disabled):focus, .el-menu--horizontal .el-menu-item:not(.is-disabled):hover{color: #fff;}
// 选中背景颜色
.el-menu--horizontal>.el-menu-item:hover{background-color: transparent!important;}
.el-menu-item:focus, .el-menu-item:hover{background-color: transparent!important;}
// 二级下拉
.el-menu--horizontal>.el-submenu.is-active .el-submenu__title{opacity: .8; color: #fff;}
.el-menu--horizontal>.el-submenu .el-submenu__title{color: #fff!important; font-size: 16px;} // 文字
.el-menu--horizontal>.el-submenu .el-submenu__title:hover{opacity: .8; background-color: transparent!important; color: #fff!important;}
.el-menu--horizontal .el-submenu__title i{color: #fff;} // 箭头
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title{color: #303133;}
.el-menu--horizontal .el-menu .el-menu-item, .el-menu--horizontal .el-menu .el-submenu__title:hover{color: #303133;}
.el-menu--horizontal .el-menu .el-menu-item:hover{color: #f00!important;} // 鼠标经过
.el-menu--horizontal .el-menu .el-menu-item.is-active, .el-menu--horizontal .el-menu .el-submenu__title:hover{color: #f00;} // 选中
</style>
