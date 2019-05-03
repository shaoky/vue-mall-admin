<template>
    <div class="components-ueditor">
        <script id="editor" type="text/plain"></script>
    </div>
</template>

<script>
import '../../static/ueditor/ueditor.config.js'
import '../../static/ueditor/ueditor.all.min.js'
import '../../static/ueditor/lang/zh-cn/zh-cn.js'
import '../../static/ueditor/ueditor.parse.min.js'
import '../../static/ueditor/themes/default/css/ueditor.min.css'

export default {
    data () {
        return {
            default: {
                autoHeightEnabled: false,
                autoFloatEnabled: true, // 是否工具栏可浮动
                initialContent: '请输入内容', // 初始化编辑器的内容,也可以通过textarea/script给值，看官网例子
                autoClearinitialContent: false, // 是否自动清除编辑器初始内容，注意：如果focus属性设置为true,这个也为真，那么编辑器一上来就会触发导致初始化的内容看不到了
                initialFrameWidth: '60%',
                initialFrameHeight: 500,
                BaseUrl: '',
                UEDITOR_HOME_URL: 'static/ueditor/'
            }
        }
    },
    props: {
        config: {
            type: Object
        }
    },
    mounted () {
        let config = {...this.default, ...this.config}
        this.editor = window.UE.getEditor('editor', config) // 初始化UE
    },
    methods: {
        getUEContent () {
            return this.editor.getContent()
        }
    },
    destoryed () {
        this.editor.destory()
    }
}
</script>

<style lang="less">
.ueditor-box{
    .el-form-item__content{line-height: normal!important;}
}
</style>
