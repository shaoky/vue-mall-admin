<template>
    <div class="articleIndex">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>抢购管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-form-item label="状态：" >
                <el-select v-model="form.gsStatus" @change="getSeckillList">
                    <el-option  v-for="item in getStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="getSeckillList">查询</el-button>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="edit(-1)">新建</el-button>
            </el-form-item>
            <!-- <el-form>
                <el-button type='primary' @click="edit(-1)">新建</el-button>
            </el-form> -->
        </el-form>
        <el-table border :data="list">
            <el-table-column label="活动封面" prop="imageUrl">
                 <template slot-scope="scope">
                    <img :src="scope.row.gsImage" style="max-height: 160px; margin:0 auto; display: block;">
                </template>
            </el-table-column>
            <el-table-column label="活动名称" prop="gsTitle"></el-table-column>
            <el-table-column label="活动时间">
                <template slot-scope="scope">
                    {{ scope.row.startTime | getDate}} - {{scope.row.endTime | getDate}}
                </template>
            </el-table-column>
            <el-table-column label="剩余库存" prop="goodsStock"></el-table-column>
            <el-table-column label="津贴机制" prop="state">
                <template slot-scope="scope">
                    {{ list[scope.$index].isCommission | getIsOpenNumber }}
                </template>
            </el-table-column>
            <el-table-column label="活动状态" prop="gsStatusName"></el-table-column>
            <el-table-column label="启用状态" prop="state">
                <template slot-scope="scope">
                    {{ list[scope.$index].isOpen | getIsOpenNumber }}
                </template>
            </el-table-column>
            <el-table-column label="操作" >
               <template slot-scope="scope">
                   <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                   <el-button type="text" @click="del(scope.row.gsId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!--分页!-->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="40%" overflow="scroll" center>
            <el-form label-width="120px">
                <el-form-item label="排序">
                    <el-input v-model="form.gsSort"></el-input>
                </el-form-item>
                <el-form-item label="活动标题">
                    <el-input v-model="form.gsTitle"></el-input>
                </el-form-item>
               <el-form-item label="活动图片：">
                    <!-- <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="form.gsImage" :src="form.gsImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload> -->
                    <el-upload
                        class="avatar-uploader"
                        :action="imgBaseUrl"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <img v-if="form.gsImage" :src="form.gsImage" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                </el-form-item>
                <el-form-item label="活动商品：">
                    <el-button @click="checkGoods">选择商品</el-button>
                </el-form-item>
                <el-form-item label="活动库存">
                    <el-input v-model="form.goodsStock"></el-input>
                </el-form-item>
                <el-form-item label="已销库存">
                    <el-input v-model="form.gsTitle"></el-input>
                </el-form-item>
                <el-form-item label="剩余库存">
                    <el-input v-model="form.gsTitle"></el-input>
                </el-form-item>
                <el-form-item label="活动时间">
                    <date-picker @timePick="getTime" :time="time" ></date-picker>
                    <!-- <div class="block">
                        <el-date-picker
                        v-model="value4"
                        type="datetimerange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                        </el-date-picker>
                    </div> -->
                </el-form-item>
                 <el-form-item label="支持返津贴机制">
                    <el-radio v-model="form.isCommission" label="1">支持</el-radio>
                    <el-radio v-model="form.isCommission" label="0">不支持</el-radio>
                </el-form-item>
                 <h3 class="mainImage mt20">会员</h3>
                <el-form-item label="起限量">
                    <el-input class="buy" v-model="form.memberMinBuy"></el-input> ——
                    <el-input class="buy" v-model="form.memberMaxBuy"></el-input>
                </el-form-item>
                <el-form-item label="活动价">
                    <el-input v-model="form.memberActivityPrice"></el-input>
                </el-form-item>
                <h3 class="mainImage mt20">非会员</h3>
                <el-form-item label="起限量">
                    <el-input class="buy" v-model="form.minBuy"></el-input> ——
                    <el-input class="buy" v-model="form.maxBuy"></el-input>
                </el-form-item>
                <el-form-item label="活动价">
                    <el-input v-model="form.activityPrice"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </el-dialog>
        <el-dialog title="商品选择" :visible.sync="dialogGoods" width="40%" overflow="scroll">
            <commodity @goodsids="goodsids" :isSeckillGoods="1" @hide="hideGoods"></commodity>
        </el-dialog>
    </div>
