<template>
  <div class="trigger">
    <h2>Hover me to see a height transition.</h2>
    <div :style="{ '--max-height': $height }">
      dditional content
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
export default {
  setup() {
    const $height = ref(0);
    onMounted(() => {
      $height.value = "30px";
    });
    return {
      $height,
    };
  },
};
</script>

<style lang="less" scoped>
.trigger {
  &:hover > div {
    max-height: var(--max-height);
    opacity: 1;

  }
  div {
    transition: all 0.5s ease;
    overflow: hidden; // 设置高之后还显示文字的使用overflow 进行处理
    max-height: 0;
    opacity: 0;
  }
}
</style>
