<template>
    <div class="supplierEdit mt20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>供应商编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <el-form :model="form" label-width="120px">
                <el-form-item label="供应商名称：">
                    <el-input v-model="form.name" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="form.manager" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="form.managerTel" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="所在区域：">
                    <region @handleChange="getRegion" :selected="region"></region>
                </el-form-item>
                <el-form-item label="详细地址">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="审核状态：">
                    <el-select v-model="form.state">
                        <el-option  v-for="(item,index) in status"  :key="index"  :label='item.label'  :value='item.value'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-checkbox @change="notice">短信通知</el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="editSuppliers">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { editSuppliers, getMerchantsInfo } from '@/api/getData'
import region from '@/components/common/region'
import validator from '@/utils/validator'

export default {
    data () {
        return {
            form: {

            },
            status: [
                {value: 'normal', label: '已审核'}, {value: 'waiting', label: '未审核'}, {value: 'refused', label: '已拒绝'}
            ],
            region: [],
            id: null
        }
    },
    mounted () {
        this.id = parseInt(this.$route.query.id)
        this.getMerchantsInfo()
        // this.form = this.$route.query
        // this.$set(this.form, 'managerTel', this.form.managertel)
        // this.form.id = parseInt(this.form.id)
        // this.form.issupplier = parseInt(this.form.issupplier)
        // this.form.notification = parseInt(this.form.notification)
        // this.form.ismerchant = parseInt(this.form.ismerchant)
        // this.form.isdistribution = parseInt(this.form.isdistribution)
        // this.region.push(this.form.region.slice(0, 2) + '000000', this.form.region.slice(0, 4) + '0000', this.form.region)
    },
    methods: {
        // 获取供应商详情
        async getMerchantsInfo () {
            let res = await getMerchantsInfo({id: this.id})
            console.log(res)
            this.form = res.data
            this.$set(this.form, 'managerTel', this.form.managertel)
            this.region.push(this.form.region.slice(0, 2) + '000000', this.form.region.slice(0, 4) + '0000', this.form.region)
        },
        // 编辑信息
        async editSuppliers () {
            let nowTime = new Date()
            if (this.form.state === 'waiting') {
                this.form.auditime = 1
            } else {
                this.form.auditime = parseInt(nowTime.getTime() / 1000)
            }
            let tel = validator.tel(this.form.managerTel)
            if (tel) {
                this.$notify({
                    title: '错误',
                    message: tel,
                    type: 'error'
                })
                return
            }
            let res = await editSuppliers(this.form)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.message,
                    type: 'success'
                })
                this.$router.push({path: 'supplier'})
            }
        },
        getRegion (val) {
            this.form.region = val
        },
        notice (val) {
            if (val) {
                this.form.notification = 2
            } else {
                this.form.notification = 1
            }
        }
    },
    components: {
        region
    }
}
</script>

<style lang="less" scoped>
.supplierEdit{
    .container{display:flex;justify-content: center;}
    .icon{width:40px;height:40px;}
}
</style>
