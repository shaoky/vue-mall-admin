<template>
  <div class="articleInfo">
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>前台业务</el-breadcrumb-item>
        <el-breadcrumb-item>文章管理</el-breadcrumb-item>
        <el-breadcrumb-item>文章详情</el-breadcrumb-item>
    </el-breadcrumb>
      <el-form label-width="120px">
          <el-form-item label="标题：">
              <el-input style="width:300px;" v-model="form.title"></el-input>
          </el-form-item>
          <!-- <el-form-item label="时间：">
              <el-date-picker v-model="form.expire" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item> -->
          <!-- <el-form-item label="作者：">
              <el-input style="width:300px;" v-model="form.auther"></el-input>
          </el-form-item> -->
          <el-form-item label="状态：" >
              <el-select v-model="form.state">
                  <el-option v-for="(item,index) in status" :key="index" :label="item.label" :value="item.value"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="分类：">
              <el-select v-model="form.catID">
                  <el-option v-for="(item,index) in classify" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="区域：">
              <region @handleChange="getRegion" :selected="region"></region>
          </el-form-item>
          <el-form-item label="封面：">
                <el-upload class="avatar-uploader" action="https://api.jsojs.com/admin/upload/public" :show-file-list="false" :on-success="upSuccessLicense">
                    <img v-if="form.imageURL" :src="form.imageURL" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item label="内容：" class="ueditor-box">
              <ueditor ref="ue" :config="config"></ueditor>
          </el-form-item>
          <div class="btn">
              <el-button type="primary" @click="onSubmit">保存</el-button>
              <el-button type="primary">删除</el-button>
          </div>
      </el-form>
  </div>
</template>

<script>
import { getCategories, addArticles, editArticles, getArticlesInfo } from '@/api/getData'
import ueditor from '@/components/ueditor'
import region from '@/components/common/region'

export default {
    data () {
        return {
            id: null,
            isAdd: true,
            form: {
                expire: '',
                imageURL: ''
            },
            classify: [], // 保存获取到的所有分类
            status: [
                {label: '已发布', value: 'published'}, {label: '未发布', value: 'draft'}
            ],
            value: '',
            config: {
                initialContent: '111111'
            },
            seleted: [],
            region: [],
            dialogImageUrl: '',
            dialogVisible: false
        }
    },
    mounted () {
        this.getCategories()
        // -1为新增
        if (this.$route.query.id == -1) {
            this.isAdd = true
        } else {
            this.id = parseInt(this.$route.query.id)
            this.getArticlesInfo({id: this.id})
            this.isAdd = false
        }
    },
    methods: {
        // 获取文章所有分类
        async getCategories () {
            let res = await getCategories()
            this.classify = res.data.items
            console.log(res)
        },
        // 获取文章详情
        async getArticlesInfo () {
            let res = await getArticlesInfo({id: this.id})
            console.log(res)
            this.form = res.data
            this.region.push(this.form.region.slice(0, 2) + '000000', this.form.region.slice(0, 4) + '0000', this.form.region)
            console.log(this.region)
        },
        async onSubmit () {
            const a = this.$refs.ue.getUEContent()
            this.form.content = a
            console.log(this.form)
            console.log(this.isAdd)
            if (!this.form.title) {
                this.$notify({
                    title: '警告',
                    message: '请填写标题',
                    type: 'danger'
                })
                return
            }
            if (!this.form.catID) {
                this.$notify({
                    title: '警告',
                    message: '请选择分类',
                    type: 'danger'
                })
                return
            }
            if (!this.form.state) {
                this.$notify({
                    title: '警告',
                    message: '请选择状态',
                    type: 'danger'
                })
                return
            }
            if (!this.form.region) {
                this.$notify({
                    title: '警告',
                    message: '请选择区域',
                    type: 'danger'
                })
                return
            }
            if (this.isAdd) {
                let res = await addArticles(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: '添加成功',
                        type: 'success'
                    })
                    this.$router.push({path: 'index'})
                }
            } else {
                let res = await editArticles(this.form)
                if (res.code === 200) {
                    this.$notify({
                        title: '成功',
                        message: '修改成功',
                        type: 'success'
                    })
                    this.$router.push({path: 'index'})
                }
            }
            this.form = {}
        },
        // 上传封面
        upSuccessLicense (res) {
            this.form.imageURL = res.data.url
        },
        getRegion (val) {
            this.form.region = val
        }
    },
    components: {
        ueditor,
        region
    }
}
</script>

<style scoped lang="less">

.btn{padding-left:120px;}
</style>
