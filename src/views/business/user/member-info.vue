<template>
    <div class="purchaser">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.meta.title}}</el-breadcrumb-item>
        </el-breadcrumb>
       <el-table :data="options" class="mt20" border>
            <el-table-column label="基础信息">
                <template slot-scope="scope">
                    <el-form label-position="left" inline style="margin-left:20px;color:#999">
                        <el-form-item label="用户名称：">{{memberInfo.userName}}</el-form-item>
                        <el-form-item label="用户编号：">{{memberInfo.userNo}}</el-form-item>
                        <el-form-item label="用户手机：">{{memberInfo.userPhone}}</el-form-item>
                        <el-form-item label="用户等级">{{memberInfo.userType | getUserTypeName}}</el-form-item>
                        <el-form-item label="上级名称：">{{memberInfo.superiorName}}</el-form-item>
                        <el-form-item label="上级id：">{{memberInfo.superiorNo}}</el-form-item>
                        <el-form-item label="最后登录时间：">{{memberInfo.lastTime | getTime}}</el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="资金信息">
                <template slot-scope="scope">
                    <el-form label-position="left" inline style="margin-left:20px;color:#999">
                        <el-form-item label="团队用户消费总金额：">{{memberInfo.userExpenseAmount}}元（注：结算后金额）</el-form-item>
                        <el-form-item label="团队返现总金额：">{{memberInfo.userCashBackAmount}}元（注：结算后佣金）</el-form-item>
                        <el-form-item label="冻结金额：">{{memberInfo.freezeAmount}}元（注：支付后，未确认订单）</el-form-item>
                        <el-form-item label="可提现金额：">{{memberInfo.withdrawalAmount}}元（注：结算后，可提现）</el-form-item>
                        <el-form-item label="不可提现金额：">{{memberInfo.noWithdrawalAmount}}元（注：确认后，正在结算周期）</el-form-item>
                        <el-form-item label="已提现总金额：">{{memberInfo.withdrawalAmountCount}}元</el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column label="团队信息">
                <template slot-scope="scope">
                    <el-form label-position="left" inline style="margin-left:20px;color:#999">
                        <el-form-item label="直属：">{{memberCount}}人</el-form-item>
                        <el-form-item label="团队：">{{memberTeamCount || 0}}人</el-form-item>
                    </el-form>
                </template>
            </el-table-column>
        </el-table>
        <br/>
        <div id="main" style="width: 50%;height:400px; float:left;"></div>
        <div style="width: 50%;padding: 150px 0 0 200px; line-hegiht: 35px; font-size: 14px; float:left">
            <table class="v-table">
                <tr>
                    <th>商品佣金</th>
                    <th>邀请佣金</th>
                    <th>分享佣金</th>
                    <th>团队佣金</th>
                    <th>总佣金</th>
                </tr>
                <tr>
                    <td>{{commission.shop || 0}}</td>
                    <td>{{commission.invitation || 0}}</td>
                    <td>{{commission.share || 0}}</td>
                    <td>{{commission.team || 0}}</td>
                    <td>{{commission.count || 0}}</td>
                </tr>
            </table>
        </div>
        <div class="clear"></div>
        <br/>
        <h3 style="font-size: 18px;">用户关系图</h3>
        <!-- <br/> -->
        <!-- <div id="main1" style="width: 100%;float:left; margin-top: 50px;" :style="{height: this.height + 'px'}" v-if="height"></div> -->
        <div id="tree" ref="tree" style="float:left; width: 100%; height: 100px;"></div>
        <el-dialog
            title="用户信息"
            :visible.sync="userVisible"
            width="1200px"
            center>
            <div class="edit">
                <table class="v-table">
                    <tr>
                        <th>用户昵称</th>
                        <th>用户手机</th>
                        <th>商品佣金</th>
                        <th>邀请佣金</th>
                        <th>分享佣金</th>
                        <th>团队佣金</th>
                        <th>总佣金</th>
                    </tr>
                    <tr>
                        <td>{{childrenUserInfo.user.userName}}</td>
                        <td>{{childrenUserInfo.user.userPhone}}</td>
                        <td>{{childrenUserInfo.commission.shop || 0}}</td>
                        <td>{{childrenUserInfo.commission.invitation || 0}}</td>
                        <td>{{childrenUserInfo.commission.share || 0}}</td>
                        <td>{{childrenUserInfo.commission.team || 0}}</td>
                        <td>{{childrenUserInfo.commission.count || 0}}</td>
                    </tr>
                </table>
                <el-table :data="childrenUserInfo.orderList" border class="mt20">
                    <el-table-column label="订单号" prop="orderNo" width="200"></el-table-column>
                    <el-table-column label="订单类型">
                        <template slot-scope="scope">
                            {{scope.row.orderStatus | orderStatusName}}
                        </template>
                    </el-table-column>
                    <el-table-column label="收货人" prop="userName"></el-table-column>
                    <el-table-column label="订单金额" prop="totalMoney"></el-table-column>
                    <el-table-column label="应付金额" prop="payableMoney"></el-table-column>
                    <el-table-column label="实付金额" prop="payMoney"></el-table-column>
                    <el-table-column label="返现金额" prop="">
                        <template slot-scope="scope">
                            {{scope.row.commissionMoney || 0}}
                        </template>
                    </el-table-column>
                    <el-table-column label="下单时间">
                        <template slot-scope="scope">
                            {{scope.row.createTime | getTime}}
                        </template>
                    </el-table-column>
                    <el-table-column label="支付时间">
                        <template slot-scope="scope">
                            {{scope.row.paymentTime | getTime}}
                        </template>
                    </el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button @click="$router.push({name: 'orderInfo', params: {orderId: scope.row.orderId}})" type="text" >订单详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <!-- <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange" :total="count"></pagination> -->
            </div>
            <span slot="footer" class="dialog-footer">
                <!-- <el-button @click="userVisible = false">取 消</el-button> -->
                <el-button type="primary" @click="userVisible = false">关 闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { getUserMemberInfo, getUserChildrenMemberInfo } from '@/api/getData'
