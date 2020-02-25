<template>
  <div>
    <div style="display: flex; height: 40px;margin-bottom: 30px;">
      <el-input
        v-model="filterText"
        placeholder="please input keyword"
        style="margin-bottom:30px;"
      />
      <el-button type="primary" icon="el-icon-search" @click="searchNode">搜索</el-button>
    </div>
    <div>
      <el-radio v-model="searchMode" label="curiosity" border>Curiosity</el-radio>
      <el-radio v-model="searchMode" label="normal" border>Normal</el-radio>
    </div>
    <result :node-list="nodesList" @putSearch="preSearch" />
  </div>
</template>

<script>
import result from './result'

export default {
  components: {
    result
  },
  filters: {},
  data() {
    return {
      searchMode: 'curiosity',
      filterText: '',
      nodesList: [
        {
          uuid: 20,
          name: '矿山大数据',
          msg: ''
        },
        {
          uuid: 9,
          name: '智能煤炭',
          msg: ''
        },
        {
          uuid: 33,
          name: '矿业开采',
          msg: ''
        },
        {
          uuid: 11,
          name: '煤炭防治',
          msg: ''
        },
        {
          uuid: 18,
          name: '瓦斯防治',
          msg: ''
        }
      ]
    }
  },
  created() {},
  methods: {
    searchNode: () => {},
    preSearch: function(e) {
      this.filterText = e
    }
  }
}
</script>
<style>
.el-button + .el-button {
  margin: 0;
}
.tags-wp {
  margin: 15px 0px;
}
.etag {
  margin: 0 5px;
}
</style>
