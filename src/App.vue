<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 50px);
}
</style>
