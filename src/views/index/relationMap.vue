<template>
    <div class="index-container1">
        <div class="top">
            <div id="tree" ref="tree" style="float:left; width: 100%; height: 100px;"></div>
        </div>
    </div>
</template>

<script>
import { getRelationMap } from '@/api/getData'
import * as d3 from 'd3'

export default {
    data () {
        return {
            data: {},
            userList: []
        }
    },
    mounted () {
        this.getRelationMap()
    },
    methods: {
        async getRelationMap () {
            let res = await getRelationMap()
            if (res.code === 200) {
                this.userList = res.data.userList
                this.getTree()
            }
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
                    // this.getUserChildrenMemberInfo(d.data.userId)
                    this.$router.push({name: 'memberInfo', params: {userId: d.data.userId}})
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

            return svg.node()
        }
    }
}
</script>
<style lang="less">
@import "../../assets/less/define.less";
    .index-container1{padding-bottom: 50px;}
</style>
