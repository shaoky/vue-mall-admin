<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- <el-form :inline="true">
            <el-form-item>
                <el-button type="primary" @click="levelVisible = true, add()">新增等级</el-button>
            </el-form-item>
        </el-form> -->

        <el-form :inline="true">
            <el-form-item label="店铺名称：">
                <el-input v-model="search.shopName" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getShopList">查询</el-button>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" @click="$router.push({path:'info'})">新增店铺</el-button> -->
                <el-button type="primary" @click="edit(-1)">新增店铺</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onDownloadShop()">下载店铺数据</el-button>
            </el-form-item>
            <!-- <el-form-item>
                <el-button type="primary" @click="getExcelOrder">下载excel</el-button>
            </el-form-item> -->
        </el-form>

        <el-table border :data="shopList">
            <el-table-column prop="shopName" label="店铺名称"></el-table-column>
            <el-table-column prop="shopKeeper" label="联系人"></el-table-column>
            <el-table-column prop="shopPhone" label="联系电话"></el-table-column>
            <el-table-column prop="shopAddress" label="地址"></el-table-column>
            <el-table-column label="申请时间">
                <template slot-scope="scope">{{ scope.row.createTime | getTime }}</template>
            </el-table-column>
            <el-table-column label="审核时间">
                <template slot-scope="scope">{{ scope.row.auditTime | getTime }}</template>
            </el-table-column>
            <el-table-column prop="shopStatus" label="店铺状态">
                <template slot-scope="scope">{{ scope.row.shopStatus | getIsOpenNumber }}</template>
            </el-table-column>
            <el-table-column prop="isOpen" label="前台状态">
                <template slot-scope="scope">{{ scope.row.isOpen | getIsOpenNumber }}</template>
            </el-table-column>
            <el-table-column prop="auditStatus" label="审核状态">
                <template slot-scope="scope">{{ scope.row.auditStatus | getAuditStatus }}</template>
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <!-- <el-button @click="toEdit(scope.row)" type="text" >编辑</el-button> -->
                    <el-button @click="setShopAuditStatus(scope.row)" type="text">审核</el-button>
                    <el-button @click="setShopOpen(scope.row)" type="text">{{scope.row.isOpen ? '未开启' : '开启'}}</el-button>
                    <el-button @click="setDiscount(scope.row,scope.row.shopDiscount)" type="text">折扣</el-button>
                    <el-button @click="$router.push({path:'info',query:{shopId:scope.row.shopId}})" type="text">编辑</el-button>
                    <!-- <el-button @click="toEdit(scope.row)" type="text" >编辑</el-button> -->
                    <!-- <el-button @click="$router.push({name: 'levelInfo', params: {levelId: scope.row.levelId}})" type="text" >配置规则</el-button> -->
                    <!-- <el-button @click="onDel(scope.row.levelId)" type="text" >删除</el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="page.total"></pagination>
        <!-- 设置折扣 -->
        <el-dialog title="折扣设置" :visible.sync="setdiscount" width="50%" center>
            <el-form label-width="120px">
                <el-form-item label="商家折扣：">
                    <el-input style="width:300px" v-model="discount"></el-input>
                </el-form-item>
                <!-- <el-form-item label="前台折扣："></el-form-item> -->
            </el-form>
            <p class="dis">前台折扣</p>
            <br>
            <el-form v-for="item in discountForm" :key="item.id" label-width="120px">
                <!-- <i v-for="item in discountForm" > -->
                <el-form-item v-if="item.userType === 1" label="普通会员：">
                    <el-input style="width:300px" disabled v-model="item.discountRate"></el-input>
                </el-form-item>
                <el-form-item v-if="item.userType === 2" label="黄金会员：">
                    <el-input style="width:300px" disabled v-model="item.discountRate"></el-input>
                </el-form-item>
                <el-form-item v-if="item.userType === 3" label="白金舵手">
                    <el-input style="width:300px" disabled v-model="item.discountRate"></el-input>
                </el-form-item>
                <el-form-item v-if="item.userType === 4" label="钻石舵手">
                    <el-input style="width:300px" disabled v-model="item.discountRate"></el-input>
                </el-form-item>
                <!-- </i> -->
            </el-form>
            <p class="dis">会员优惠率</p>
            <br>
            <el-form v-for="items in couponForm" :key="items.id" label-width="120px">
                <!-- <i v-for="item in discountForm" > -->
                <el-form-item v-if="items.userType === 1" label="普通会员：">
                    <el-input style="width:300px" v-model="items.couponRate"></el-input>
                </el-form-item>
                <el-form-item v-if="items.userType === 2" label="黄金会员：">
                    <el-input style="width:300px" v-model="items.couponRate"></el-input>
                </el-form-item>
                <el-form-item v-if="items.userType === 3" label="白金会员">
                    <el-input style="width:300px" v-model="items.couponRate"></el-input>
                </el-form-item>
                <el-form-item v-if="items.userType === 4" label="钻石会员">
                    <el-input style="width:300px" v-model="items.couponRate"></el-input>
                </el-form-item>
                <!-- </i> -->
            </el-form>
            <el-button type="primary" class="el-button-center fs20" @click="sure">确  定</el-button>
        </el-dialog>
        <!-- 店铺审核 -->
        <el-dialog title="审核" :visible.sync="dialogAudit" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="审核状态：">
                    <input type="radio" id="one" value="-1" v-model="form.auditStatus">
                    <label for="one">拒绝</label>
                    <input type="radio" id="two" value="0" v-model="form.auditStatus">
                    <label for="two">未审核</label>
                    <input type="radio" id="three" value="1" v-model="form.auditStatus">
                    <label for="three">已审核</label>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogAudit = false">取 消</el-button>
                <el-button type="primary" @click="submitAudit">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="店铺新增" :visible.sync="visible" width="50%" center>
            <el-form label-width="120px">
                <el-form-item label="用户：">
                    <el-input class="username" :style="{'display':userDisplay}" disabled style="width:200px;" v-model="form.userName"></el-input>
                    <el-button class="checkuser" v-bind="{'display':checkuser}"  type="primary"  @click="checkUsers">选择用户</el-button>

                </el-form-item>
                <el-form-item label="店铺名称：">
                    <el-input style="width:300px;" v-model="form.shopName"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input style="width:300px;" v-model="form.shopKeeper"></el-input>
                </el-form-item>
                <el-form-item label="商家折扣：">
                    <el-input style="width:300px;" v-model="form.shopDiscount"></el-input>
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
                        :on-success="handleAvatarSuccess">
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
                <span slot="footer" class="dialog-footer">
                    <el-button @click="visible = false">取 消</el-button>
                    <el-button type="primary" @click="submit">提 交</el-button>
                </span>
            </el-dialog>
            <el-dialog title="用户选择" :visible.sync="dialogUsers" width="40%" overflow="scroll">
                <onlyuser @usersids="userids" :isSeckillGoods="1" @hide="hideUsers"></onlyuser>
            </el-dialog>
    </div>
