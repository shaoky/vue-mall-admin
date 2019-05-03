<template>
  <div class="wrap-order">
        <div class="v-order-box">
            <div class="v-title">订单信息</div>
            <el-table class="mt20" :data="options" border>
                <el-table-column label="基础信息">
                    <template slot-scope="scope">
                        <el-form  label-position="left" inline  style="color:#999;">
                            <el-form-item label="订单号：" >{{orderInfo.orderNo}}</el-form-item>
                            <el-form-item label="下单时间：" >{{orderInfo.createTime | getTime}}</el-form-item>
                            <el-form-item label="付款时间：" >{{orderInfo.paymentTime | getTime}}</el-form-item>
                            <el-form-item label="发货时间：" >{{orderInfo.deliveryTime | getTime}}</el-form-item>
                            <el-form-item label="完成时间：" >{{orderInfo.receiveTime | getTime}}</el-form-item>
                            <el-form-item label="订单状态：" >{{orderInfo.orderStatusName}}</el-form-item>
                            <el-form-item label="订单来源：" >{{orderInfo.orderFromName}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="买家信息">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline  class="form-align">
                            <el-form-item label="供应商">{{orderInfo.sname}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column> -->
                <el-table-column label="收货信息">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline  class="form-align">
                            <el-form-item label="收货人：">{{orderInfo.userName}}</el-form-item>
                            <el-form-item label="手机号：">{{orderInfo.userPhone}}</el-form-item>
                            <el-form-item label="收货地址：">{{orderInfo.provinceName+orderInfo.cityName+orderInfo.countyName+orderInfo.userAddress}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="支付信息">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline  class="form-align">
                            <el-form-item label="订单金额：">￥{{orderInfo.totalMoney}}</el-form-item>
                            <el-form-item label="配送费：">￥{{orderInfo.deliverMoney}}</el-form-item>
                            <el-form-item label="应付金额：">￥{{orderInfo.payableMoney}}</el-form-item>
                            <el-form-item label="支付方式：">{{orderInfo.payTypeName}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column label="备注">
                    <template slot-scope="scope">
                        <el-form label-position="left" inline  class="form-align">
                            {{orderInfo.orderRemark}}
                        </el-form>
                    </template>
                </el-table-column>
            </el-table>
            <el-table class="mt20" :data="options" border  v-if="orderInfo.orderStatus === 3 || orderInfo.orderStatus === 4">
                <el-table-column label="发货信息">
                    <template slot-scope="scope">
                        <el-form  label-position="left" inline  style="color:#999;">
                            <el-form-item label="快递名称：" >{{orderInfo.courierName}}</el-form-item>
                            <el-form-item label="发货单号：" >{{orderInfo.courierNo}}</el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="v-order-box">
            <div class="v-title">商品信息</div>
            <el-table border :data="orderInfo.goodsList" class="mt20">
                <el-table-column label="商品id" prop="goodsId"></el-table-column>
                <el-table-column label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column label="商品规格" prop="skuSpec"></el-table-column>
                <el-table-column label="商品来源" prop="goodsSource"></el-table-column>
                <el-table-column label="商品来源链接">
                    <template slot-scope="scope">
                        <a :href="scope.row.goodsSourceUrl" target="_black">{{scope.row.goodsSourceUrl}}</a>
                    </template>
                </el-table-column>
                <el-table-column label="单价" prop="goodsPrice"></el-table-column>
                <el-table-column label="数量" prop="goodsNum"></el-table-column>
                <el-table-column label="合计">
                    <template slot-scope="scope">
                        {{scope.row.goodsPrice * scope.row.goodsNum}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="v-order-box" v-if="orderInfo.refund">
            <div class="v-title">退货信息</div>
            <el-table border :data="orderInfo.refund" class="mt20">
                <el-table-column label="商品名称" prop="goodsName"></el-table-column>
                <el-table-column label="商品数量" prop="goodsNum"></el-table-column>
                <el-table-column label="退货单号">
                    <template slot-scope="scope">
                        <el-button type="text">{{scope.row.refundNo}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column label="处理时间">
                    <template slot-scope="scope">{{scope.row.createTime | getTime}}</template>
                </el-table-column>
                <el-table-column label="状态" prop="refundStatusName"></el-table-column>
            </el-table>
        </div>
        <div class="text-center">
            <!-- <el-button type="danger" @click="setOrderCancel" v-if="orderInfo.orderStatus == 2 || orderInfo.orderStatus == 3">取消订单</el-button> -->
            <el-button type="primary" @click="delieryVisible = true" v-if="orderInfo.orderStatus == 2">发货</el-button>
            <el-button type="primary" @click="printVisible = true">打印订单</el-button>
            <!-- <el-button type="danger" @click="setOrderRefund" v-if="orderInfo.orderStatus == 2">退款</el-button> -->
            <!-- <el-button type="danger" @click="setOrderRefund" v-if="orderInfo.orderStatus == 3">退款</el-button> -->

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
        <bill :order="orderInfo" :goods="orderInfo.goodsList" :visible.sync="printVisible" v-if="printVisible"></bill>
        <!-- 发货 -->
        <el-dialog
            title="发货"
            :visible.sync="delieryVisible"
            width="400px"
            center>
            <div class="edit">
                <el-form label-width="120px">
                    <el-form-item label="快递名称：">
                        <el-input v-model="courier.courierName"></el-input>
                    </el-form-item>
                    <el-form-item label="快递单号：" >
                        <el-input v-model="courier.courierNo"></el-input>
                    </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addVisible = false">取 消</el-button>
                <el-button type="primary" @click="setOrderDelivery">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import { getOrderInfo, setOrderDelivery, setOrderCancel, setOrderRefund } from '@/api/getData'
import bill from '@/components/bill'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            orderId: null,
            options: [{name: 1}],
            form: {
                ordersn: '',
                id: null
            },
            /**
             * 发货
             */
            delieryVisible: false,
            courier: {
                courierName: '',
                courierNo: ''
            },
            orderInfo: {},
            printVisible: false
        }
    },
    mounted () {
        this.orderId = this.$route.params.orderId
        this.getOrderInfo()
    },
    methods: {
        async getOrderInfo () {
            let res = await getOrderInfo({orderId: this.orderId})
            for (let item of res.data.info.goodsList) {
                item.skuSpec = JSON.parse(item.skuSpec)
                item.skuSpec = item.skuSpec.join('，')
            }
            this.orderInfo = res.data.info
        },
        async setOrderDelivery () {
            this.courier.orderId = this.orderId
            let res = await setOrderDelivery(this.courier)
            if (res.code === 200) {
                this.$notify({
                    title: '成功',
                    message: res.data,
                    type: 'success'
                })
                this.delieryVisible = false
                this.getOrderInfo()
            }
        },
        async setOrderCancel () {
            this.$confirm('确定要取消订单？').then(
                async () => {
                    let res = await setOrderCancel({orderId: this.orderId})
                    try {
                        if (res.code === 200) {
                            this.getOrderInfo()
                            this.$notify({
                                title: '成功',
                                message: res.data,
                                type: 'success'
                            })
                        }
                    } catch (err) {}
                }
            )
        },
        async setOrderRefund () {
            this.$confirm('确定要退款？').then(
                async () => {
                    let res = await setOrderRefund({orderId: this.orderId})
                    try {
                        if (res.code === 200) {
                            this.getOrderInfo()
                            this.$notify({
                                title: '成功',
                                message: res.data,
                                type: 'success'
                            })
                        }
                    } catch (err) {}
                }
            )
        }
    },
    components: {
        bill
    }
}
</script>

<style scoped lang="less">
.wrap-order{
    .form-align{position:absolute;top:12px;color:#999}
    .el-form-item{margin-bottom:2px;width:100%;}
}
</style>
