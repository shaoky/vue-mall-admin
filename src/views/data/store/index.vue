<template>
    <div class="store">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>数据管理</el-breadcrumb-item>
            <el-breadcrumb-item>Poi店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item>Poi店铺管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="状态：">
                <el-select v-model="search.isOpen" @change="getPoiStore">
                    <el-option v-for="item in isOpen" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getPoiStore">搜索</el-button>
                <el-button type="primary" @click="add">新增</el-button>
            </el-form-item>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="编号" prop="storeId"></el-table-column>
            <el-table-column label="店铺名称" prop="storeName"></el-table-column>
            <el-table-column label="联系人" prop="userName"></el-table-column>
            <el-table-column label="联系号码" prop="storePhone"></el-table-column>
            <el-table-column label="店铺地址" prop="storeAddress"></el-table-column>
            <el-table-column label="状态" prop="isOpen">
                <template slot-scope='scope'>
                    {{ list[scope.$index].isOpen |  getShopstatus}}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.row)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="500px" center>
            <el-form label-width="120px">
                <el-form-item label="店铺名称：">
                    <el-input v-model="form.storeName" style="max-width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="店铺地址：">
                    <el-input v-model="form.storeAddress" style="max-width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="form.userName" style="max-width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="联系号码：">
                    <el-input v-model="form.storePhone" style="max-width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="图片：">
                    <el-upload  class="avatar-uploader" :action="imgBaseUrl" :show-file-list="false" :on-success="handleAvatarSuccess">
                        <img v-if="form.imageUrl" :src="form.imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="店铺状态：">
                    <el-select v-model="form.isOpen">
                        <el-option v-for="item in isOpen" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="店铺坐标：">
                    <el-input ></el-input>
                </el-form-item> -->
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="onSubmit">保存</el-button>
                <!-- <el-button @click="del" v-if="!isAdd">删除</el-button> -->
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getPoiStore, addPoiStore, updatePoiStore, deletePoiStore } from '@/api/getData'
import { imgBaseUrl } from '@/config/env'
import pagination from '@/components/pagination'

export default {
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            isOpen: [
                {label: '公开', value: 1}, {label: '未公开', value: 0}
            ],
            shopfrom: [
                {label: '平台采集', value: 1}, {label: '商家提供', value: 2}
            ],
            list: [],
            search: {
                page: 0,
                size: 20
            }, // 查询参数
            form: {// 新增编辑参数

            },
            dialogVisible: false,
            isAdd: true,
            page: {
                total: 20
            }
        }
    },
    filters: {
        getShopstatus (value) {
            let text = ''
            if (value === 0) {
                text = '未公开'
            } else if (value === 1) {
                text = '公开'
            }
            return text
        }
    },
    mounted () {
        this.getPoiStore()
    },
    methods: {
        async getPoiStore () {
            let res = await getPoiStore(this.search)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getPoiStore()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getPoiStore()
        },
        add () {
            this.isAdd = true
            this.dialogVisible = true
            this.form = {}
            // this.form.region = '00000000'
            // this.form.latitude = '123'
            // this.form.longitude = '456'
        },
        edit (row) {
            this.isAdd = false
            this.form = row
            this.dialogVisible = true
        },
        del (row) {
            this.$confirm('确定删除此店铺？').then(
                async () => {
                    let res = await deletePoiStore({storeId: row.storeId})
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.getPoiStore()
                    }
                }
            )
        },
        async onSubmit () {
            if (this.isAdd) {
                let res = await addPoiStore(this.form)
                if (res.code === 200) {
                    this.dialogVisible = false
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.getPoiStore()
                }
            } else {
                let res = await updatePoiStore(this.form)
                if (res.code === 200) {
                    this.dialogVisible = false
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.getPoiStore()
                }
            }
        },
        handleAvatarSuccess (res, file) {
            this.$set(this.form, 'imageUrl', res.data.url)
        }
    },
    components: {
        pagination
    }
}
</script>

<style scoped lang="less">
</style>
