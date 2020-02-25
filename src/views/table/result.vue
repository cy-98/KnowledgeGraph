<template>
  <div>
    <div class="tags-wp">
      <el-tag v-for="node in nodes" :key="node.uuid" class="etag" @click="$emit('putSearch',node.name)">{{ node.name }}</el-tag>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nodes: this.$attrs['node-list']
    }
  }
}
</script>
