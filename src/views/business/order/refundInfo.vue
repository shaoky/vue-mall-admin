<template>
  <div class="wrap-order">
        <div class="v-order-box">
            <div class="v-title">退货信息</div>
            <el-table class="mt20" :data="options" border>
                <el-table-column label="基础信息">
                    <template slot-scope="scope">
                        <el-form  label-position="left" inline  style="color:#999;">
                            <el-form-item label="订单号：" >{{refundInfo.orderNo}}</el-form-item>
                            <el-form-item label="退货订单号：" >{{refundInfo.refundNo}}</el-form-item>
                            <el-form-item label="退货类型：" >{{refundInfo.refundTypeName}}</el-form-item>
                            <el-form-item label="申请时间：" >{{refundInfo.createTime | getTime}}</el-form-item>
                            <el-form-item label="确认时间：" >{{refundInfo.resolveTime | getTime}}</el-form-item>
                            <el-form-item label="退货状态：" >{{refundInfo.refundStatusName}}</el-form-item>
                            <el-form-item label="退货理由：" >{{refundInfo.refundReason}}</el-form-item>
                            <el-form-item label="退货说明：" >{{refundInfo.refundRemark}}</el-form-item>
                            <el-form-item label="退货图片：" >
                                <img v-if="refundInfo.refundImage" :src="refundInfo.refundImage" style="width: 100%;">
                                <!-- <el-upload
                                    class="avatar-uploader"
                                    :action="imgBaseUrl"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess">
                                    <img v-if="refundInfo.refundImage" :src="refundInfo.refundImage" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload> -->
                            </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="买家信息">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline  class="form-align">
                            <el-form-item label="供应商">{{refundInfo.sname}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
            </el-table>
        </div>
        <div class="v-order-box">
            <div class="v-title">商品信息</div>
            <el-table border :data="refundInfo.goodsList" class="mt20">
                <el-table-column label="商品id" prop="goodsId"></el-table-column>
                <el-table-column label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column label="单价" prop="goodsPrice"></el-table-column>
                <el-table-column label="数量" prop="goodsNum"></el-table-column>
                <el-table-column label="合计">
                    <template slot-scope="scope">
                        {{scope.row.goodsPrice * scope.row.goodsNum}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="text-center" >
            <el-button type="primary" @click="setOrderDelivery" v-if="refundInfo.refundStatus === 1">确认退款</el-button>
            <el-button type="danger" @click="delieryVisible = true" v-if="refundInfo.refundStatus == 1">取消退款</el-button>
        </div>
        <!-- <div class="v-order-box" v-if="send.length>0">
            <div class="v-title">已发货信息</div>
            <el-table border :data="send" class="mt20">
                <el-table-column label="发货单号" prop="sendsn"></el-table-column>
                <el-table-column label="商品名称" prop="goodsname"></el-table-column>
                <el-table-column label="商品数量" prop="goodsnumber"></el-table-column>
                <el-table-column label="状态" prop="driverstatus">
                    <template slot-scope="scope">{{send[scope.$index].driverstatus | getSendstate}}</template>
                </el-table-column>
                <el-table-column label="发货时间">
                    <template slot-scope="scope">{{send[scope.$index].sendtime | getTime}}</template>
                </el-table-column>
                <el-table-column label="确认时间">
                    <template slot-scope="scope">{{send[scope.$index].confirmtime | getTime}}</template>
                </el-table-column>
            </el-table>
        </div>
        -->

        <!-- 发货 -->
      <el-dialog
              title="拒绝退款"
              :visible.sync="delieryVisible"
              width="400px"
              center>
          <div class="edit">
              <el-form label-width="120px">
                  <el-form-item label="拒绝理由：">
                      <el-input v-model="courier.refuseReason"></el-input>
                  </el-form-item>
              </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="setOrderCancel">确 定</el-button>
            </span>
      </el-dialog>
  </div>
</template>

<script>
import { imgBaseUrl } from '@/config/env'
import { getRefundInfo, updateRefund, setOrderRefund } from '@/api/getData'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            imgBaseUrl: imgBaseUrl,
            refundId: null,
            options: [{name: 1}],
            orderInfo: {
                goodsList: []
            },
            /**
             * 发货
             */
            delieryVisible: false,
            courier: {
                refuseReason: ''
            },
            refundInfo: {
                refundImage: ''
            }
        }
    },
    mounted () {
        this.refundId = this.$route.params.refundId
        this.getRefundInfo()
    },
    methods: {
        async getRefundInfo () {
            let res = await getRefundInfo({refundId: this.refundId})
            this.refundInfo = res.data.info
        },
        async setOrderDelivery () {
            // this.courier.refundStatus = 2
            // this.courier.refundId = this.refundId
            this.$confirm('确定要退款？').then(
                async () => {
                    let res = await setOrderRefund({orderId: this.refundInfo.orderId})
                    if (res.code === 200) {
                        this.getRefundInfo()
                        this.$notify({
                            title: '成功',
                            message: res.data,
                            type: 'success'
                        })
                        this.delieryVisible = false
                    }
                }
            )
        },
        async setOrderCancel () {
            this.$confirm('确定要取消退款？').then(
                async () => {
                    this.courier.refundStatus = 3
                    this.courier.refundId = this.refundId
                    let res = await updateRefund(this.courier)
                    try {
                        if (res.code === 200) {
                            this.getRefundInfo()
                            this.$notify({
                                title: '成功',
                                message: res.data,
                                type: 'success'
                            })
                            this.delieryVisible = false
                            this.getRefundInfo()
                        }
                    } catch (err) {}
                }
            )
        },
        handleAvatarSuccess (res, file) {
            this.refundInfo.refundImage = res.data.url
            console.log(this.refundInfo.refundImage)
            this.addImage()
            // this.imageUrl = URL.createObjectURL(file.raw)
        },
        async addImage () {
            let res = await updateRefund({refundId: this.refundInfo.refundId, refundImage: this.refundInfo.refundImage})
            try {
                if (res.code === 200) {
                    this.getRefundInfo()
                    this.$notify({
                        title: '成功',
                        message: res.data,
                        type: 'success'
                    })
                    this.delieryVisible = false
                    this.getRefundInfo()
                }
            } catch (err) {}
        }

    }
}
</script>

<style scoped lang="less">
.wrap-order{
    .form-align{position:absolute;top:12px;color:#999}
    .el-form-item{margin-bottom:2px;width:100%;}
}
</style>
