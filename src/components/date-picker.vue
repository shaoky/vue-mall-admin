<template>
    <div class="datePicker-components">
        <el-date-picker
            v-model="timeRange"
            @change="timePick"
            type="datetimerange"
            :picker-options="timePickOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right">
        </el-date-picker>
    </div>
</template>

<script>
import DatetimePick from '@/mixins/DatetimePick'
export default {
    mixins: [DatetimePick],
    data () {
        return {
            timeRange: []
        }
    },
    props: {
        time: {
            type: Array,
            required: false
        }
    },
    watch: {
        time (val, old) {
            this.timeRange = val
        }
    },
    mounted () {
        // console.log(this.time)
        this.timeRange = this.time
    },
    methods: {
        timePick () {
            let arr = this.timeRange
            if (arr) {
                let date = arr.map((val) => {
                    return parseInt(val.getTime() / 1000)
                })
                this.$emit('timePick', date)
            }
        },
        // 清楚时间、父组件调用
        clearData () {
            this.timeRange = []
        }
    }
}
</script>

<style scoped lang="less">

</style>
