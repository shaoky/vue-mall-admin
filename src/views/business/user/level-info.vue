<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-tabs type="border-card">
            <el-tab-pane label="拉人赚佣金">
                <el-form label-width="250px">
                    <el-form-item label="邀请直属会员：">
                        <el-input v-model="form.directlyMemberMoney" placeholder=""></el-input> 元
                    </el-form-item>
                     <el-form-item label="直属黄金会员团队新增黄金会员：">
                        <el-input v-model="form.teamAddMemberCommission" placeholder=""></el-input> 元
                    </el-form-item>
                    <el-form-item label="直属白金舵手团队新增黄金会员：">
                        <el-input v-model="form.managerTeamAddMemberCommission" placeholder=""></el-input> 元
                    </el-form-item>
                    <el-form-item label="直属钻石团队新增黄金会员：">
                        <el-input v-model="form.directorTeamAddMemberCommission" placeholder=""></el-input> 元
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="商品分佣金">
                <el-form label-width="200px">
                    <el-form-item label="分享商品得佣金(非会员)：">
                        <el-input v-model="form.goodsCommission" placeholder=""></el-input> %
                    </el-form-item>
                     <el-form-item label="直属会员购买佣金：">
                        <el-input v-model="form.memberGoodsCommission" placeholder=""></el-input> %
                    </el-form-item>
                </el-form>
            </el-tab-pane>
            <el-tab-pane label="团队分佣金">
                <el-form label-width="250px">
                    <el-form-item label="直属黄金舵手佣金收益：">
                        <el-input v-model="form.directlyMemberCommission" placeholder=""></el-input> %
                    </el-form-item>
                    <el-form-item label="直属白金舵手奖金收益：">
                        <el-input v-model="form.directlyManagerCommission" placeholder=""></el-input> %
                    </el-form-item>
                    <el-form-item label="直属钻石舵手奖金收益：">
                        <el-input v-model="form.directlyDirectorCommission" placeholder=""></el-input> %
                    </el-form-item>
                </el-form>
            </el-tab-pane>
        </el-tabs>

        <el-button class="el-button-center" type="primary" @click="submit()">保存</el-button>
    </div>
</template>

<script>
import { getUserLevelInfo, addUserLevel } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            levelId: null,
            form: {}
        }
    },
    mounted () {
        this.levelId = this.$route.params.levelId
        this.getUserLevelInfo()
    },
    methods: {
        async getUserLevelInfo () {
            let res = await getUserLevelInfo({levelId: this.levelId})
            this.form = res.data.info
        },
        async submit () {
            try {
                let res = await addUserLevel(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.$router.go(-1)
                }
            } catch (err) {}
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
    .el-input{width: auto;}
</style>
