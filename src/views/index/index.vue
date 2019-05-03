<template>
    <div class="index-container">
        <div class="top">
            <div class="title">下午好！admin</div>
            <div class="content">
                <div class="item t1">
                    <div class="name">待发货订单</div>
                    <div class="num">{{data.pending.order}}</div>
                </div>
                <div class="item t2">
                    <div class="name">待处理退货订单</div>
                    <div class="num">{{data.pending.refund}}</div>
                </div>
                <div class="item t3">
                    <div class="name">待处理提现请求</div>
                    <div class="num">{{data.pending.withdrawal}}</div>
                </div>
                <div class="item t4">
                    <div class="name">待处理会员审核</div>
                    <div class="num">{{data.pending.user}}</div>
                </div>
            </div>
        </div>
        <div class="index-title">平台当月数据</div>
        <div class="report">
            <div class="item" style="margin-left: 0;">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.user" class="progress progress1" color="#007cfc" ></el-progress>
                    <div class="text">今日新增用户{{data.user.dayuser}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总用户：<span>{{data.user.alluser}}</span></li>
                        <li>本周新增：<span>{{data.user.weekuser}}</span></li>
                        <li>本月新增：<span>{{data.user.monthuser}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.vip" class="progress progress2" color="#fcc488"></el-progress>
                    <div class="text">今日新增会员{{data.vip.dayvip}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总会员：<span>{{data.vip.allvip}}</span></li>
                        <li>本周新增会员：<span>{{data.vip.weekvip}}</span></li>
                        <li>本月新增会员：<span>{{data.vip.monthvip}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.withdrawal" class="progress progress2" color="#fcc488"></el-progress>
                    <div class="text">今日提现{{data.withdrawal.daywithdrawal}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总提现：<span>{{data.withdrawal.allwithdrawal}}</span></li>
                        <li>本周提现：<span>{{data.withdrawal.weekwithdrawal}}</span></li>
                        <li>本月提现：<span>{{data.withdrawal.monthwithdrawal}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="report">
            <div class="item" style="margin-left: 0;">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.order" class="progress progress1" color="#007cfc" ></el-progress>
                    <div class="text">今日下单{{data.order.dayorder}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总下单：<span>{{data.order.allorder}}</span></li>
                        <li>本周下单：<span>{{data.order.weekorder}}</span></li>
                        <li>本月下单：<span>{{data.order.monthorder}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.orderMoney" class="progress progress2" color="#fcc488"></el-progress>
                    <div class="text">今日流水{{data.orderMoney.dayorderMoney}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总流水：<span>{{data.orderMoney.allorderMoney}}</span></li>
                        <li>本周流水：<span>{{data.orderMoney.weekorderMoney}}</span></li>
                        <li>本月流水：<span>{{data.orderMoney.monthorderMoney}}</span></li>
                    </ul>
                </div>
            </div>
            <div class="item">
                <div class="item-left">
                    <el-progress type="circle" :percentage="percentage.commission" class="progress progress2" color="#fcc488"></el-progress>
                    <div class="text">今日返现{{data.commission.daycommission}}</div>
                </div>
                <div class="item-right">
                    <ul>
                        <li>总返现：<span>{{data.commission.allcommission}}</span></li>
                        <li>本周返现：<span>{{data.commission.weekcommission}}</span></li>
                        <li>本月返现：<span>{{data.commission.monthcommission}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="index-title">平台数据总览</div>
        <div class="data">
            <table class="v-table">
                <tr>
                    <!-- <th>总有效订单</th> -->
                    <!-- <th>总有效金额</th> -->
                    <!-- <th>总返利金额</th> -->
                    <!-- <th>总会员数</th> -->
                    <th>冻结金额</th>
                    <th>不可提现金额</th>
                    <th>未提现金额</th>
                    <th>提现申请金额</th>
                    <th>已提现金额</th>
                    <th>总返利金额</th>
                </tr>
                <tr>
                    <!-- <td>{{data.all.orderCount || 0}}</td> -->
                    <!-- <td>{{data.all.orderPriceCount || 0}}</td> -->
                    <!-- <td>{{data.all.commissionPriceCount || 0}}</td> -->
                    <!-- <td>{{data.newMember}}</td> -->
                    <td>{{data.all.freezeAmount || 0}}</td>
                    <td>{{data.all.noWithdrawalAmount || 0}}</td>
                    <td>{{data.all.withdrawalAmount || 0}}</td>
                    <td>{{data.all.withdrawaling || 0}}</td>
                    <td>{{data.withdrawal.allwithdrawal || 0}}</td>
                    <td>{{data.commission.allcommission || 0}}</td>
                </tr>
            </table>
            <el-button type="primary" class="mt20" @click="$router.push({name: 'relationMap'})">平台用户关系图</el-button>
        </div>
        <!-- <el-row>
            <el-col :span="17">
                <div class="report">
                    <el-row>
                        <el-col :span="12">
                            <div class="item">
                                <div class="item-left">
                                    <el-progress type="circle" :percentage="percentage.supplier" class="progress progress1" color="#007cfc" ></el-progress>
                                    <div class="text">今日新增供应商{{data.supplierday}}</div>
                                </div>
                                <div class="item-right">
                                    <ul>
                                        <li>供应商：<span>{{data.suppliertotal}}</span></li>
                                        <li>本周新增：<span>{{data.supplierweek}}</span></li>
                                        <li>本月新增：<span>{{data.suppliermon}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="item-left">
                                    <el-progress type="circle" :percentage="percentage.merchant" class="progress progress2" color="#fcc488"></el-progress>
                                    <div class="text">今日新增采购商{{data.merchantday}}</div>
                                </div>
                                <div class="item-right">
                                    <ul>
                                        <li>采购商：<span>{{data.merchanttotal}}</span></li>
                                        <li>本周新增：<span>{{data.merchantweek}}</span></li>
                                        <li>本月新增：<span>{{data.merchantmon}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="item-left">
                                    <el-progress type="circle" :percentage="percentage.order" class="progress progress3" color="#8a7cf2"></el-progress>
                                    <div class="text">今日流水{{data.ordertoday}}</div>
                                </div>
                                <div class="item-right">
                                    <ul>
                                        <li>流水：<span>{{data.ordertotal}}</span></li>
                                        <li>本周流水：<span>{{data.orderweek}}</span></li>
                                        <li>本月流水：<span>{{data.ordermon}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div class="item">
                                <div class="item-left">
                                    <el-progress type="circle" :percentage="percentage.goods" class="progress progress4" color="#30c6aa"></el-progress>
                                    <div class="text">今日新增商品数{{data.goodstoday}}</div>
                                </div>
                                <div class="item-right">
                                    <ul>
                                        <li>商品数：<span>{{data.goodstotal}}</span></li>
                                        <li>本周新增：<span>{{data.goodsweek}}</span></li>
                                        <li>本月新增：<span>{{data.goodsmon}}</span></li>
                                    </ul>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="7" class="logs">
                <div class="title">
                    <h2>操作日志</h2>
                    <span class="more">
                        <router-link to="/system/log/system-logs">查看更多<i class="el-icon-arrow-right"></i></router-link>
                    </span>
                </div>
                <div class="content">
                     <div class="info" v-for="(item, index) in logs" :key="index">
                        <div class="public-text">用户名: {{item.userName}}</div>
                        <div class="public-text">时间: {{item.time}}</div>
                        <div class="public-text font-limit-2">内容: {{item.content}}</div>
                    </div>
                </div>
                <el-pagination
                    layout="prev, pager, next"
                    :total="50">
                </el-pagination>
            </el-col>
        </el-row> -->
    </div>
</template>

<script>
import { getIndexData } from '@/api/getData'

export default {
    data () {
        return {
            data: {
                commission: {},
                order: {},
                orderMoney: {},
                pending: {},
                user: {},
                vip: {},
                withdrawal: {},
                all: {}
            },
            percentage: {
                user: 0,
                vip: 0,
                withdrawal: 0,
                order: 0,
                orderMoney: 0,
                commission: 0
            }
        }
    },
    mounted () {
        this.getIndexData()
    },
    methods: {
        async getIndexData () {
            let res = await getIndexData()
            if (res.code === 200) {
                this.data = res.data
                // 新增用户
                if (this.data.user.weekuser === 0) {
                    this.percentage.user = 0
                } else {
                    this.percentage.user = parseInt(parseInt(this.data.user.dayuser) / parseInt(this.data.user.weekuser) * 100)
                }
                // 新增会员
                if (this.data.vip.weekvip === 0) {
                    this.percentage.vip = 0
                } else {
                    this.percentage.vip = parseInt(parseInt(this.data.vip.dayvip) / parseInt(this.data.vip.weekvip) * 100)
                }
                // 提现
                if (this.data.withdrawal.weekwithdrawal === 0) {
                    this.percentage.withdrawal = 0
                } else {
                    this.percentage.withdrawal = parseInt(parseInt(this.data.withdrawal.daywithdrawal) / parseInt(this.data.withdrawal.weekwithdrawal) * 100)
                }
                // 下单
                if (this.data.order.weekorder === 0) {
                    this.percentage.order = 0
                } else {
                    this.percentage.order = parseInt(parseInt(this.data.order.dayorder) / parseInt(this.data.order.weekorder) * 100)
                }
                // 流水
                if (this.data.orderMoney.weekorderMoney === 0) {
                    this.percentage.orderMoney = 0
                } else {
                    this.percentage.orderMoney = parseInt(this.data.orderMoney.dayorderMoney / this.data.orderMoney.weekorderMoney * 100)
                }
                // 返现
                if (this.data.commission.weekcommission === 0) {
                    this.percentage.commission = 0
                } else {
                    this.percentage.commission = parseInt(parseInt(this.data.commission.daycommission) / parseInt(this.data.commission.weekcommission) * 100)
                }
                // 采购商
                // if (this.data.merchantweek === 0) {
                //     this.percentage.merchant = 0
                // } else {
                //     this.percentage.merchant = parseInt(this.data.merchantday / this.data.merchantweek)
                // }
                // 今日流水
                // if (this.data.orderweek === 0) {
                // this.percentage.order = 0
                // } else {
                // this.percentage.order = parseInt(this.data.orderday / this.data.orderweek)
                // }
                // 今日新增商品
                // if (this.data.goodsweek === 0) {
                // this.percentage.goods = 0
                // } else {
                // this.percentage.goods = parseInt(this.data.goodsday / this.data.goodsweek)
                // }
            }
        }
    }
}
</script>
<style lang="less">
@import "../../assets/less/define.less";
    .index-container{padding: @rem*36 @rem*58;background: #f5f5f5;
        .top{background: #fff; padding: 0 40px; padding-bottom: 50px;
            .title{height: 60px; line-height: 60px; font-size: 18px; color: #606266;}
            .content{display: flex; margin-top: 10px;
                .item{flex: 1; height: 151px; border-radius: 6px;
                    .name{padding: 8px 0 0 14px; color: #fff; font-size: 18px;}
                    .num{margin-top: 23px; text-align: center; font-size: 28px; color: #fff;}
                    &.t1{background: #8892f1; margin-right: 107px;}
                    &.t2{background: #bc8cf0; margin-right: 107px;}
                    &.t3{background: #ffa799; margin-right: 107px;}
                    &.t4{background: #8ac3fa;}
                }
            }
        }
        .index-title{font-size: 24px; margin-top: 38px; color: #606266;}
        .el-row{background-color: #fff;}
        .report{display: flex;
            .item{display: flex; flex: 1; background-color: #fff; padding-bottom: @rem*58; margin: @rem*32 0 0 @rem*106; border-radius: 5px; box-shadow: 2px 2px 2px #f5f7fa;
                .item-left{margin: @rem*46 0 0 @rem*36; font-size: 18px;
                    // .progress{}
                    .progress1{
                        .el-progress__text{color: #007cfc;}
                    }
                    .progress2{
                        .el-progress__text{color: #fcc488;}
                    }
                    .progress3{
                        .el-progress__text{color: #8a7cf2;}
                    }
                    .progress4{
                        .el-progress__text{color: #30c6aa;}
                    }
                    .el-progress__text{font-size: 20px!important;}
                    .el-progress-circle{width: @rem*184!important; height: @rem*184!important;}
                    .text{margin-top: @rem*16; text-align: center; color: #909399;}
                }
                .item-right{flex: 1; margin-left: @rem*44; margin-top: @rem*70;
                    ul{
                        li{margin-bottom: @rem*38; font-size: 18px; color: #909399;
                            span{color: #303113;}
                        }
                    }
                }
            }
        }
        /* 日志 */
        .logs{ height: 100%; padding: 0 @rem*20;background-color: #fff; border-left: 10px solid #f5f5f5;
            .title{display: flex; margin-top: @rem*16; line-height: @rem*60; color: #909399; border-bottom: 1px solid #eef0f3;
                h2{flex: 1; font-size: 18px;}
                .more{font-size: 14px; color: #007cfc;}
            }
            .content{
                .info{padding: @rem*10 @rem*4 @rem*22; border-bottom:1px solid #f5f5f5;
                    .public-text{margin-top: @rem*15; color:#909399;}
                }
            }
            .el-pagination{margin-top: @rem*30; padding-bottom: @rem*10;}
        }
        .data{padding: 40px; background: #fff; margin-top: 40px;
            .v-table{font-size: 14px;}
        }
    }
</style>
