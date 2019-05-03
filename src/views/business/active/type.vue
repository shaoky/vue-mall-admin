<template>
    <div class='articleIndex'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>活动位置管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-form :inline="true">
            <el-button type='primary' @click="edit(-1)">新建</el-button>
        </el-form>
        <el-table border :data="list">
            <el-table-column label="活动标题" prop="title"></el-table-column>
            <el-table-column label="活动描述" prop="depict"></el-table-column>
            <el-table-column label="活动标识" prop="mark"></el-table-column>
            <el-table-column label="活动排序" prop="gapSort"></el-table-column>
            <el-table-column label="活动状态" prop="isOpen">
                <template slot-scope="scope">{{scope.row.isOpen | getIsOpenNumber}}</template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                   <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                   <el-button type="text" @click="del(scope.row.gapId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--分页!-->
        <pagination @handleCurrentChange='handleCurrentChange' @handleSizeChange="handleSizeChange"  :total="page.total"></pagination>
        <!--新增弹框!-->
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="活动标题：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="活动描述：">
                    <el-input v-model="form.depict"></el-input>
                </el-form-item>
                <el-form-item label="活动标识：">
                    <el-input v-model="form.mark"></el-input>
                </el-form-item>
                <el-form-item label="活动排序：">
                    <el-input v-model="form.gapSort"></el-input>
                </el-form-item>
                <el-form-item label="活动状态：">
                    <input type="radio" id="one" value="0" v-model="form.isOpen">
                    <label for="one">未开启</label>
                    <input type="radio" id="two" value="1" v-model="form.isOpen">
                    <label for="two">开启</label>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import { getActivePostionList, addActivePosition, updateActivePosition, delActivePosition } from '@/api/getData'
import status from '@/mixins/status'
import pagination from '@/components/pagination'
export default {
    mixins: [status],
    data () {
        return {
            list: [],
            page: {
                total: 20
            },
            fatherId: 0,
            dialogVisible: false,
            form: {}
        }
    },
    mounted () {
        this.getActivePostionList()
    },
    methods: {
        async getActivePostionList () {
            let res = await getActivePostionList(this.search)
            this.list = res.data.list
            this.page.total = res.data.count
        },
        handleCurrentChange (val) {
            this.form.page = val
            this.getActivePostionList()
        },
        handleSizeChange (val) {
            this.form.size = val
            this.getActivePostionList()
        },
        del (index) {
            console.log(index)
            this.$confirm('确认删除吗？').then(
                async () => {
                    try {
                        await delActivePosition({gapId: index})
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    } catch (err) {
                        console.log(err)
                    }

                    this.getActivePostionList()
                }
            )
        },
        // edit (index) {
        //     // -1 为新建
        //     this.form = {}
        //     this.dialogVisible = true
        //     if (index === -1) {
        //         this.isAdd = true
        //         // this.form.gapId = this.fatherId
        //     } else {
        //         this.isAdd = false
        //         this.form = JSON.parse(JSON.stringify(this.list[index]))
        //         if (this.form.isOpen === 0) {
        //             this.form.isOpen = false
        //         } else if (this.form.isOpen === 1) {
        //             this.form.isOpen = true
        //         }
        //     )
        // },
        edit (index) {
            // -1 为新建
            this.form = {}
            this.dialogVisible = true
            if (index === -1) {
                this.isAdd = true
                // this.form.gapId = this.fatherId
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
                try {
                    let res = await addActivePosition(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getActivePostionList()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res = await updateActivePosition(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getActivePostionList()
                    }
                } catch (err) {}
            }
        }
    },
    components: {
        pagination
    }
}
</script>
