<template>
  <div class="dashboard-container">
    <svg
      class="svg"
      :width="width"
      :height="height"
      :transform="`scale(${scale})`"
      data-type="svg"
      @mousemove="Moving"
      @mouseup="cancelDrag"
      @mousewheel.prevent="zoom"
    >
      <marker
        id="arrow"
        refX="4"
        refY="3"
        markerWidth="16"
        markerHeight="16"
        fill="#000"
        orient="auto"
      >
        <path d="M2,2 L2,5 L6,3 z" fill="#000" />
      </marker>
      <circle
        v-for="node in nodes"
        :key="node.uuid"
        class="svg-circle"
        r="25"
        :cx="node.x"
        :cy="node.y"
        fill="#38f"
        data-type="circle"
        :data-uuid="node.uuid"
        @mousedown="drag"
        @contextmenu.prevent="nodeMenu"
      />
      <text
        v-for="node in nodes"
        :key="node.uuid + new Date()"
        :x="node.x"
        :y="node.y"
      >
        {{ node.text }}
      </text>
      <line
        v-for="path in ships"
        :key="path.uuid"
        class="svg-line"
        :x1="path.source.x"
        :y1="path.source.y"
        :x2="path.target.x"
        :y2="path.target.y"
        data-type="line"
        style="stroke:rgb(66,66,66);stroke-width:4"
        marker-end="url(#arrow)"
      />
      <line
        v-if="isLinking"
        :x1="linkSource.x"
        :y1="linkSource.y"
        :x2="originX"
        :y2="originY"
        style="stroke:rgb(66,66,66);stroke-width:4"
      />
    </svg>
  </div>
</template>

<script>
import { nodes, ships } from './data'
import { initSize, initNodes, initNodesMap, initShips } from './init'
import { dragStart, dragging, dragOver, setNodeMenu, updateNodesFromMap, deleteNode, updateShips, movingLink, _zoom, checkThis } from './methods'
// import { getNodes } from './http'

export default {
  name: 'Dashboard',
  components: {

  },
  data() {
    return {
      width: 0,
      height: 0,
      nodes: [],
      ships: [],
      nodesMap: {},

      initSize: initSize, // init
      initNodes: initNodes,
      initNodesMap: initNodesMap,
      initShips: initShips,

      updateNodesFromMap: updateNodesFromMap,
      updateShips: updateShips,
      deleteNode: deleteNode,

      dragStart: dragStart, // drag
      dragging: dragging,
      dragOver: dragOver,

      movingLink: movingLink, // link
      isLinking: false,
      linkSource: null,

      originX: 0, // mousemove
      originY: 0,
      deltaX: 0,
      deltaY: 0,
      draggingNode: null,

      contextmenu: false,

      onZoom: _zoom, // zoom
      scale: 1,

      checkThis: checkThis // check this of the export function
    }
  },
  mounted() {
    // this.$loading({ target: '.dashboard-container' })
    this.checkThis()
    this.initSize()
    this.initNodes(nodes, ships)
    this.initNodesMap(this.nodes)
    this.initShips(ships)
    // getNodes().then(res => {
    //   this.initNodes(res.data.nodes, ships)
    //   this.initNodesMap(this.nodes)
    // })
    // this.cancelLoading
  },

  methods: {
    // tips
    openTip(title, type = 'success') {
      const h = this.$createElement

      this.$notify({
        title: title,
        message: h('i', { style: 'color: teal' }),
        type: type
      })
    },

    // subComponent event
    subDelete(uuid) {
      this.deleteNode(uuid)
    },

    // -----------drag---------
    drag(event) {
      // handle link
      if (this.isLinking) {
        const node = this.nodesMap[event.target.dataset.uuid]
        const ship = { source: this.linkSource, target: node }

        this.isLinking = false
        this.updateShips(this.ships, this.nodesMap, ship)

        // network end
        this.openTip('新建成功')

        return
      }
      // drag
      this.dragStart(event)
    },

    Moving(event) {
      if (this.isLinking) {
        this.movingLink(event)
        return
      }
      if (this.draggingNode && !this.contextmenu) {
        this.dragging(event)
      }
    },

    cancelDrag(event) {
      if (this.draggingNode) { this.dragOver() }
    },

    // --------contextmenu: deletenode  newlink ---------
    nodeMenu(event) {
      this.contextmenu = true
      this.draggingNode = null

      const uuid = event.target.dataset.uuid
      const node = this.nodesMap[uuid]

      const settings = [{

        label: '新建链接',
        onClick: () => {
          this.isLinking = true
          this.linkSource = node
          this.contextmenu = false
        } }, {

        label: '删除节点',
        onClick: () => {
          this.deleteNode(uuid)
          this.contextmenu = false
        } }, {
        label: '查看信息',
        onClick: () => {
          console.log(node)
        } }, {

        label: '取消',
        onClick: () => {
          this.contextmenu = false
        } }]

      setNodeMenu.call(this, event, settings) // 遗留了一个历史问题
      return false
    },

    // -------------zoom----------
    zoom(e) {
      this.onZoom(e)
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    overflow: visible;
    -webkit-user-select: none;
    display: flex;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.svg{
  z-index: 2;
  &-line{
    z-index: 1;
  }
  &-circle{
    z-index: 99;
  }
}
</style>
