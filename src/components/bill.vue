<template>
    <div class="bill">
        <el-dialog class="print"  title="配送单打印预览" :visible.sync="printVisible" width="800px" center>
            <div id="printContent">
                <div class="desc">
                    <div class="date">开单日期：{{today | getDate()}}<br/>下单日期：{{order.createTime | getDate()}}</div>
                    <!-- <svg id="barcode"></svg> -->

                    <!-- <canvas id="canvas"></canvas> -->
                    <!-- <img id="barcode"/> -->
                    <div class="order-no">
                        <svg id="barcode" class="barcode"></svg>
                        <!-- <svg class="barcode3" jsbarcode-format="upc" jsbarcode-textmargin="0" jsbarcode-fontoptions="bold"></svg> -->
                        <div class="no">订单编号：{{order.orderNo}}</div>
                    </div>
                </div>
                <table style="table-layout:fixed;" border="1" cellspacing="0">
                    <caption>尚品舵手购物清单</caption>
                    <tr>
                        <td style="width: 124px;">客户名称</td>
                        <td style="width: 382px;" class="td-left">{{order.userName}}</td>
                        <td style="width: 106px;">客户电话</td>
                        <td colspan="2" class="td-left">{{order.userPhone}}</td>
                    </tr>
                    <tr>
                        <td>客户地址</td>
                        <td colspan="4" class="td-left">{{order.provinceName+order.cityName+order.countyName+order.userAddress}}</td>
                    </tr>
                    <tr>
                        <td>序号</td>
                        <td colspan="2">商品名称</td>
                        <!-- <td>规格</td> -->
                        <!-- <td style="width: 76px;">单位</td> -->
                        <td style="width: 150px;" colspan="2">数量</td>
                    </tr>
                    <tr v-for="(item, index) in goods" :key="item.id"
                        v-if="index >= (search.page-1) * search.size && index < search.page * search.size">
                        <td>{{index + 1}}</td>
                        <td class="td-left" colspan="2">{{item.goodsName}}</td>
                        <!-- <td>1*{{item.packspec}}</td> -->
                        <!-- <td>件</td> -->
                        <td colspan="2">{{item.goodsNum}}</td>
                    </tr>
                    <tr>
                        <td colspan="3">合计数量：</td>
                        <td colspan="2">{{shopCount}}</td>
                    </tr>
                </table>
                <table style="border-top: 0;">
                    <tr>
                        <td style="width: 172px;">销售贷款合计：</td>
                        <td style="width: 226px;" class="td-left">{{order.totalMoney}}</td>
                        <td style="width: 205px;">应收余款合计：</td>
                        <td colspan="2" class="td-left">{{order.payableMoney}}</td>
                    </tr>
                    <tr>
                        <td>销售货额合计(大写)：</td>
                        <td class="td-left">{{order.totalMoney | changeMoneyToChinese}}</td>
                        <td>应收余款合计(大写)：</td>
                        <td colspan="2" class="td-left" style="padding-right: 15px;">{{order.payableMoney | changeMoneyToChinese}}</td>
                    </tr>
                </table>
                <table style="border-top: 0;">
                    <tr>
                        <td style="width: 124px;">配送单位</td>
                        <td style="width: 128px;" class="td-left">供销联合国际</td>
                        <td style="width: 146px;">地址、电话</td>
                        <td colspan="2" class="td-left">方工路15号、400-877-9199</td>
                    </tr>
                </table>
                <div class="more">
                    <div style="width: 286px;">客户确认无误签字:</div>
                    <div style="width: 140px;">送货员:</div>
                    <div style="width: 140px;">制单员:</div>
                    <div>业务员:</div>
                </div>
            </div>
            <div class="footer">
                <div class="left">
                    <!-- <span class="text">订单页数：</span> -->
                    <!-- <span> -->
                        <el-pagination class="pagei"
                            background
                            layout="prev, pager, next"
                            :page-size="search.size"
                            :total="total"
                            @current-change="handleCurrentChange">
                            </el-pagination>
                    <!-- </span> -->
                </div>
                <div class="button">
                    <el-button @click="printVisible = false">取消</el-button>
                <el-button type="primary" @click="onPrint">打印</el-button>
                </div>
            </div>
            <!-- <span slot="footer" class="dialog-footer">

            </span> -->

        </el-dialog>
    </div>
</template>

<script>
import status from '@/mixins/status'
import Print from 'print-js'
import JsBarcode from 'jsbarcode'

export default {
    mixins: [status],
    data () {
        return {
            userInfo: {},
            today: '',
            total: null,
            search: {
                page: 1,
                size: 7
            },
            goodsList: [],
            // shopCount: 0,
            printVisible: this.visible
        }
    },
    props: ['order', 'goods', 'visible'],
    computed: {
        shopCount () {
            let count = 0
            for (let item of this.goods) {
                count += item.goodsNum
            }
            return count
        }
    },
    watch: {
        // visible (val) {
        //     this.printVisible = val
        // },
        printVisible (val) {
            this.$emit('update:visible', val)
        }
    },
    mounted () {
        this.today = new Date()
        // let length = this.goods.length
        this.total = this.goods.length
        this.userInfo = JSON.parse(window.localStorage.getItem('userInfo'))
        this.$nextTick(() => {
            JsBarcode('#barcode', this.order.orderNo, {
                format: 'MSI11',
                lineColor: '#000',
                width: 1.5,
                height: 22,
                displayValue: false
            })
        })
    },
    methods: {
        // 打印订单
        onPrint () {
            Print({
                printable: 'printContent',
                type: 'html',
                // 继承原来的所有样式
                targetStyles: ['*']
            })
        },
        handleCurrentChange (value) {
            this.search.page = value
            // for (let [item, index] of this.goods) {
            //     console.log(index)
            //     if (index >= (this.search.page - 1) * this.search.size) {
            //         item.push(this.goodsList)
            //     }
            // }
            // console.log(value)
        }
    }
}
</script>

<style scoped lang="less">
.print{
    .desc{display: flex;
        .date{flex: 1;}
    }
    table{ width: 100%; border: 1px solid #000;
        caption{text-align: center; font-size: 24px; font-weight: 700; line-height: 40px; letter-spacing:10px;}
        td{border-right: 1px solid #000; border-bottom: 1px solid #000; text-align: center; vertical-align: middle;
            &.td-left{text-align: left; padding-left: 8px;}
        }
    }
    .more{display: flex;}
}

.order-no{position: relative;
    .barcode{margin-top: -10px;}
    .no{position: absolute;left: 10px; bottom: -2px;}
}
.footer{display: flex; margin-top: 40px;
    .left{flex: 1; display: flex; align-items: center;
        .text{}
    }
}
.el-pagination{margin-top: 0;}
</style>

<style lang="less">
.el-dialog__body{color: #000!important; font-size: 14px!important;}

</style>
