<template>
    <div class="distributorsEdit mt20">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>分销商编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="container">
            <el-form label-width="120px">
                <el-form-item label="分销商名称：" >
                    <el-input style="width:200px;" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分销商账号：" >
                    <el-input style="width:200px;" v-model="form.username"></el-input>
                </el-form-item>
                <el-form-item label="联系人：" >
                    <el-input style="width:200px;" v-model="form.manager"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" >
                    <el-input style="width:200px;" v-model="form.managerTel" maxlength="11"></el-input>
                </el-form-item>
                <el-form-item label="所在区域：" >
                    <region @handleChange="getRegion" :selected="region"></region>
                </el-form-item>
                <el-form-item label="详细地址：" >
                    <el-input type='textarea' style="width:300px;" v-model="form.address"></el-input>
                </el-form-item>
                <el-form-item label="供应商：" >
                    <template slot-scope="scope" >
                        {{suppliername}}
                    </template>
                </el-form-item>
                <el-form-item label="状态：">
                    <el-select v-model="form.state">
                        <el-option v-for='(item,index) in status' :key='index' :label='item.label' :value='item.value'></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type='primary' @click="editDistributorsInfo">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
import { getDistributorsInfo, editDistributorsInfo } from '@/api/getData'
import region from '@/components/common/region'
export default {
    data () {
        return {
            id: null,
            form: {},
            region: [],
            status: [
                {label: '待审核', value: 'waiting'}, {label: '锁定', value: 'locked'}, {label: '拒绝', value: 'refused'}, {label: '正常', value: 'normal'}
            ],
            supplier: [],
            options: [
                {name: '1'}, {name: '2'}
            ],
            suppliername: ''
        }
    },
    mounted () {
        this.id = parseInt(this.$route.query.id)
        this.getDistributorsInfo()
    },
    methods: {
        async getDistributorsInfo () {
            let res = await getDistributorsInfo({id: this.id})
            this.form = res.data.datas
            res.data.supplierobj.forEach(
                (item, index) => { this.supplier.push(item.name) }
            )
            this.suppliername = this.supplier.join(',')
            this.region.push(this.form.region.slice(0, 2) + '000000', this.form.region.slice(0, 4) + '0000', this.form.region)
        },
        // 编辑信息
        async editDistributorsInfo () {
            let res = await editDistributorsInfo(this.form)
            console.log(res)
            if (res.code == 200) {
                this.$notify({
                    title: '成功',
                    message: '修改成功',
                    type: 'success'
                })
                this.$router.push({path: 'distributors'})
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

<style scoped lang="less">
.distributorsEdit{
    .container{display:flex;justify-content: center;}
}
</style>
