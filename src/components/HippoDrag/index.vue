<template>
  <div>
    <div class="el-form test" :ref="getEl">Test</div>
    <div class="box">
      <div class="a"></div>
    </div>
  </div>
</template>
<script lang="ts">



import { onMounted, ref } from "vue";
import { getParentOrHost, tiggerClass, css, matrix, getRect } from "./utils";
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
      // console.log(getRect(document.querySelector(".a"),true));
      // console.log(css(elRef.value));
      // console.log(window.getComputedStyle(elRef.value as HTMLElement));
      // console.log(matrix(elRef.value));
      console;
    });
    return {
      getEl,
    };
  },
};
</script>
<style lang="scss" scoped>
.el-form {
  width: 100px;
  height: 100px;
  transform: scale(2);
}

.box {
  width: 400px;
  height: 400px;
  background: red;
  transform: translateX(200px);
  transform: scale(2);
  .a {
    width: 200px;
    height: 200px;
    background: blue;
    position: fixed;
    top: 100px;
    // transform: scale(2);
  }
}
</style>
