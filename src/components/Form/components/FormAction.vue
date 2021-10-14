<template>
  <n-space>
    <n-button>{{ resetText }}</n-button>
    <n-button>{{ submitText }}</n-button>
  </n-space>
</template>

<script lang="ts" setup>
// import {
//   ButtonProps,
//   GridItemProps,
//   NButton,
//   NFormItem,
//   NIcon,
//   NGridItem,
//   FormItemProps,
// } from "naive-ui";
// import { PropType } from "vue";
// import { IosArrowLeft24Regular } from "@vicons/fluent";
// import { useFormContext } from "../hooks/useFormContext";
// import { Advance, FormActionSlotName } from "../typings/FormAction";

import { ButtonProps } from "naive-ui";

interface IFormAction {
  // 重置
  resetText?: string;
  // 提交
  submitText?: string;
  // 重置按钮配置
  resetButtonOptions?: Partial<ButtonProps>;
  // 提交按钮配置
  submitButtonOptions?: Partial<ButtonProps>;
  // 是否显示重置按钮
  showResetButton?: boolean;
  // 是否显示提交按钮
  showSubmitButton?: boolean;
}

const props = withDefaults(defineProps<IFormAction>(), {
  resetText: "重置",
  submitText: "提交",
  showResetButton: true,
  showSubmitButton: true,
});

console.log(props);

// resetButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
// submitButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
// advanceButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
// colOptions: { type: Object as PropType<GridItemProps>, default: {} },
// formItemOptions: { type: Object as PropType<FormItemProps>, default: {} },
// showResetButton: {
//   type: Boolean,
//   default: true,
// },
// showSubmitButton: {
//   type: Boolean,
//   default: true,
// },
// showAdvanceButton: {
//   type: Boolean,
//   default: true,
// },
// showFormActonGroup: { type: Boolean, default: true },
// advance: { type: Boolean, default: false },

// const emit = defineEmits<{
//   (e: "update:advance", toggle: boolean): void;
// }>();

// // const toggleAdvanced = () => {
// //   emit("update:advance", !props.advance);
// // };
// const context = useFormContext();
</script>
