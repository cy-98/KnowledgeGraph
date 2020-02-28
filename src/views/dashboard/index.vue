<template>
  <div class="app-container">
    <search on:getGraph="viewGraph"/>
    <Card></Card>
  </div>
</template>
<script>
import search from './search'
import Card from './card'
// import normal from '../dashboard/normal'
// import curiosity from '../dashboard/curiosity'

export default {
  components: {
    search,
    Card
    // curiosity
    // normal
  },
  filters: {},
  data() {
    return {
      searchMode: '',
      filterText: ''
    }
  },
  created() {

  },
  methods: {
    viewGrapth(e) {
      this.searchMode = e
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

</style>