import echarts from 'echarts'
import * as d3 from 'd3'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            height: null,
            userId: null,
            options: [{a: 1}],
            memberInfo: {},
            commission: {},
            option: {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['黄金人数', '白金人数', '钻石人数'],
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '人数',
                        type: 'bar',
                        barWidth: '60%',
                        data: []
                    }
                ]
            },
            memberCount: null,
            memberTeamCount: null,
            userList: [],
            userVisible: false,
            childrenUserInfo: {
                user: {},
                commission: {},
                orderList: []
            }
        }
    },
    mounted () {
        this.userId = this.$route.params.userId
        this.getUserMemberInfo()
        // this.getTree()
        // this.getData()
        // this.getCartList()
        // this.addCart()
    },
    methods: {
        // async getCartList () {
        //     let res = await getCartList()
        // },
        // async addCart () {
        //     await addCart()
        // },
        async getUserMemberInfo () {
            let res = await getUserMemberInfo({userId: this.userId})
            this.memberInfo = res.data.info
            this.commission = res.data.commission
            this.memberCount = res.data.memberCount
            this.userList = res.data.userList
            this.memberTeamCount = res.data.memberTeamCount
            const myChart = echarts.init(document.getElementById('main'))
            this.option.series[0].data.push(
                res.data.memberTeamCount
            )
            this.option.series[0].data.push(
                res.data.managerCount
            )
            this.option.series[0].data.push(
                res.data.majordomoCount
            )
            // this.option.series[0].data[1].value = this.memberInfo.managerCount
            // this.option.series[0].data[1].name = '经理人数'
            // this.option.series[0].data[2].value = this.memberInfo.majordomoCount
            // this.option.series[0].data[2].name = '总监人数'
            myChart.setOption(this.option)
            this.getTree()
        },
        async getUserChildrenMemberInfo (uesrChildrenId) {
            let res = await getUserChildrenMemberInfo({userId: this.userId, userChildrenId: uesrChildrenId})
            this.childrenUserInfo = res.data
            this.userVisible = true
        },
        tree (data) {
            let width = 932
            const root = d3.hierarchy(data)
                .sort((a, b) => (a.height - b.height) || a.data.name.localeCompare(b.data.name))
            root.dx = 18
            root.dy = width / (root.height + 1)
            return d3.cluster().nodeSize([root.dx, root.dy])(root)
        },
        getTree () {
            let width = 932
            const root = this.tree(this.userList)

            let x0 = Infinity
            let x1 = -x0
            root.each(d => {
                if (d.x > x1) x1 = d.x
                if (d.x < x0) x0 = d.x
            })

            const svg = d3.select(this.$el)
                .append('svg')
                .style('width', width)
                .style('height', x1 - x0 + root.dx * 2)
                // .append('rect')
            // var circle = svg.append('circle')
            //     .attr('cx', 100)
            //     .attr('cy', 100)
            //     .attr('r', 45)
            //     .style('fill', 'green')

            const g = svg.append('g')
                .attr('font-family', 'sans-serif')
                .attr('font-size', 14)
                .attr('transform', `translate(${root.dy / 3},${root.dx - x0})`)

            // g.on('click', function (d) {
            //     console.log(d)
            //     // 添加交互内容
            // })
            const link = g.append('g')
                .attr('fill', 'none')
                .attr('stroke', '#555')
                .attr('stroke-opacity', 0.4)
                .attr('stroke-width', 1.5)
                .selectAll('path')
                .data(root.links())
                .enter().append('path')
                .attr('d', d => `
        M${d.target.y},${d.target.x}
        C${d.source.y + root.dy / 2},${d.target.x}
         ${d.source.y + root.dy / 2},${d.source.x}
         ${d.source.y},${d.source.x}
      `)

            const node = g.append('g')
                .attr('stroke-linejoin', 'round')
                .attr('stroke-width', 3)
                .selectAll('g')
                .data(root.descendants().reverse())
                .enter().append('g')
                .attr('transform', d => `translate(${d.y},${d.x})`)
                .on('click', (d) => {
                    this.getUserChildrenMemberInfo(d.data.userId)
                    console.log(d)
                })

            node.append('circle')
                .attr('fill', d => d.children ? '#555' : '#999')
                .attr('r', 2.5)

            node.append('text')
                .attr('dy', '0.31em')
                .attr('x', d => d.children ? -6 : 6)
                .attr('userId', d => d.size)
                .text(d => d.data.name)
                .filter(d => d.children)
                .attr('text-anchor', 'end')
                .clone(true).lower()
                .attr('stroke', 'white')

            // d3.selectAll('node').on('click', (data) => {
            //     let thisDom = d3.select(this)
            //     console.log(data)
            //     // console.log(thisDom.arrt('userId'))
            // })
            return svg.node()

            // const myChart = echarts.init(document.getElementById('main1'))
            // myChart.setOption({
            //     tooltip: {
            //         trigger: 'item',
            //         triggerOn: 'mousemove'
            //     },
            //     series: [
            //         {
            //             type: 'tree',

            //             data: [this.option1],

            //             top: '1%',
            //             left: '7%',
            //             bottom: '1%',
            //             right: '20%',

            //             symbolSize: 7,

            //             label: {
            //                 normal: {
            //                     position: 'left',
            //                     verticalAlign: 'middle',
            //                     align: 'right',
            //                     fontSize: 14
            //                 }
            //             },

            //             leaves: {
            //                 label: {
            //                     normal: {
            //                         position: 'right',
            //                         verticalAlign: 'middle',
            //                         align: 'left'
            //                     }
            //                 }
            //             },

            //             expandAndCollapse: true,
            //             animationDuration: 550,
            //             animationDurationUpdate: 750
            //         }
            //     ]
            // })
        }
    },
    components: {
    }
}
</script>

<style scoped lang="less">
    .purchaser{
        .el-form-item{margin-bottom:2px;width:100%;}
    }
</style>
