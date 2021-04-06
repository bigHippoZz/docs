<template>
  <div>
    <div class="el-form    test"  :ref="getEl">Test</div>
  </div>
</template>
<script lang="ts">
import { ref } from "vue";
import { getParentOrHost, tiggerClass } from "./utils";
export default {
  name: "test",
  setup() {
    const elRef = ref(null);
    function getEl<T extends HTMLElement>(el: T) {
      tiggerClass(el, "active", true);
    }
    return {
      getEl,
    };
  },
};
</script>
