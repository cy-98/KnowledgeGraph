<template>
  <div class="dashboard-container">
    <svg :width="width" :height="height" @mouseup="dragOver" @click="cancelLink" @mousemove="dragging" :transform="`scale(${scale})`" @mousewheel="zoom">
      <line
        v-for="(path) in pathes" 
        :path="path"
        :x1="path.source.x"
        :y1="path.source.y"
        :x2="path.target.x"
        :y2="path.target.y"
        style="stroke:rgb(0,0,0);stroke-width:2"
        marker-end="url(#arrow)"
      />
      <marker
        id="arrow"
        refX="20"
        refY="3"
        markerWidth="26"
        markerHeight="16"
        fill="#000"
        orient="auto"
      >
        <path d="M0,0 L0,6 L9,3 z" fill="#f00" />
      </marker>
      <line
        v-if="newLink.IsLinking"
        :x1="newLink.source.x"
        :y1="newLink.source.y"
        :x2="newLink.event.x"
        :y2="newLink.event.y"
        style="stroke:#38f;stroke-width:2"
      />
      <circle
        class="svg-circle"
        v-for="(item) in dataset"
        r="25"
        :cx="item.x"
        :cy="item.y"
        :data-index="item.index"
        fill="#38f"
        @mousedown="dragStart"
        @click="click"
        @contextmenu.prevent="onContextmenu"
      />
      <text
        class="svg-text circle-text"
        v-for="(name) in dataset"
        :x="name.x"
        :y="name.y"
      >{{ name.name }}</text>
      <text
        v-if="mid.text"
        class="svg-text line-text"
        v-for="(mid) in pathes"
        :x="(mid.source.x + mid.target.x) / 2"
        :y="(mid.source.y + mid.target.y) / 2"
      >{{ mid.text }}</text>
    </svg>
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'
// import * as d3 from 'd3'
import { nodes, ships } from './data'
import { getSize, getSimulation } from './utild3'
import { _cancelLink } from './events'

let originX = 0
let originY = 0
let deltaX = 0
let deltaY = 0 // 拖拽位置计算

export default {
  name: 'Dashboard',
  data() {
    return {
      width: 0,
      height: 0,

      // 结点及关系
      ships, // source 和 target 的关系
      dataset: [], // 结点关系
      pathes: [], // svg-line的路径

      // 模型
      simulation: null,

      // 拖拽属性
      dragingNode: null,
      IsDragging: false,

      // 缩放比例
      scale: 1,

      // 新建链接
      newLink: {
        IsLinking: false,
        source: null,
        target: null,
        event: {}
      }
    }
  },
  watch: {
    dataset: function() {
      const pathes = []

      const ships = this.ships || ships
      const nodes = this.dataset || nodes

      ships.forEach(ship => {
        const IDsource = ship.source
        const IDtarget = ship.target

        const source = nodes.find((n) => (n.uuid === IDsource))
        const target = nodes.find((n) => (n.uuid === IDtarget))

        if (!source || !target) { return } // 任意目标或源节点没有被找到则忽略

        const path = {
          source: source,
          target: target
        }
        path.text = ship.text ? ship.text : ''
        pathes.push(path)
      })

      this.pathes = pathes
    }
  },
  mounted() {
    /** init
     * @width
     * @height 画布宽高
     * @simulation  力学模型
     * @_ships 初始结点关系
     * @_nodes 初始结点
     * @pathes 结点路径
     */

    const { width, height } = getSize() // clientwidth clientheight
    this.width = width
    this.height = height

    /** 定义d3结点*/
    const _charge = true
    const simulation = getSimulation(nodes, width, height, _charge) // 初始化模型
    this.simulation = simulation
    this.dataset = simulation.nodes()
  },
  methods: {
    onContextmenu(event) {
      this.IsDragging = false
      const node = this.dataset[event.target.dataset.index]
      this.$contextmenu({
        items: [
          {
            label: '新建链接',
            onClick: () => {
              this.newLink.source = node
              this.newLink.event = { x: event.offsetX, y: event.offsetY }
              this.newLink.IsLinking = true
            }
          }
        ],
        event,
        customClass: 'class-a',
        zIndex: 99,
        minWidth: 200
      })

      return false
    },

    click(event) {
      if (this.IsDragging) { return false }

      if (this.newLink.IsLinking) {
        const target = this.dataset[event.target.dataset.index]
        const source = this.newLink.source

        if (target === source) { // 不能连接自己
          this.newLink = _cancelLink()
          console.log(this.newLink)
          return
        }

        this.newLink.target = target

        this.ships.push({ // 添加结点关系
          source: source.uuid,
          target: target.uuid
        })
        this.pathes.push({
          source: source,
          target: target
        })

        this.newLink = _cancelLink()
      }
    },

    cancelLink() {
      this.newLink = _cancelLink()
    },

    // 拖拽
    dragStart(e) {
      if (!this.IsDragging) {
        this.IsDragging = true
        originX = e.clientX
        originY = e.clientY
        const index = e.target.dataset.index
        const selectNode = this.dataset[index]
        this.dragingNode = selectNode
      }
    },

    dragging(e) {
      if (this.IsDragging) {
        deltaX = e.clientX - originX
        deltaY = e.clientY - originY

        this.dragingNode.x = this.dragingNode.x + deltaX / this.scale // 放大后：移动的距离要除以放大的比例
        this.dragingNode.y = this.dragingNode.y + deltaY / this.scale

        originX = e.clientX // 为下一刻的移动更新鼠标偏移量
        originY = e.clientY

        return
      }

      if (this.newLink.IsLinking) {
        this.newLink.event = { x: e.offsetX, y: e.offsetY } // 获取鼠标坐标
      }
    },

    dragOver(e) {
      const charge = false // 不添加相互作用力
      if (this.dragingNode) {
        this.dragingNode.fx = null
        this.dragingNode.fy = null
      }

      this.dragingNode = null
      this.IsDragging = false

      this.simulation = getSimulation(this.dataset, this.width, this.height, charge)
      this.dataset = this.simulation.nodes()
    },

    // 滚动缩放
    zoom(e) {
      this.scale += e.deltaY * 0.008
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    overflow: visible;
    -webkit-user-select: none;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.svg{
  &-text{
    z-index: -1;
  }
  &-circle{
    z-index: 99;
  }
}
</style>
