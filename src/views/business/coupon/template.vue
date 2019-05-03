<template>
    <div class="coupon-template">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>优惠券管理</el-breadcrumb-item>
            <el-breadcrumb-item>模版管理</el-breadcrumb-item>
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
                <el-button type="primary" @click="getTemplateList">搜索</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="edit(-1)">新建优惠券</el-button>
            </el-form-item>
        </el-form>
        <el-table :data="list">
            <el-table-column label="活动标题" prop="couName"></el-table-column>
            <el-table-column label="优惠券类型">
                <template slot-scope="scope">{{ scope.row.couType | getType }}</template>
            </el-table-column>
            <el-table-column label="优惠券范围">
                <template slot-scope="scope">{{ scope.row.couRangeKey | getRange }}</template>
            </el-table-column>
            <el-table-column label="时效" prop="couPres"></el-table-column>
            <el-table-column label="金额" prop="couMoney"></el-table-column>
            <el-table-column label="规则" >
                <template slot-scope="scope">满{{scope.row.couRuleValue}}减{{scope.row.couMoney}}</template>
            </el-table-column>
            <el-table-column label="状态">
                <template slot-scope="scope">{{ scope.row.couState | getState }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="handleState(scope.row.couId,2)" v-if="scope.row.couState===1">不启用</el-button>
                    <el-button type="text" @click="handleState(scope.row.couId,1)" v-if="scope.row.couState===2">启用</el-button>
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.couId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="count" v-if="count>0"></pagination>

        <el-dialog title="优惠券" :visible.sync="visible" width="50%" center>
            <el-form label-width="120px">
                <el-form-item label="优惠券名称：">
                    <el-input v-model="form.couName"></el-input>
                </el-form-item>
                <el-form-item label="优惠券类型：">
                    <el-select v-model="form.couType">
                        <el-option v-for="(item,index) in types" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券范围：">
                    <el-select v-model="form.couRangeKey" @change="handleRange">
                        <el-option v-for="(item,index) in range" :key="index" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-if="form.couRangeKey !== 1 && form.couRangeKey" v-model="form.couRangValue" filterable>
                        <el-option v-for="(item,index) in templateGood" :key="index" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券时效：">
                    <el-radio-group v-model="form.couAging">
                        <el-radio :label="1">固定时间</el-radio>
                        <el-radio :label="2">领券后时效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="">
                    <date-picker @timePick="getTime" :time="time" v-if="form.couAging===1"></date-picker>
                    <el-input placeholder="请输入时效天数" v-model.number="form.couPrescription" v-if="form.couAging===2"></el-input>
                </el-form-item>
                <el-form-item label="优惠券金额：">
                    <el-input v-model.number="form.couMoney"></el-input>
                </el-form-item>
                <el-form-item label="优惠券规格：">
                    满 <el-input style="width:80px;" v-model="form.couRuleValue"></el-input> 元(0元代表无限制)
                </el-form-item>
                <el-form-item label="优惠券备注：">
                    <el-input type="textarea" style="width:200px;" v-model="form.couDesc"></el-input>
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
import pagination from '@/components/pagination'
import datePicker from '@/components/date-picker'
import { getTemplateList, addTemplateList, editTemplateList, updateTemplateState, delTemplate, getTemplateGood } from '@/api/getData'

export default {
    data () {
        return {
            search: {
                page: 0, size: 20, couState: 0, couRangeKey: 0
            },
            form: {couAging: 1},
            range: [{label: '全场', value: 1}, {label: '分类', value: 2}, {label: '品牌', value: 4}, {label: '单品', value: 3}],
            status: [{label: '启用', value: 1}, {label: '未启用', value: 2}],
            types: [{label: '满减券', value: 1}],
            time: [],
            list: [],
            templateGood: [],
            count: null,
            visible: false,
            isAdd: true
        }
    },
    filters: {
        getType (value) {
            let text = ''
            if (value === 1) {
                text = '满减'
            }
            return text
        },
        getRange (value) {
            let text = ''
            if (value === 1) {
                text = '全场'
            } else if (value === 2) {
                text = '分类'
            } else if (value === 3) {
                text = '单品'
            } else if (value === 4) {
                text = '品牌'
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
        }
    },
    mounted () {
        this.getTemplateList()
    },
    methods: {
        // 获取列表
        async getTemplateList () {
            let res = await getTemplateList(this.search)
            console.log(res)
            this.list = res.data.list
            this.count = res.data.count
        },
        edit (n) {
            console.log(n)
            this.visible = true
            this.time = []
            this.form = {couAging: 1}
            if (n === -1) {
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = {...n}
                this.time.push(this.form.couStartTime * 1000, this.form.couStopTime * 1000)
                if (this.form.couRangValue === 0) {
                    this.form.couRangValue = ''
                }
                if (this.form.couRangeKey !== 1) {
                    this.getTemplateGood(this.form.couRangeKey)
                }
            }
        },
        async submit () {
            if (this.form.couAging === 1) {
                delete this.form.couPrescription
            }
            if (this.form.couAging === 2) {
                delete this.form.couStartTime
                delete this.form.couStopTime
            }
            if (this.isAdd) {
                await addTemplateList(this.form)
            } else {
                await editTemplateList(this.form)
            }
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.visible = false
            this.getTemplateList()
        },
        // 修改状态
        async handleState (id, state) {
            await updateTemplateState({couId: id, couState: state})
            this.$notify({
                title: '成功',
                message: '操作成功',
                type: 'success'
            })
            this.getTemplateList()
        },
        // 删除
        async del (id) {
            await delTemplate({couId: id})
            this.$notify({
                title: '成功',
                message: '删除成功',
                type: 'success'
            })
            this.getTemplateList()
        },
        // 获取商品
        async getTemplateGood (type) {
            if (type !== 1) {
                let res = await getTemplateGood({type: type})
                console.log(res)
                this.templateGood = res.data.list
            }
        },
        // 优惠券范围改变事件
        handleRange (val) {
            this.form.couRangValue = ''
            this.getTemplateGood(val)
        },
        getTime (val) {
            this.form.couStartTime = val[0]
            this.form.couStopTime = val[1]
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getTemplateList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getTemplateList()
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
