<template>
  <div class="tree" v-if="model">{{ model.val }}</div>
  <div class="left">
    <BSTTree v-if="model" :model="model.left" />
  </div>

  <div class="right">
    <BSTTree v-if="model" :model="model.right" />
  </div>
</template>

<script lang="ts">
export default {
  name: "BSTTree",
  props: {
    model: Object,
  },
};
</script>

<style scoped>
.tree {
  height: 30px;
  width: 30px;
}

.left {
  padding-right: 30px;
}
.right {
  padding-left: 30px;
}
</style>
