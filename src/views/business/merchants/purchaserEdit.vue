<template>
    <div class="purchaserEdit">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>采购商编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <el-form :model="form" label-width="120px">
                <el-form-item label="采购商名称：">
                    <el-input v-model="form.name" style="width:300px;"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="form.manager" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话：">
                    <el-input v-model="form.managerTel" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="所属区域：">
                    <region @handleChange="getRegion" :selected="region"></region>
                </el-form-item>
                <el-form-item label="详细地址：">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <!-- <el-form-item label="运营执照：">
                    <img src="" class="icon">
                </el-form-item> -->
                <el-form-item label="审核状态：">
                    <el-select v-model="form.state">
                        <el-option  v-for="item in status" :key="item.value" :label='item.label' :value='item.value'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getMerchantsInfo, editMerchants } from '@/api/getData'
import region from '@/components/common/region'
import validator from '@/utils/validator'

export default {
    data () {
        return {
            id: null,
            form: { },
            status: [
                {value: 'normal', label: '已审核'}, {value: 'waiting', label: '未审核'}, {value: 'refused', label: '已拒绝'}
            ],
            region: []
        }
    },
    mounted () {
        this.id = parseInt(this.$route.query.id)
        this.getInfo()
    },
    methods: {
        async getInfo () {
            let res = await getMerchantsInfo({id: this.id})
            this.form = res.data
            this.$set(this.form, 'managerTel', this.form.managertel)
            this.region.push(this.form.region.slice(0, 2) + '000000', this.form.region.slice(0, 4) + '0000', this.form.region)
        },
        async submit () {
            let tel = validator.tel(this.form.managerTel)
            if (tel) {
                this.$notify({
                    title: '错误',
                    message: tel,
                    type: 'error'
                })
                return
            }
            let res = await editMerchants(this.form)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                })
                this.$router.push({path: 'purchaser'})
            }
        },
        getRegion (val) {
            this.form.region = val
        }
    },
    components: {
        region
    }
}
</script>

<style lang="less" scoped>
.purchaserEdit{
    .container{display:flex;justify-content: center;}
    .icon{width:40px;height:40px;}
}
</style>
