<template>
  <div class="dashboard-container">
    <svg :width="width" :height="height" data-type="svg" @mousemove="Moving" @mouseup="cancelDrag">
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
        r="25"
        :cx="node.x"
        :cy="node.y"
        fill="#f38"
        data-type="circle"
        :data-uuid="node.uuid"
        @mousedown="drag"
        @contextmenu="nodeMenu"
      />
      <line
        v-for="path in ships"
        :key="path.uuid"
        :x1="path.source.x"
        :y1="path.source.y"
        :x2="path.target.x"
        :y2="path.target.y"
        data-type="line"
        style="stroke:rgb(66,66,66);stroke-width:4"
        marker-end="url(#arrow)"
      />
    </svg>
  </div>
</template>

<script>
import { nodes, ships } from './data'
import { initSize, initNodes, initNodesMap, initShips } from './init'
import { dragStart, dragging, dragOver, setNodeMenu } from './methods'

export default {
  name: 'Dashboard',
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

      dragStart: dragStart.bind(this), // drag
      dragging: dragging.bind(this),
      dragOver: dragOver.bind(this),

      originX: 0,
      originY: 0,
      deltaX: 0,
      deltaY: 0,
      draggingNode: null
    }
  },
  mounted() {
    this.initSize()
    this.initNodes(nodes, ships)
    this.initNodesMap(this.nodes)
    this.initShips(ships)
  },

  methods: {
    // -----------drag---------
    drag(event) {
      this.dragStart(event)
    },

    Moving(event) {
      if (this.draggingNode) {
        this.dragging(event)
      }
    },

    cancelDrag(event) {
      if (this.draggingNode) { this.dragOver() }
    },
    // ------------contextmenu-------
    nodeMenu(event) {
      const node = this.nodesMap[event.target.dataset.uuid]
      const settings = [{
        label: '新建链接',
        onClick: () => {
          console.log(node)
        }
      }, {
        label: '删除节点',
        onClick: () => {}
      }]

      setNodeMenu.call(this, event, settings) // 遗留了一个历史问题

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
