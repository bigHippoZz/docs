<template>
  <div>
    <div class="el-form test" :ref="getEl">
      
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue";
import { getParentOrHost, tiggerClass, css,matrix } from "./utils";
export default {
  name: "test",
  setup() {
    const elRef = ref<HTMLElement | null>(null);
    function getEl<T extends HTMLElement>(el: T) {
      // tiggerClass(el, "active", true);
      // console.log(el.style)
      elRef.value = el;
    }
    onMounted(() => {
      // console.log()
      console.log(elRef.value?.style);
      console.log(void 0);
      console.log(document.defaultView, "document defaultView");
      // console.log(window.getComputedStyle(elRef.value as HTMLElement));
      console.log(matrix(elRef.value));
    });
    return {
      getEl,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-form{
  width: 100px;
  height: 100px;
}
</style>
