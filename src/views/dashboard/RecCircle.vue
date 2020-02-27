<template v-for="node in nodes">
  <circle>11</circle>
</template>

<script>
export default {
  name: 'RecCircle',
  props: {
    nodesStack: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      width: this.$parent.width,
      height: this.$parent.height,
      nodes: this.nodesStack
    }
  }
}
</script>
