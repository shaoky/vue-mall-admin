<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-form-item label="用户名:">
                <el-input v-model="search.userName" placeholder="用户名称/用户编号/手机号" style="width: 200px;"></el-input>
            </el-form-item>
            <el-form-item label="审核状态：">
                <el-select v-model="search.userType" @change="getUserMemberList">
                    <el-option v-for="item in status" :key="item.value" :label='item.label' :value='item.value'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getUserMemberList">查询</el-button>
            </el-form-item>
        </el-form>

        <el-table border :data="userList">
            <el-table-column prop="userNo" label="用户编号" width="100"></el-table-column>
            <el-table-column prop="userName" label="用户名称"></el-table-column>
            <el-table-column label="用户等级">
                <template slot-scope="scope">
                    {{scope.row.userType | getUserTypeName}}
                </template>
            </el-table-column>
            <el-table-column prop="userPhone" label="用户手机"></el-table-column>
            <el-table-column prop="weixinAccount" label="微信号"></el-table-column>
            <el-table-column prop="superiorName" label="上级名称"></el-table-column>
            <el-table-column prop="superiorNo" label="上级编号"></el-table-column>
            <el-table-column prop="userExpenseAmount" label="总消费金额"></el-table-column>、
            <el-table-column prop="userCashBackAmount" label="总返现金额"></el-table-column>
            <el-table-column prop="auditStatusName" label="审核状态"></el-table-column>
            <el-table-column label="申请时间">
                <template slot-scope="scope" v-if="scope.row.orderList[0]">
                    {{scope.row.applyTime | getTime}}
                    <!-- <p v-for="item in scope.row.orderList" :key="item">
                        <span v-if="item.orderStatus === 7"></span>
                    </p>
                    {{scope.row.orderList[0].paymentTime | getTime}} -->
                </template>
            </el-table-column>
            <el-table-column label="审核时间">
                <template slot-scope="scope">
                    {{scope.row.auditTime | getTime}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="120">
                <template slot-scope="scope">
                    <el-button @click="$router.push({name: 'memberInfo', params: {userId: scope.row.userId}})" type="text" >查看</el-button>
                    <el-button @click="toEdit(scope.row)" type="text" >审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>

        <!-- 审核 -->
         <el-dialog
            title="会员审核"
            :visible.sync="auditVisible"
            width="600px"
            center>
            <div class="edit">
                <el-form label-width="120px">
                    <el-form-item label="审核状态：">
                        <el-select v-model="edit.auditStatus">
                            <el-option v-for="item in auditStatus" :key="item.value" :label='item.label' :value='item.value'></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <el-table border :data="edit.orderList">
                    <el-table-column prop="orderNo" label="关联订单号" width="200"></el-table-column>
                    <el-table-column label="关联订单状态">
                        <template slot-scope="scope">
                            {{scope.row.orderStatus | orderStatusName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="支付时间">
                        <template slot-scope="scope">
                            {{scope.row.paymentTime | getTime}}
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="auditVisible = false">取 消</el-button>
                <el-button type="primary" @click="auditSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserMemberList, setUserMemberAudit } from '@/api/getData'
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
             * 审核
             */
            form: {},
            auditStatus: [
                {value: 1, label: '待审核'}, {value: 2, label: '审核通过'}, {value: 3, label: '审核不通过'}
            ],
            edit: {
                order: {}
            },
            auditVisible: false,
            userList: []
        }
    },
    mounted () {
        this.getUserMemberList()
    },
    methods: {
        async getUserMemberList () {
            let res = await getUserMemberList(this.search)
            this.userList = res.data.list
            this.page.total = res.data.count
            for (let item of this.userList) {
                for (let item1 of item.orderList) {
                    if (item1.paymentTime) {
                        item.applyTime = item1.paymentTime
                        break
                    }
                }
            }
            this.page.total = res.data.count
        },
        async auditSubmit () {
            try {
                let res = await setUserMemberAudit({userId: this.edit.userId, auditStatus: this.edit.auditStatus})
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.auditVisible = false
                    this.getUserMemberList()
                }
            } catch (err) {}
        },
        toEdit (row) {
            console.log(row)
            this.auditVisible = true
            this.edit = row
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserMemberList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserMemberList()
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
