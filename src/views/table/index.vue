<template>
  <div class="app-container">
    <search />
    <normal />
  </div>
</template>
<script>
import search from './search'
import normal from '../dashboard/normal'

export default {
  components: {
    search,
    normal
  },
  filters: {},
  data() {
    return {
      searchMode: 'curiosity',
      filterText: ''
    }
  },
  created() {

  },
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

</style>