</template>

<script>
import { getShopList, getShopAdd, getShopInfo, getShopUpdate, updateDiscount, setShopOpen, setShopAuditStatus, getExcelShop } from '@/api/getData'
import pagination from '@/components/pagination'
import userMenu from '@/components/onlyuser'
import status from '@/mixins/status'
import { imgBaseUrl, baseUrl } from '@/config/env'

export default {
    mixins: [status],
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            search: {
                page: 1,
                size: 20
            },
            page: {
                total: 0
            },
            shopList: [],
            visible: false,
            setdiscount: false,
            isAdd: true,
            discount: 0,
            discountValue: 0,
            shopId: 0,
            form: {
                businessLicense: '',
                idCardFront: '',
                idCardReverse: '',
                shopImage: ''

            },
            form1: {},
            discountForm: [],
            couponForm: [],
            setForm: [],
            dialogUsers: false,
            dialogAudit: false,
            checkuser: 'none',
            username: false
        }
    },
    mounted () {
        this.form1 = {...this.form}
        this.getShopList()
        // this.getShopInfo()
    },
    methods: {
        async getShopList () {
            let res = await getShopList(this.search)
            this.shopList = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.search.page = val
            this.getUserLevelList()
        },
        handleSizeChange (val) {
            this.search.size = val
            this.getUserLevelList()
        },
        // 用户选择
        checkUsers () {
            this.dialogUsers = true
        },
        hideUsers () {
            this.dialogUsers = false
        },
        userids (val) {
            // console.log(val)
            // this.form = {}
            this.userslist = val[0].userId
            this.form.userName = val[0].userName
            console.log(this.form)
        },
        checkDisplay: function () {
            return 'none'
        },
        userDisplay: function () {
            return 'online'
        },
        handleAvatarSuccess (res, file) {
            this.form.businessLicense = res.data.url
            console.log(this.form.businessLicense)
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
        handleShopImageSuccess (res, file) {
            this.form.shopImage = res.data.url
        },
        edit (n) {
            console.log(n)
            this.visible = true
            this.time = []
            this.form = {...this.form1}
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
        // 审核
        setShopAuditStatus (row) {
            this.dialogAudit = true
            this.shopId = row.shopId
        },
        async submitAudit () {
            try {
                let res = await setShopAuditStatus({shopId: this.shopId, auditStatus: this.form.auditStatus})
                this.getShopList()
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success'
                })
                this.dialogAudit = false
                this.getShopList()
                console.log(res)
            } catch (err) {}
        },
        // 设置前端显示
        async setShopOpen (row) {
            let isOpen
            if (row.isOpen) {
                isOpen = 0
            } else {
                isOpen = 1
            }
            try {
                let res = await setShopOpen({shopId: row.shopId, isOpen: isOpen})
                this.getShopList()
                this.$notify({
                    title: '成功',
                    message: '操作成功',
                    type: 'success'
                })
                console.log(res)
            } catch (err) {}
        },
        // 设置折扣
        async setDiscount (shopId, discounts) {
            let res = await getShopInfo(shopId)
            this.discountValue = discounts
            this.shopId = shopId.shopId
            this.discountForm = res.data.info.discount
            this.couponForm = res.data.info.discount
            console.log(discounts)
            console.log(this.discountForm)
            this.discount = discounts

            this.setdiscount = true
            // this.discountForm = {shopId: shopId}
        },
        async sure () {
            let setForms = []
            this.discountForm.forEach(item => {
                setForms.push({
                    userType: item.userType,
                    couponRate: item.couponRate
                })
            })
            this.setForm = {}
            this.setForm.shopId = this.shopId
            this.setForm.shopDiscount = this.discountValue
            this.setForm.list = setForms
            // console.log(this.setForm)
            try {
                let res = await updateDiscount(this.setForm)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    })
                    this.setdiscount = false
                    this.getShopList()
                }
            } catch (err) {}
        },
        async submit () {
            delete this.form.userName
            if (this.form.isOpen) {
                this.form.isOpen = 1
            } else {
                this.form.isOpen = 0
            }
            if (this.isAdd) {
                this.form.userId = this.userslist
                console.log(this.form.userId)
                console.log(this.form)
                try {
                    this.form.isOpen = 1

                    let res = await getShopAdd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '操作成功',
                            type: 'success'
                        })
                        this.visible = false
                        this.getShopList()
                    }
                } catch (err) {}
            } else {
                try {
                    let res = await getShopUpdate(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.visible = false
                        this.getShopList()
                    }
                } catch (err) {}
            }
        },
        async onDownloadShop () {
            let res = await getExcelShop()
            if (res.code === 200) {
                location.href = baseUrl + res.data
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
.dis{
    text-align: center;
    font-size:18px;
}
.checkuser{
    display: inline;
}
</style>