</template>
<script>
import { getSeckillList, getSeckillAdd, getSeckilleUpdate, getSeckillDel } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'
import commodityMenu from '@/components/onlycommodity'
import { imgBaseUrl } from '@/config/env'
import datePicker from '@/components/date-picker'
export default {
    mixins: [status],
    data () {
        return {
            form: {
                page: 1,
                size: 20,
                // gsStatus: 0
                gsImage: '',
                gsStatus: 0
            },
            list: [],
            time: [],
            page: {
                total: 20
            },
            getStatus: [
                {label: '已结束', value: 2}, {label: '进行中', value: 3}, {label: '未开始', value: 1}, {label: '全部', value: 0}
            ],
            dialogVisible: false,
            dialogVisibles: false,
            dialogImageUrl: '',
            dialogGoods: false,
            form1: {
                gsImage: ''
            },
            imgBaseUrl: imgBaseUrl
        }
    },
    mounted () {
        this.form1 = {...this.form}
        this.getSeckillList()
    },
    methods: {
        async getSeckillList () {
            let res1 = '11'
            let res = await getSeckillList(this.form)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        // 分页开始
        handleCurrentChange (val) {
            this.form.page = val
            this.getActivePostionList()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getActivePostionList()
        },
        // 分页结束
        getTime (val) {
            this.form.startTime = val[0]
            this.form.endTime = val[1]
        },
        // 图片上传开始
        handleAvatarSuccess (res, file) {
            this.form.gsImage = res.data.url
            this.dialogImageUrl = res.data.url
            console.log(this.form.gsImage)
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        beforeAvatarUpload (file) {
            const isJPG = file.type === 'image/jpeg'
            const isLt2M = file.size / 1024 / 1024 < 2

            if (!isJPG) {
                this.$message.error('上传头像图片只能是 JPG 格式!')
            }
            if (!isLt2M) {
                this.$message.error('上传头像图片大小不能超过 2MB!')
            }
            return isJPG && isLt2M
        },
        handleRemove (file, fileList) {
            console.log(file, fileList)
        },
        handlePictureCardPreview (file) {
            this.dialogImageUrl = file.url
            this.dialogVisibles = false
        },
        // 图片上传结束
        // 商品选择
        checkGoods () {
            this.dialogGoods = true
        },
        hideGoods () {
            this.dialogGoods = false
        },
        goodsids (val) {
            this.goodslist = val
        },
        del (index) {
            this.$confirm('确认删除吗？').then(
                async () => {
                    try {
                        await getSeckillDel({gsId: index})
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    } catch (err) {
                        console.log(err)
                    }

                    this.getSeckillList()
                }
            )
        },
        edit (index) {
            // -1为新建
            this.form = {}
            this.dialogVisible = true
            this.form = {...this.form1}
            if (index === -1) {
                // 新增
                this.isAdd = true
            } else {
                this.isAdd = false
                this.form = JSON.parse(JSON.stringify(this.list[index]))
                if (this.form.isOpen === 0) {
                    this.form.isOpen = false
                } else if (this.form.isOpen === 1) {
                    this.form.isOpen = true
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
                // console.log(this.$refs.commodity.multipleSelection)
                // this.form.goodsId = this.$refs.commodity.goodslist
                this.form.goodsId = this.goodslist

                try {
                    this.form.isOpen = 1
                    let res = await getSeckillAdd(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getSeckillList()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res = await getSeckilleUpdate(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getSeckillList()
                    }
                } catch (err) {}
            }
        }
    },
    activated () {
        this.getSeckillList()
    },
    components: {
        pagination,
        datePicker,
        'commodity': commodityMenu
    }

}
</script>
<style>
.mainImage{
    margin-left: 10%;
}
.buy{
    width:30%;
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
