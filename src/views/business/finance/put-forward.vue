<template>
    <div class="put-forward">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>提现管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" >
            <el-form-item label="时间：">
                <date-picker @timePick="getTime"></date-picker>
            </el-form-item>
            <el-form-item label="状态：">
                <el-select v-model="search.status" @change="getPutForWard">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="getPutForWard">查询</el-button>
            </el-form-item> -->
            <el-form-item>
                <el-button type="primary" @click="getExcelWithdrawal">下载excel</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column label="会员名称" prop="userName"></el-table-column>
            <el-table-column label="会员编号" prop="userNo"></el-table-column>
            <el-table-column label="提现金额" prop="withdrawalPrice"></el-table-column>
            <el-table-column label="提现方式">
                <template slot-scope="scope">{{scope.row.withdrawalTypeName}}</template>
            </el-table-column>
            <el-table-column label="申请提现时间">
                <template slot-scope="scope">{{ scope.row.createTime | getTime }}</template>
            </el-table-column>
            <el-table-column label="操作时间">
                <template slot-scope="scope">{{ scope.row.updateTime | getTime }}</template>
            </el-table-column>
            <el-table-column label="状态" prop="statusName">
                <!-- <template slot-scope="scope">{{ scope.row.status | getState}}</template> -->
            </el-table-column>
            <el-table-column label="操作">
                <el-button slot-scope="scope" type="text" @click="getPutForWardInfo(scope.row.withdrawalId)">查看</el-button>
            </el-table-column>
        </el-table>
         <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count" v-if="count>0"></pagination>
        <el-dialog title="提示" :visible.sync="visible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="会员名称：">{{form.userName}}</el-form-item>
                <el-form-item label="会员编号：">{{form.userNo}}</el-form-item>
                <el-form-item label="提现方式：">{{form.withdrawalTypeName}}</el-form-item>
                <el-form-item label="提现银行：" v-if="form.withdrawalType == 3">{{form.withdrawalBank}}</el-form-item>
                <el-form-item label="提现账号：">{{form.withdrawalAccount}}</el-form-item>
                <el-form-item label="银行卡名字：" v-if="form.withdrawalType == 3">{{form.withdrawalName}}</el-form-item>
                <el-form-item label="提现金额：">{{form.withdrawalPrice}}</el-form-item>
                <el-form-item label="申请提现时间：">{{form.createTime | getTime}}</el-form-item>
                <el-form-item label="凭证：">
                    <el-upload  class="avatar-uploader" :action="imgBaseUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="form.status">
                        <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import datePicker from '@/components/date-picker'
import { getPutForWard, getPutForWardInfo, editPutForWard, getExcelWithdrawal } from '@/api/getData'
import { imgBaseUrl, baseUrl } from '@/config/env'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            search: {
                page: 0,
                size: 20,
                status: 0 // 全部，默认
            },
            status: [{label: '处理中', value: 1}, {label: '已完成', value: 2}, {label: '已拒绝', value: 3}],
            list: [],
            form: {},
            count: null,
            visible: false,
            imgBaseUrl: imgBaseUrl
        }
    },
    filters: {
        getType (value) {
            let text = ''
            if (value === 1) {
                text = '支付宝'
            } else {
                text = '微信'
            }
            return text
        },
        getState (value) {
            let text = ''
            if (value === 1) {
                text = '处理中'
            } else if (value === 2) {
                text = '已完成'
            } else if (value === 3) {
                text = '已拒绝'
            }
            return text
        }
    },
    mounted () {
        this.getPutForWard()
    },
    methods: {
        // 获取提现列表
        async getPutForWard () {
            let res = await getPutForWard(this.search)
            this.list = res.data.list
            this.count = res.data.count
            console.log(res)
        },
        // 查看详情
        async getPutForWardInfo (id) {
            this.visible = true
            let res = await getPutForWardInfo({withdrawalId: id})
            console.log(res)
            this.form = res.data.info
        },
        async submit () {
            let params = {}
            params.withdrawalId = this.form.withdrawalId
            params.status = this.form.status
            params.imageUrl = this.form.imageUrl
            await editPutForWard(params)
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
            this.getPutForWard()
        },
        // excel
        async getExcelWithdrawal () {
            let res = await getExcelWithdrawal(this.search)
            if (res.code === 200) {
                location.href = baseUrl + res.data
            }
        },
        getTime (val) {
            this.search.begintime = val[0]
            this.search.endtime = val[1]
            this.getPutForWard()
        },
        handleAvatarSuccess (res, file) {
            this.$set(this.form, 'imageUrl', res.data.url)
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getPutForWard()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getPutForWard()
        }
    },
    components: {
        datePicker,
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
