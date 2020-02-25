<template>
  <div class="app-container">
    <search />
    <board />
  </div>
</template>
<script>
import search from './search'
import board from '../dashboard/index'
export default {
  components: {
    search,
    board
  },
  filters: {},
  data() {
    return {
      searchMode: 'curiosity',
      filterText: '',
      nodesList: [
        {
          uuid: 20,
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
    preSearch(e) {
      console.log(e)
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
