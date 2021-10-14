<template>
  <n-form :model="model" label-width="80" size="medium" label-placement="left">
    <n-grid
      :cols="24"
      :x-gap="10"
      :collapsed="collapsed"
      :collapsed-rows="1"
      item-responsive
    >
      <n-form-item-gi
        v-for="(item, index) in test"
        :key="index"
        :span="item"
        label="Input"
        path="inputValue"
      >
        <n-input
          :placeholder="index < props.ifShowIndex ? `111` : '222'"
          placeholder="Input"
          v-model:value="model.inputValue"
        />
      </n-form-item-gi>
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
import { IosArrowUp } from "@vicons/ionicons4";
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

import { GameControllerOutline, GameController } from "";

import { BasicFormProps, basicFormProps } from ".";

import { useModel } from "./hooks/useModel";

import FormItem from "./components/FormItem.vue";

import { FormContext } from "./hooks/useFormContext";

import FormAction from "./components/FormAction.vue";

const collapsed = ref(false);

import { NForm } from "naive-ui";

const emit = defineEmits<{
  (e: "update:modelValue", value: Recordable): void;
}>();

const props = defineProps(basicFormProps);

const propsRef = ref({});

// const defProps = computed(
//   () => merge(props, unref(propsRef)) as BasicFormProps
// );

const model = useModel(props, "modelValue", emit);

// const colProps = computed(() => {
//   const { baseRowStyle, baseRowOptions } = unref(defProps);
//   return {
//     style: baseRowStyle,
//     ...baseRowOptions,
//   };
// });

// provide(formInjectKey, {
//   // parentProps: readonly(defProps),
//   // submitFn: function () {},
//   // resetFn: function () {},
//   model,
// });

const generalOptions = ["groode", "veli good", "emazing", "lidiculous"].map(
  (v) => ({
    label: v,
    value: v,
  })
);
</script>
