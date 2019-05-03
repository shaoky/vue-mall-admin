<template>
  <div class="merchants">
    <el-form :inline="true">
      <el-form-item label="搜索:">
        <el-input v-model="form.text" placeholder="请输入搜索内容"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="list">
      <el-table-column
        prop="username"
        label="登录名"></el-table-column>
      <el-table-column
        prop="name"
        label="企业名称"></el-table-column>
      <el-table-column
      prop="manager"
      label="联系人"></el-table-column>
      <el-table-column
        prop="managerTel"
        label="联系电话"></el-table-column>
      <el-table-column
        prop="region"
        label="企业所在区域"></el-table-column>
      <el-table-column
        prop="address"
        label="详细地址"></el-table-column>
      <el-table-column
        prop="created"
        label="录入时间"></el-table-column>
      <el-table-column
        prop=""
        label="审核时间"></el-table-column>
      <el-table-column
        prop=""
        label="关联采购商"></el-table-column>
      <el-table-column
        prop=""
        label="平台审核状态"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="toEdit(scope.$index)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination v-if="visible" class="pagination"
      :current-page="currentPage"
      :page-sizes="[20, 40, 60, 80, 100]"
      :page-size="20"
      layout="total, sizes, prev, pager, next, jumper"
      :total="list.length">
    </el-pagination>
  </div>
</template>

<script>
export default {
    name: 'merchants',
    data () {
        return {
            form: {}, // 请求列表参数
            list: [],
            currentPage: 1,
            visible: false
        }
    },
    mounted () {
        this.$store.commit(this.types.MSetTitle, '采购商')
    },
    methods: {
        getList () {
            // console.log(this.form)
            this.http.get('/merchants', this.form).then(
                res => {
                    // console.log(res)
                    this.list = res.data.merchants
                    // console.table(this.list)
                    this.visible = true
                }
            )
        },
        toEdit (index) {
            // console.log(this.list[index].id)
            this.$router.push({name: 'merchantsEdit', params: {id: this.list[index].id}})
        }
    }
}
</script>
<style lang="less">
  .pagination{display:flex;justify-content: center;margin-top:40px;}
</style>
