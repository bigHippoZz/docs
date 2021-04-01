<template>
  <div v-if="model">
    <div class="root">
      {{ model.val }}
    </div>
    <div class="container">
      <tree class="left" :model="model.left"></tree>
      <tree class="right" :model="model.right"></tree>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Tree",
  props: {
    model: Object,
  },
};
</script>

<style lang="scss" scoped>
.container {
  // display: flex;
  & > div {
    height: 30px;
    margin-left: 20%;
  }
}
.root {
  font-size: 26px;
}
/* .tree {
  height: 30px;
  width: 30px;
}

.left {
  padding-right: 30px;
}
.right {
  padding-left: 30px;
} */
</style>
