<template>
  <div class="home">
    <!-- <img alt="Vue logo" src="../assets/logo.png" />
    <div class="tree-container">
      <BSTTree :model="treeObject" />
    </div> -->
  </div>
</template>
<script lang="ts">
// import BSTTree from "./BST.vue";

export default {
  name: "Home",
  components: {
    // BSTTree,
  },

  data() {
    return {
      treeObject: {
        val: "1",
        left: {
          val: "12",
          left: { val: "23" },
        },
        right: {
          val: "12",
        },
      },
    };
  },
};
</script>

<style scoped>
.tree-container {
  margin: auto;
  display: inline-block;
}
</style>
