<template>
  <n-form v-bind="defProps.baseFormOptions" :model="model" ref="formRef">
    <n-grid v-bind="colProps">
      <slot name="formHeader" />
      <n-form-item-gi
        v-for="schema in defProps.schema"
        :span="12"
        label="Input"
        path="inputValue"
        :key="schema.fieldName"
      >
        <form-item :schema="schema"> </form-item>
      </n-form-item-gi>

      <n-form-item-gi :span="12">
        <form-action></form-action>
      </n-form-item-gi>

      <slot name="formFooter" />
    </n-grid>
  </n-form>
</template>

<script lang="ts">
interface FormContext {
  model: Recordable;
  schema?: Recordable;
}
export const formInjectKey = Symbol() as unknown as InjectionKey<FormContext>;
</script>

<script lang="ts" setup>
import { merge } from "lodash";
import {
  computed,
  InjectionKey,
  isReactive,
  isReadonly,
  provide,
  reactive,
  readonly,
  ref,
  unref,
  watch,
  WatchOptions,
} from "vue";

import { BasicFormProps, basicFormProps } from ".";

import { useModel } from "./hooks/useModel";

import FormItem from "./components/FormItem.vue";

import { FormContext } from "./hooks/useFormContext";

import FormAction from "./components/FormAction.vue";

const emit = defineEmits<{
  (e: "update:modelValue", value: Recordable): void;
}>();

const props = defineProps(basicFormProps);

const propsRef = ref({});

const defProps = computed(
  () => merge(props, unref(propsRef)) as BasicFormProps
);

const model = useModel(props, "modelValue", emit);

const colProps = computed(() => {
  const { baseRowStyle, baseRowOptions } = unref(defProps);
  return {
    style: baseRowStyle,
    ...baseRowOptions,
  };
});

provide(formInjectKey, {
  // parentProps: readonly(defProps),
  // submitFn: function () {},
  // resetFn: function () {},
  model,
});
</script>
