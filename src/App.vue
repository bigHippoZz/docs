<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld />

  <Drag id="header">
    <Tree :model="data" />
    <template #footer>
      <div>Footer</div>
    </template>
  </Drag>
  <HipppDrag />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { TreeNode } from "./algorithm/BinaryTreeForEach";
import HelloWorld from "./components/HelloWorld.vue";
import Drag from "./components/Drag.vue";
import Tree from "./views/Tree.vue";

import HipppDrag from "@/components/HippoDrag/index.vue";
export default defineComponent({
  name: "App",
  components: {
    HelloWorld,
    Tree,
    Drag,
    HipppDrag,
  },
  setup() {
    function generateTree(array: number[]) {
      const { length } = array;
      if (!length) return null;
      function helper(left: number, right: number): TreeNode | null {
        if (left > right) return null;
        const mid = (left + right) >> 1;
        const root = new TreeNode(array[mid]);
        root.left = helper(left, mid - 1);
        root.right = helper(mid + 1, right);
        return root;
      }
      const result = helper(0, length - 1);
      return result;
    }
    const data = generateTree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
    return {
      data,
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
