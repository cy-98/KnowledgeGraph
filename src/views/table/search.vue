<template>
  <div>
    <div style="display: flex; height: 40px;margin-bottom: 30px;">
      <el-input
        v-model="filterText"
        placeholder="please input keyword"
        style="margin-bottom:30px;"
      />
      <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
    </div>

    <div>
      <el-radio v-model="searchMode" label="curiosity" border>Curiosity</el-radio>
      <el-radio v-model="searchMode" label="normal" border>Normal</el-radio>
    </div>

    <el-tag v-for="node in nodesList" :key="node.uuid" class="etag" :data-word="node.word"  @click="putIn">{{ node.word }}</el-tag>

  </div>
</template>

<script>
import { getAllGraph } from '../../api/http'

export default {
  components: {

  },
  filters: {},
  data() {
    return {
      searchMode: 'curiosity',
      filterText: '',
      nodesList: [
      ]
    }
  },
  mounted() {
    getAllGraph().then(res => {
      this.nodesList = res.data.node
    })
  },
  methods: {
    putIn: function(e) {
      this.filterText = e.target.dataset.word
    },
    search: function() {
      // axios
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
  margin: 10px 5px;
}
</style>
