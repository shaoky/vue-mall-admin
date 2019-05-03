<template>
    <div class="coupon-template">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="优惠券范围：">
                <el-select v-model="search.couRangeKey">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="(item,index) in range" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>

            </el-form-item>
            <el-form-item label="优惠券状态：">
                <el-select v-model="search.couState">
                    <el-option label="全部" :value="0"></el-option>
                    <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getActiveList">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit(-1)">新建优惠券</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column label="活动标题" prop="caName"></el-table-column>
            <el-table-column label="优惠券类型" prop="caCouCount">
                <!-- <template slot-scope="scope">{{ scope.row.caCou | getCouponNum }}</template> -->
            </el-table-column>
            <el-table-column label="发放渠道">
                <template slot-scope="scope">{{ scope.row.caOut | getType }}</template>
            </el-table-column>
            <el-table-column label="活动时间">
                <template slot-scope="scope">{{scope.row.caStartTime | getTime}} - {{scope.row.caStopTime | getTime}}</template>
            </el-table-column>
            <el-table-column label="总数量" prop="caNumber"></el-table-column>
            <el-table-column label="库存数量" prop="caStock"></el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{scope.row.caStatus | getState}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="updateActiveState(scope.row.caId,2)" v-if="scope.row.caStatus===1">不启用</el-button>
                    <el-button type="text" @click="updateActiveState(scope.row.caId,1)" v-if="scope.row.caStatus===2">启用</el-button>
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.caId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count" v-if="count>0"></pagination>

        <el-dialog title="优惠券" :visible.sync="visible" width="50%" center>
            <el-form label-width="120px">
                <el-form-item label="活动标题：">
                    <el-input v-model="form.caName"></el-input>
                    <el-button type="text" v-if="!isAdd" @click="showExchangeList(form.caId)">兑换码列表</el-button>
                </el-form-item>
                <el-form-item label="活动介绍：">
                    <el-input type="textarea" style="width:200px;" v-model="form.caDesc"></el-input>
                </el-form-item>
                <el-form-item label="优惠券集合：">
                    <el-select v-model="form.caCou" multiple style="min-width:240px;">
                        <el-option v-for="(item,index) in templateList" :key="index" :label="item.couName" :value="item.couId"></el-option>
                    </el-select>
                    <!-- <el-select v-model="form.caCou" multiple v-if="!isAdd">
                        <el-option v-for="(item,index) in templateList" :key="index" :label="item.couName" :value="item.couId"></el-option>
                    </el-select> -->
                </el-form-item>
                <el-form-item label="总数量：">
                    <el-input v-model.number="form.caNumber"></el-input>
                    <span v-if="!isAdd">库存：{{form.caStock}},已经领取：{{form.userQueryNum}}</span>
                    <div>注：增加总数量，库存里会相应增加兑换码，减少总数量，库存里会相应减少兑换码的数量</div>
                </el-form-item>
                <el-form-item label="发放渠道：">
                    <el-select v-model="form.caOut">
                        <el-option v-for="(item,index) in caOut" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务标识码：">
                    <el-input v-model="form.idCode"></el-input>
                </el-form-item>
                <el-form-item label="活动时间：">
                    <date-picker @timePick="getTime" :time="time" ></date-picker>
                </el-form-item>
                <!-- <el-form-item label="用户获取次数：">
                    <el-input v-model.number="form.userQueryNum"></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="visible = false">取 消</el-button>
                <el-button type="primary" @click="submit">提 交</el-button>
            </span>
        </el-dialog>

        <el-dialog title="兑换码" :visible.sync="exchangeVisible" width="50%" center>
            <el-form :inline="true">
                <el-form-item label="兑换码：">
                    <el-input v-model="exchange.redeemCode"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getExchangeList">搜索</el-button>
                </el-form-item>
            </el-form>
            <el-table :data="exchangeList">
                <el-table-column label="兑换码" prop="redeemCode"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">{{scope.row.carStatus | getExchangeState}}</template>
                </el-table-column>
                <el-table-column label="领取人" prop="userName"></el-table-column>
                <el-table-column label="领取时间">
                    <template slot-scope="scope">{{scope.row.updateTime | getTime}}</template>
                </el-table-column>
            </el-table>

            <pagination @handleCurrentChange='exchange_handleCurrentChange' @handleSizeChange="exchange_handleSizeChange"  :total="exchangeCount" v-if="exchangeCount>0"></pagination>
            <span slot="footer" class="dialog-footer">
                <el-button @click="exchangeVisible = false">取 消</el-button>
                <el-button type="primary" @click="exchangeVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import pagination from '@/components/pagination'
