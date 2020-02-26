<template>
  <div class="dashboard-container">
    <svg
      class="svg"

      data-type="svg"
    >
      <circle
        v-for="node in nodes"
        :key="node.uuid"
        class="svg-circle"
        :r="Math.random()*25"
        :cx="node.x"
        :cy="node.y"
        fill="#38f"
        data-type="circle"
        :data-uuid="node.uuid"
        @mousedown="drag"
        @contextmenu.prevent="nodeMenu"
      />
      <line
        v-for="path in ships"
        :key="path.uuid"
        class="svg-line"
        :x1="path.source.x"
        :y1="path.source.y"
        :x2="path.target.x"
        :y2="path.target.y"
        data-type="line"
        style="stroke:rgb(66,66,66);stroke-width:4"
      />
    </svg>
  </div>
</template>

<script>
export default {

}
</script>
