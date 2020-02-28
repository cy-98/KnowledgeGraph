<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>{{ card.word }}</span>
    </div>
    <div class="text item">{{ 'Subject ' + card.subject }}</div>
    <div class="text item">{{ 'Abstract ' + card.abstract }}</div>
    <div class="text item">{{ 'interLink ' + card.interLink }}</div>

  </el-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      card: state => state.knowledge.card
    })
  }
}
</script>

<style>
.box-card {
  margin: 30px;
  max-width: 500px;
}
.box-card .item {
  margin: 30px;
}
</style>
