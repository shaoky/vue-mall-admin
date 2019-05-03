<template>
    <div class="article-classify">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>前台业务</el-breadcrumb-item>
            <el-breadcrumb-item>广告管理</el-breadcrumb-item>
            <el-breadcrumb-item>广告位置管理</el-breadcrumb-item>
        </el-breadcrumb>

        <el-form :inline="true">
            <el-button type="primary" @click="edit(-1)">新建位置</el-button>
        </el-form>

        <el-table border :data="list" class="mt20">
            <el-table-column label="广告位名称" prop="title"></el-table-column>
            <el-table-column label="广告位描述" prop="desc"></el-table-column>
            <el-table-column label="广告位宽度" prop="width"></el-table-column>
            <el-table-column label="广告位高度" prop="height"></el-table-column>
            <el-table-column label="广告位标识码" prop="mark"></el-table-column>
            <el-table-column label="状态" prop="isOpen">
                <template slot-scope="scope">{{ list[scope.$index].isOpen | getIsOpenNumber }}</template>
            </el-table-column>
            <!-- <el-table-column label="分类位置" prop="">
                <template slot-scope="scope">{{ list[scope.$index].position | getPosition }}</template>
            </el-table-column> -->
            <el-table-column label="操作" width="150px;">
                <template slot-scope="scope">
                    <el-button type="text" @click="edit(scope.$index)">编辑</el-button>
                    <el-button type="text" @click="del(scope.row.positionId)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <!-- <pagination @handleCurrentChange='handleCurrentChange' :total="page.total"></pagination> -->
        <el-dialog title="新增/编辑" :visible.sync="dialogVisible" width="30%" center>
            <el-form label-width="120px">
                <el-form-item label="广告位名称：">
                    <el-input v-model="form.title"></el-input>
                </el-form-item>
                <el-form-item label="广告位描述：">
                    <el-input v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item label="广告位宽度：">
                    <el-input v-model.number="form.width"></el-input>
                </el-form-item>
                <el-form-item label="广告位高度：">
                    <el-input v-model.number="form.height"></el-input>
                </el-form-item>
                <el-form-item label="广告位标识码：">
                    <el-input v-model="form.mark"></el-input>
                </el-form-item>
                <el-form-item label="启用状态：">
                    <el-checkbox v-model="form.isOpen"></el-checkbox>
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
import { getAdPositionList, delAdPosition, addAdPosition, updateAdPosition } from '@/api/getData'
import pagination from '@/components/pagination'
import status from '@/mixins/status'

export default {
    mixins: [status],
    data () {
        return {
            isAdd: true,
            fatherId: '',
            form: {},
            list: [ ],
            dialogVisible: false,
            // page: {
            //     total: 1
            // },
            position: [
                {label: '系统公告', value: 1}, {label: '使用指南', value: 2}, {label: '常见问题', value: 3}
            ]
        }
    },
    mounted () {
        this.getAdPositionList()
    },
    methods: {
        async getAdPositionList () {
            let res = await getAdPositionList()

            this.list = res.data.list
            // this.fatherId = res.data.id
        },
        del (id) {
            this.$confirm('确认删除此分类吗？').then(
                async () => {
                    try {
                        await delAdPosition({positionId: id})
                        this.$notify({
                            title: '成功',
                            message: '删除成功',
                            type: 'success'
                        })
                    } catch (err) {
                        console.log(err)
                    }

                    this.getAdPositionList()
                }
            )
        },
        edit (index) {
            // -1 为新建
            this.form = {}
            this.dialogVisible = true
            if (index === -1) {
                this.isAdd = true
                this.form.id = this.fatherId
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
        // handleCurrentChange (val) {
        //     this.form.page = val
        //     this.getAdPositionList()
        // },
        async submit () {
            if (this.form.isOpen) {
                this.form.isOpen = 1
            } else {
                this.form.isOpen = 0
            }
            if (this.isAdd) {
                // console.log(this.form)
                try {
                    let res = await addAdPosition(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '添加成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getAdPositionList()
                    }
                } catch (err) {}
            } else {
                // console.log(this.form)
                try {
                    let res = await updateAdPosition(this.form)
                    if (res.code === 200) {
                        this.$notify({
                            title: '成功',
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.dialogVisible = false
                        this.getAdPositionList()
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

<style scoped lang="less">
.article-classify{
    // .dialogContainer{
    //     width:400px;margin:0 auto;padding-left:33px;
    // }
}
</style>
