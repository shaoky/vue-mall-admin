<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>APP管理</el-breadcrumb-item>
            <el-breadcrumb-item>版本管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true" :model="search" class="demo-form-inline">
            <el-form-item>
                <el-button type="primary" @click="onAdd">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="report">
            <el-table-column label="版本号" prop="versionNo"></el-table-column>
            <el-table-column label="软件名称" prop="versionName"></el-table-column>
            <el-table-column label="关联系统" width="200px;">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" v-if="scope.row.isAndroid == 1">android</el-button>
                    <el-button type="primary" size="mini" v-if="scope.row.isIos == 1">ios</el-button>
                </template>
            </el-table-column>
            <el-table-column label="Android路径" prop="androidUrl"></el-table-column>
            <el-table-column label="创建时间">
                <template slot-scope="scope">{{ report[scope.$index].createTime | getTime }}</template>
            </el-table-column>
            <el-table-column label="修改时间">
                <template slot-scope="scope">{{ report[scope.$index].updateTime | getTime }}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="text" @click="onEdit(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>
        <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <!-- 弹出框-创建 -->
        <el-dialog title="创建" :visible.sync="dialogVisible" width="30%" class="editPassword">
            <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="版本号：">
                    <el-input v-model="form.versionNo" style="max-width:200px"></el-input>
                </el-form-item>
                <el-form-item label="软件名称：">
                    <el-select v-model="form.softwareId">
                        <el-option v-for="(item,index) in software" :key="index" :label="item.appName" :value="item.softwareId"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="版本名称：">
                    <el-input v-model="form.versionName" style="max-width:200px"></el-input>
                </el-form-item>
                <el-form-item label="安卓文件：">
                    <el-input v-model="form.androidUrl" style="max-width:350px"></el-input>
                </el-form-item>
                <el-form-item label="安卓文件包大小：">
                    <el-input v-model="form.packageSize" style="max-width:200px"></el-input>
                </el-form-item>
                <el-form-item label="更新系统：">
                    <el-checkbox-group v-model="checkList" @change="handleChecked">
                        <el-checkbox label="android" ></el-checkbox>
                        <el-checkbox label="ios" ></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="版本描述：">
                    <el-input type="textarea" v-model="form.versionContent" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="onSubmit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getAppversions, addAppversions, editAppversions, getAppSoftware } from '@/api/getData'
import pagination from '@/components/pagination'
export default {
    data () {
        return {
            dialogVisible: false,
            isAdd: true,
            checkList: [],
            software: [],
            search: {
                page: 0,
                size: 20
            },
            page: {
                total: 20
            },
            // 表格
            report: [],
            // 添加/修改
            form: {}
        }
    },
    mounted () {
        this.getAppversions()
        this.getAppSoftware()
    },
    methods: {
        // 获取列表
        async getAppversions () {
            let res = await getAppversions(this.search)
            this.report = res.data.list
            this.page.total = res.data.count
            console.log(res)
        },
        // 获取软件列表
        async getAppSoftware () {
            let res = await getAppSoftware()
            this.software = res.data.list
        },
        onAdd () {
            this.isAdd = true
            this.form = {}
            this.checkList = []
            this.dialogVisible = true
        },
        onEdit (row) {
            console.log(row)
            this.checkList = []
            if (row.isAndroid === 1) {
                this.checkList.push('android')
                console.log(this.checkList)
            }
            if (row.isIos === 1) {
                this.checkList.push('ios')
            }
            this.isAdd = false
            this.form = JSON.parse(JSON.stringify(row))
            this.dialogVisible = true
        },
        async onSubmit () {
            if (this.isAdd) {
                console.log(this.form)
                if (!this.form.versionNo) {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写版本号'
                    })
                    return
                }
                if (!this.form.softwareId) {
                    this.$notify.error({
                        title: '错误',
                        message: '请选择软件名称'
                    })
                    return
                }
                if (!this.form.versionName) {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写版本名称'
                    })
                    return
                }
                if (!this.form.androidUrl) {
                    this.$notify.error({
                        title: '错误',
                        message: '请填写安卓文件'
                    })
                    return
                }

                let res = await addAppversions(this.form)
                if (res.code === 200) {
                    this.dialogVisible = false
                    this.$notify.success({
                        title: '成功',
                        message: '添加成功'
                    })
                    this.getAppversions()
                }
            } else {
                let res = await editAppversions(this.form)
                if (res.code === 200) {
                    this.dialogVisible = false
                    this.$notify.success({
                        title: '成功',
                        message: '编辑成功'
                    })
                    this.getAppversions()
                }
            }
            this.dialogVisible = false
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getAppversions()
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getAppversions()
        },
        handleChecked (val) {
            if (val.includes('android')) {
                this.form.isAndroid = 1
            } else {
                this.form.isAndroid = 0
            }
            if (val.includes('ios')) {
                this.form.isIos = 1
            } else {
                this.form.isIos = 0
            }
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
