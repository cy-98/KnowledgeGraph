<template>
  <el-aside>
    <div @click="onClick">click</div>

  </el-aside>
</template>

<script>
// import { mapGetters, mapActions, mapState } from 'vuex'

export default {
  name: 'Manager',
  computed: {
    // ...mapGetters(['nodes'])
    // ...mapState({
    //   nodes: (state) => {
    //     return state.knowledge.nodes
    //   }
    // })
  },
  methods: {
    // ...mapActions('knowledge', ['updateNodes']),

    onClick() {
      // this.updateNodes([{ id: 423 }])
    }
  },
  mounted() {
    // this.updateNodes([{ id: 1 }])
  }
}
</script>
