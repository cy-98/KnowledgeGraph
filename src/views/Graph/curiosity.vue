<template>
  <div class="dashboard-container">
    <svg class="cur-svg" :width="width" :height="height">
      <line
        v-for="path in otherShips"
        :key="Math.random() * Math.random()"
        class="svg-line"
        :x1="path.source.x"
        :y1="path.source.y"
        :x2="path.target.x"
        :y2="path.target.y"
        style="stroke:rgb(66,66,66);stroke-width:2"
      />
      <circle
        v-if="currentNode"
        :currentNode="currentNode"
        class="svg-circle"
        :cx="currentNode.x"
        :cy="currentNode.y"
        r="40"
        fill="#3f8"
      />
      <circle
        v-for="node in otherNodes"
        :key="Math.random() * Math.random()"
        class="svg-circle"
        :cx="node.x"
        :cy="node.y"
        :r="40 - node.degree * 7"
        :fill="`#${38 + node.degree * 20}f`"
      />
      <text v-for="node in nodes" :key="node.uuid" :x="node.x" :y="node.y">{{ node.word }}</text>
    </svg>
  </div>
</template>

<script>
import data from '../../api/normal_nodes'
import { initNodes } from './init'

export default {
  data() {
    return {
      width: 0,
      height: 0,
      nodes: [],
      ships: [],
      currentNode: null,

      otherNodes: [],
      otherShips: []
    }
  },
  mounted() {
    this.width = document.querySelector('.app-main').clientWidth
    this.height = document.querySelector('.app-main').clientHeight

    const { nodes, ships } = data.data
    console.log(nodes, ships)
    initNodes.call(this, nodes, ships)
    this.$store.commit('updateNodes', nodes)

    this.nodes = nodes
    this.ships = ships

    this.currentNode = this.nodes[1] // 索引结点
    let degree = 1
    recFind.call(this, this.currentNode, this.ships)

    function recFind(currentNode, ships) {
      const newShips = []
      const newNodes = []
      degree++
      ships.forEach(s => {
        if (s.source.uuid === currentNode.uuid) {
          s.target.degree = degree
          newNodes.push(s.target)
          this.otherNodes.push(s.target)

          newShips.push(s)
          this.otherShips.push(s)
        }
      })

      newNodes.forEach(n => {
        recFind.call(this, n, ships)
      })
    }
  }
}
</script>

<style>
.dashboard-container {
  display: flex;
  flex: 1;
}
.cur-svg {
  flex: 1;
}
.svg-circle{

}
.svg-line {

}
</style>

