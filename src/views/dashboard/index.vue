<template>
  <div class="dashboard-container">
    <svg
      :width="width"
      :height="height"
      :transform="`scale(${scale})`"
      data-type="svg"
      @mousemove="Moving"
      @mouseup="cancelDrag"
      @mousewheel="zoom"
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
        fill="#f38"
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
  <Manager />
  </div>
</template>

<script>
import { nodes, ships } from './data'
import { initSize, initNodes, initNodesMap, initShips } from './init'
import { dragStart, dragging, dragOver, setNodeMenu, updateNodesFromMap, updateShips, movingLink, _zoom, checkThis } from './methods'
// import { getNodes } from './http'
import Manager from './manager/index.vue'

export default {
  name: 'Dashboard',
  components: {
    Manager
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
    this.checkThis()
    this.initSize()
    this.initNodes(nodes, ships)
    this.initNodesMap(this.nodes)
    this.initShips(ships)
    // getNodes().then(res => {
    //   this.initNodes(res.data.nodes, ships)
    //   this.initNodesMap(this.nodes)
    // })
  },

  methods: {
    // -----------drag---------
    drag(event) {
      if (this.isLinking) {
        const node = this.nodesMap[event.target.dataset.uuid]
        const ship = { source: this.linkSource, target: node }

        this.isLinking = false
        this.updateShips(this.ships, this.nodesMap, ship)

        return
      }

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
          delete this.nodesMap[uuid]
          // updateNodes
          this.nodes = this.updateNodesFromMap(this.nodesMap)
          this.ships = this.updateShips(this.ships, this.nodesMap, false)
          this.contextmenu = false
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
  &-line{
    z-index: 1;
  }
  &-circle{
    z-index: 99;
  }
}
</style>
