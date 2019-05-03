<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item>店铺详情</el-breadcrumb-item>
        </el-breadcrumb>
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
             <el-tab-pane label="商家信息" name="1">
                <el-form  label-width="120px">
                    <el-form-item label="店铺名称：">
                        <el-input style="width:300px;" v-model="form.shopName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人：">
                        <el-input style="width:300px;" v-model="form.shopKeeper"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话：">
                        <el-input style="width:300px;" v-model="form.shopPhone"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺地址：">
                        <el-input style="width:300px;" v-model="form.shopAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="店铺坐标：">
                        <el-input style="width:300px;" v-model="form.shopLocation"></el-input>
                        <a target="view_window" href="https://lbs.amap.com/console/show/picker">查看位置坐标</a>
                    </el-form-item>
                    <el-form-item label="店铺图片：">
                        <el-upload
                            class="avatar-uploader"
                            :action="imgBaseUrl"
                            :show-file-list="false"
                            :on-success="handleShopImageSuccess">
                            <img v-if="form.shopImage" :src="form.shopImage" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="营业执照：">
                <el-upload
                    class="avatar-uploader"
                    :action="imgBaseUrl"
                    :show-file-list="false"
                    :on-success="handleLicenseSuccess">
                    <img v-if="form.businessLicense" :src="form.businessLicense" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证正面：">
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleFrontSuccess">
                        <img v-if="form.idCardFront" :src="form.idCardFront" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="法人身份证反面：">
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleReverseSuccess">
                        <img v-if="form.idCardReverse" :src="form.idCardReverse" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                </el-form>
                 <!-- <span slot="footer" class="dialog-footer btn">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">提 交</el-button>
                </span> -->
                <el-button type="primary" class="el-button-center fs20" @click="submit">修 改</el-button>
                <el-dialog title="用户选择" :visible.sync="dialogUsers" width="40%" overflow="scroll">
                    <onlyuser @usersids="userids" :isSeckillGoods="1" @hide="hideUsers"></onlyuser>
                </el-dialog>
             </el-tab-pane>
             <el-tab-pane label="商家相册" name="2">
                <div class="shop-image">
                    <div class="main-image mt20">
                        <div class="content">
                            <el-upload
                                :action="imgBaseUrl"
                                :file-list="fileList1"
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                :onSuccess="uploadSuccess"
                                :on-remove="handleRemove">
                                <i class="el-icon-plus"></i>
                            </el-upload>
                        </div>
                    </div>
                    <el-dialog :visible.sync="dialogVisible">
                        <img width="100%"  :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <!-- <el-button type="primary" class="el-button-center fs20" @click="addShopImage">提交</el-button> -->
                </div>
             </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getShopInfo, getShopAdd, getShopUpdate, shopImageList, addShopImage, delShopsImage } from '@/api/getData'
import pagination from '@/components/pagination'
import userMenu from '@/components/onlyuser'
import { imgBaseUrl } from '@/config/env'
export default {
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            shopId: null,
            shopList: [],
            isAdd: false,
            form: [],
            activeName: '1',
            fileList1: [],
            shopImageFrom: [],
            dialogVisible: false,
            dialogImageUrl: '',
            dialogUsers: false
        }
    },
    mounted () {
        this.shopId = parseInt(this.$route.query.shopId)
        this.getShopInfo()
        this.shopImageList()
    },
    methods: {

        async getShopInfo () {
            let res = await getShopInfo({shopId: this.shopId})

            this.form = res.data.info

            console.log(this.form)
        },
        async shopImageList () {
            let list = await shopImageList({fromTable: 'tp_shop', dataId: this.shopId, fieldType: 1})

            this.shopImageFrom = list.data.list
            let fileList1 = [] // 轮播图
            list.data.list.forEach(item => {
                fileList1.push({
                    id: item.imageId,
                    url: item.imageUrl
                })
            })
            this.fileList1 = fileList1
        },
        handleClick (tab, event) {
            console.log(tab, event)
            if (tab.name === '3') {
                this.getShopInfo()
            }
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserLevelList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserLevelList()
        },
        handleShopImageSuccess (res, file) {
            this.form.shopImage = res.data.url
            console.log(this.form.idCardFront)
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        handleFrontSuccess (res, file) {
            this.form.idCardFront = res.data.url
            console.log(this.form.idCardFront)
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        handleReverseSuccess (res, file) {
            this.form.idCardReverse = res.data.url
            console.log(this.form.idCardReverse)
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        // 用户选择
        checkUsers () {
            this.dialogUsers = true
        },
        hideUsers () {
            this.dialogUsers = false
        },
        userids (val) {
            this.userslist = val
        },
        // 图片删除
        handleRemove (file, fileList1) {
            console.log(file, fileList1)
            this.delShopImage(file.id)
        },
        async delShopImage (id) {
            let res = await delShopsImage({imageId: id, fromTable: 'tp_shop', dataId: this.form.shopId, fieldType: 1})
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
            }
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        // 轮播图
        uploadSuccess (response, file, fileList1) {
            this.shopImageFrom = {}
            console.log(response, file, fileList1)
            console.log('++++++++++++++++')
            console.log(fileList1)
            // this.form.shopImage = this.form.shopImage + ',' + response.data.url
            // this.shopImageFrom = response.data.url

            this.shopImageFrom.fieldType = 1
            this.shopImageFrom.fromUserType = 1
            this.shopImageFrom.dataId = this.form.shopId
            this.shopImageFrom.imageUrl = response.data.url
            if (fileList1.length > 0) {
                this.shopImageFrom.imageName = fileList1[fileList1.length - 1].name.split('.')[0]
            } else {
                this.shopImageFrom.imageName = fileList1[0].name.split('.')[0]
            }
            this.shopImageFrom.fromTable = 'tp_shop'
            this.shopImageFrom.userId = this.form.userId
            // this.shopImageFrom.type = 1
            this.addImage()
        },
        handleLicenseSuccess (res, file) {
            this.form.businessLicense = res.data.url
            console.log(this.form.imageUrl)
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        // 编辑店铺
        async editShopAttr () {
            // let form = this.shopAttrForm
            // this.form.shopImage =
            try {
                delete this.form.discount
                console.log(this.form)
                let res = await getShopUpdate(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                }
            } catch (err) {}

            // this.shopImgForm.no = res.data.no
        },
        async addImage () {
            let res = await addShopImage(this.shopImageFrom)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.shopImageList()
            }
        },
        edit (n) {
            console.log(n)
            this.visible = true
            this.time = []
            this.form = {}
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
            if (this.form.isOpen) {
                this.form.isOpen = 1
            } else {
                this.form.isOpen = 0
            }
            if (this.isAdd) {
                // console.log(this.form)
                // console.log('++++++++++++++++++++++')
                // console.log(this.$refs.commodity.multipleSelection)
                // this.form.goodsId = this.$refs.commodity.goodslist
                this.form.userId = this.userslist
                // console.log(this.form.userId)
                // console.log(this.form)
                try {
                    this.form.isOpen = 1
                    console.log(this.form)
                    let res = await getShopAdd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getShopInfo()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                delete this.form.discount
                try {
                    let res = await getShopUpdate(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getShopInfo()
                    }
                } catch (err) {}
            }
        }
    },
    components: {
        pagination,
        'onlyuser': userMenu
    }
}
</script>

<style scoped lang="less">
.btn{padding-left:120px;}
</style>
