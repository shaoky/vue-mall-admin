<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="levelVisible = true, add()">新增等级</el-button>
            </el-form-item>
        </el-form> -->

        <el-table border :data="userList">
            <el-table-column prop="levelName" label="会员等级名称"></el-table-column>
            <!-- <el-table-column prop="needMoney" label="所需金额"></el-table-column> -->
            <el-table-column prop="needGoldPeople" label="黄金会员直属人数："></el-table-column>
            <el-table-column prop="needGoldTeamPeople" label="黄金会员团队人数："></el-table-column>
            <el-table-column prop="userType" label="用户类型"></el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="toEdit(scope.row)" type="text" >编辑</el-button>
                    <el-button @click="$router.push({name: 'levelInfo', params: {levelId: scope.row.levelId}})" type="text" >配置规则</el-button>
                    <!-- <el-button @click="onDel(scope.row.levelId)" type="text" >删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>

        <!-- 新增等级 -->
         <el-dialog
            title="新增等级"
            :visible.sync="levelVisible"
            width="420px"
            center>
            <div class="edit">
                <el-form label-width="210px">
                    <el-form-item label="会员等级名称：">
                        <el-input v-model="form.levelName" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="累计所需黄金会员直属人数：">
                        <el-input v-model="form.needGoldPeople" placeholder=""></el-input>
                    </el-form-item>
                    <el-form-item label="累计所需黄金会员团队人数：">
                        <el-input v-model="form.needGoldTeamPeople" placeholder=""></el-input>
                    </el-form-item>
                    <!-- <el-form-item label="累计所需铂金会员人数：">
                        <el-input v-model="form.needPlatinumPeopel" placeholder=""></el-input>
                    </el-form-item> -->
                    <!-- <el-form-item label="累计升级金额：">
                        <el-input v-model="form.needMoney" placeholder=""></el-input>
                    </el-form-item> -->
                    <el-form-item label="用户类型：">
                        <el-input disabled v-model.number="form.userType" placeholder=""></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="levelVisible = false">取 消</el-button>
                <el-button type="primary" @click="auditSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserLevelList, addUserLevel, delUserLevel } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            search: {
                page: 1,
                size: 20
            },
            status: [
                {value: null, label: '全部'}, {value: 2, label: '会员'}, {value: 3, label: '经理'}, {value: 4, label: '总监'}
            ],
            page: {
                total: 1
            },
            /**
             * 新增
             */
            levelVisible: false,
            form: {
                levelName: '',
                needMoney: '',
                needGoldPeople: null,
                needGoldTeamPeople: null,
                needPlatinumPeopel: null,
                level: null
            },
            deForm: {},
            auditStatus: [
                {value: 1, label: '待审核'}, {value: 2, label: '审核通过'}, {value: 3, label: '审核不通过'}
            ],
            userList: []
        }
    },
    mounted () {
        this.deForm = {...this.form}
        this.getUserLevelList()
    },
    methods: {
        async getUserLevelList () {
            let res = await getUserLevelList(this.search)
            this.userList = res.data.list
            this.page.total = res.data.count
        },
        async auditSubmit () {
            try {
                let res = await addUserLevel(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.levelVisible = false
                    this.getUserLevelList()
                }
            } catch (err) {}
        },
        add () {
            this.form = {...this.deForm}
        },
        toEdit (row) {
            console.log(row)
            this.levelVisible = true
            this.form = {...row}
        },
        async onDel (id) {
            this.$confirm('确定删除？').then(
                async () => {
                    try {
                        let res = await delUserLevel({levelId: id})
                        if (res.code === 200) {
                            this.$notify({
                                title: '成功',
                                message: res.data,
                                type: 'success'
                            })
                            this.levelVisible = false
                            this.getUserLevelList()
                        }
                    } catch (err) {}
                }
            )
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserLevelList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserLevelList()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
