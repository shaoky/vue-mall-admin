var DatetimePick = {
    data () {
        return {
            timePickOptions: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - (start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds()) * 1000)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '昨天',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - (start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds()) * 1000 - 3600 * 1000 * 24 * 1)
                            end.setTime(start.getTime() + 3600 * 1000 * 24 * 1 - 1 * 1000)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一周',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '最近一个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '这个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            start.setTime(start.getTime() - (start.getDate() - 1) * 3600 * 1000 * 24 - (start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds()) * 1000)
                            picker.$emit('pick', [start, end])
                        }
                    }, {
                        text: '上个月',
                        onClick (picker) {
                            const end = new Date()
                            const start = new Date()
                            // start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                            end.setTime(start.getTime() - (start.getDate() - 1) * 3600 * 1000 * 24 - (start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds()) * 1000 - 1 * 1000)
                            start.setTime(end - new Date(end).getDate() * 3600 * 1000 * 24 + 1 * 1000)
                            picker.$emit('pick', [start, end])
                        }
                    }
                ]
            }
        }
    }
}

export default DatetimePick
