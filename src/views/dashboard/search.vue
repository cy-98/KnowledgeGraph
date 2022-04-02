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

    <div @click="toGraph">
      <el-radio v-model="searchMode" label="curiosity" border>Curiosity</el-radio>
      <el-radio v-model="searchMode" label="normal" border>Normal</el-radio>
    </div>

    <el-tag v-for="node in nodesList" :key="node.uuid" class="etag" :data-uuid="node.uuid" :data-word="node.word" @click="putIn">{{ node.word }}</el-tag>

  </div>
</template>

<script>
import { getAllGraph } from '../../api/http'
import { mapActions } from 'vuex'

export default {
  filters: {},
  data() {
    return {
      searchMode: 'curiosity',
      filterText: '',
      nodesList: [
      ],
      selectNode: null
    }
  },
  mounted() {
    getAllGraph().then(res => {
      this.$store.commit('updateNodes', res.data.node)
      this.nodesList = res.data.node
    })
  },
  methods: {
    putIn: function(e) {
      this.filterText = e.target.dataset.word
      this.selectId = e.target.dataset.uuid
    },
    search: function() {
      if ((this.filterText).trim() === '') return
      const id = this.selectId

      this.updateCard(this.nodesList.find(i => {
        return i.uuid === id
      }))
    },
    toGraph() {
      this.changeMode(this.searchMode).then(
        () => {
          this.$router.push({ path: `/table/${this.searchMode}` })
        }
      )
    },
    ...mapActions([
      'updateCard',
      'changeMode'
    ])
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
