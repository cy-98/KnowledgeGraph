<template>
  <el-aside class="manager" width="200px;">
    <div class="search-wrapper">
      <input v-model="ReStr" type="text" class="search-node">
      <div class="search-btn" />
    </div>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >

      <!-- 结点 -->
      <el-submenu type="nodes" index="1">
        <template slot="title">
          <i class="el-icon-location" /> 结点管理
        </template>
        <el-menu-item
          v-for="node in filtedList"
          :key="node.uuid"
          :data-uuid="node.uuid"
          @contextmenu.native.prevent="nodesSetting"
        >
          {{ node.text }}
        </el-menu-item>
      </el-submenu>

      <!-- 关系 -->

      <!-- <el-submenu type="nodes" index="2">
        <template slot="title">
          <i class="=el-icon-location" /> 添加关系
        </template>
        <el-menu-item>
          <div class="menu-wrapper">
            <input v-model="source" class="shipInput source" type="text">
            ->
            <input v-model="target" class="shipInput target" type="text">
          </div>
        </el-menu-item>
        <el-menu-item>
          <div class="btn-wrapper">
            <button>确定</button>
          </div>
        </el-menu-item>
      </el-submenu> -->

    </el-menu>
  </el-aside>
</template>

<script>
import { setNodeMenu } from '../methods'

export default {
  name: 'Manager',
  props: ['nodes', 'ships', 'nodes-map'],
  data() {
    return {
      index: 0,
      nodesList: this.$parent.nodes,
      shipsList: this.$parent.ships,
      Map: this.$parent.nodesMap,

      ReStr: '',

      target: null,
      source: null
    }
  },
  computed: {
    filtedList: function() {
      const list = this.nodesList

      if (this.ReStr === '') { return list }

      return filNode(list, new RegExp(this.ReStr))
    }
  },
  mounted() {

  },
  methods: {

    // nodes-set
    nodesSetting(e) {
      const uuid = e.target.dataset.uuid
      const settings = [
        {
          label: '删除节点',
          onClick: () => {
            this.$emit('deleteNode', uuid)
            this.nodesList = this.$parent.nodes
          }
        }
      ]
      setNodeMenu.call(this, event, settings)
    }
  }
}
function filNode(list, re) {
  const filted = []

  for (let i = 0; i < list.length; i++) {
    const item = list[i]
    if (re.test(item.text)) {
      filted.push(item)
    }
  }

  return filted
}
</script>

<style>
.manager {
  flex: 1;

  border-left: 8px solid #ccc;
  background: #545c64;

  z-index: 3;
}
.search-wrapper{
  display: flex;

  padding: 2px;
  box-sizing: border-box;

  width: 100%;

}
.search-wrapper .search-node{
  padding-left: 5px;

  width: 85%;
  border-radius: 15px;

  outline: none;
  border: none;

  line-height: 1.5rem;
  font-size: 14px;
}
.search-btn{
  margin: auto;

  border-radius: 50%;
  border: 2px solid #fff;

  height: 16px;
  width: 16px;

  cursor: pointer;
}
.search-btn::after{
  content: '';

  width: 6px;
  height: 3px;

  background: #fff;

  display: block;

  position: relative;

  top: 12px;
  left: 10px;

  transform: rotateZ(45deg);
}

.menu-wrapper {
  padding: 2px;

  width:100%;
}
.shipInput {
  width: 40px;
}
</style>
