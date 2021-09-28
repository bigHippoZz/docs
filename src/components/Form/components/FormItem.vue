<template>
  <n-grid-item></n-grid-item>
</template>

<script lang="ts" setup>
import { NGridItem } from "naive-ui";
import { computed, PropType, useSlots } from "vue";
import { FormSchema } from "../hooks/useForm";

defineProps({
  // 配置项
  schema: {
    type: Object as PropType<FormSchema>,
  },
});

const slot = useSlots();
console.log(slot);

const getValue = computed(() => {});
const setValue = () => {};

const getField = computed(() => {});
const setField = () => {};

const getOptions = ()=>{}

const validField = computed(() => {});



// 增删改cha
// 字段的显示隐藏
// place
// model
// 各种事件
// css
// valid
</script>