import datePicker from '@/components/date-picker'
import { getTemplateList, getActiveList, addActive, editActive, updateActiveState, delActive, getExchangeList } from '@/api/getData'

export default {
    data () {
        return {
            search: {
                page: 0, size: 20, couState: 0, couRangeKey: 0
            },
            template: {page: 0, size: 1000},
            templateList: [],
            exchange: {page: 0, size: 20},
            exchangeList: [],
            form: {},
            range: [{label: '全场', value: 1}, {label: '分类', value: 2}, {label: '品牌', value: 3}, {label: '单品', value: 4}],
            status: [{label: '启用', value: 1}, {label: '未启用', value: 2}],
            types: [{label: '满减券', value: 1}],
            caOut: [{label: 'app', value: 1}, {label: 'h5', value: 2}],
            list: [],
            time: [],
            exchangeCount: null,
            count: null,
            visible: false,
            exchangeVisible: false,
            isAdd: true
        }
    },
    filters: {
        getCouponNum (value) {
            return value.split(',').length
        },
        getType (value) {
            let text = ''
            if (value === 1) {
                text = 'app'
            } else if (value === 2) {
                text = 'h5'
            }
            return text
        },
        getState (value) {
            let text = ''
            if (value === 1) {
                text = '启用'
            } else if (value === 2) {
                text = '未启用'
            }
            return text
        },
        getExchangeState (value) {
            let text = ''
            if (value === 1) {
                text = '未领取'
            } else {
                text = '已领取'
            }
            return text
        }
    },
    mounted () {
        this.getActiveList()
        this.getTemplateList()
    },
    methods: {
        // 获取所有模版列表
        async getTemplateList () {
            let res = await getTemplateList(this.search)
            console.log(res)
            this.templateList = res.data.list
        },
        // 获取活动列表
        async getActiveList () {
            let res = await getActiveList(this.search)
            console.log(res)
            this.list = res.data.list
            this.count = res.data.count
        },
        edit (n) {
            this.visible = true
            this.form = {caCou: []}
            this.time = []
            if (n === -1) {
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = {...n}
                this.time.push(this.form.caStartTime * 1000, this.form.caStopTime * 1000)
                this.form.caCou = this.form.caCou.split(',').map((val) => { return parseInt(val) })
                delete this.form.caCouCount
            }
        },
        async submit () {
            let form = this.form
            form.caCou = this.form.caCou.join(',')
            if (this.isAdd) {
                await addActive(form)
            } else {
                if (this.form.caNumber < this.form.caQuery) {
                    this.$notify({
                        title: '提示',
                        message: '数量必须大于以发放数量',
                        type: 'error'
                    })
                    return
                }
                // delete this.form.caQuery
                await editActive(this.form)
            }

            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
            this.getActiveList()
        },
        // 删除
        async del (id) {
            this.$confirm('确定删除此商品？').then(
                async () => {
                    await delActive({caId: id})
                    this.$notify({
                        title: '成功',
                        message: '删除成功',
                        type: 'success'
                    })
                    this.getActiveList()
                })
        },
        // 修改状态
        async updateActiveState (id, state) {
            await updateActiveState({caId: id, caStatus: state})
            this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success'
            })
            this.getActiveList()
        },
        getTime (val) {
            this.form.caStartTime = val[0]
            this.form.caStopTime = val[1]
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getActiveList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getActiveList()
        },
        // 获取兑换码列表
        async getExchangeList () {
            let res = await getExchangeList(this.exchange)
            console.log(res)
            this.exchangeList = res.data.list
            this.exchangeCount = res.data.count
        },
        exchange_handleCurrentChange (val) {
            this.exchange.page = val
            this.getExchangeList()
        },
        exchange_handleSizeChange (val) {
            this.exchange.size = val
            this.getExchangeList()
        },
        showExchangeList (id) {
            this.exchange.redeemCode = ''
            this.exchangeVisible = true
            this.exchange.caId = id
            this.getExchangeList()
        }
    },
    components: {
        pagination,
        datePicker
    }
}
</script>

<style scoped lang="less">
.coupon-template{
    .el-input{width:200px;}
}
</style>
