<template>
  <n-form :model="model" ref="formRef">
    <n-grid v-bind="getRowProps">
      <slot name="head"></slot>
      <!-- <form-item></form-item> -->
      <div>
        {{ Object.keys($slots) }}
      </div>
      <form-action>
        <template #[item] v-for="item of FormActionSlotName">
          <slot :name="item"></slot>
        </template>
      </form-action>
      <slot name="footer"></slot>
    </n-grid>
  </n-form>
</template>

<script lang="ts" setup>
import { ref, unref } from "@vue/reactivity";
import { merge } from "lodash";
import { NForm, NGrid, NGridItem } from "naive-ui";
import { computed, useAttrs, useSlots } from "vue";
import FormAction from "./components/FormAction.vue";
// import FormItem from "./components/FormItem.vue";
import { FormProps } from "./hooks/useForm";
import { basicFormProps } from "./typings/form";
import { FormActionSlotName } from "./typings/FormAction";
const slot = useSlots();
const attrs = useAttrs();
console.log(attrs);
console.log(slot);
const props = defineProps(basicFormProps);

const model = ref({ inputValue: " 2332" });
const propsRef = ref({}); /* 额外的props配置 */
const formRef = ref<Nullable<typeof NForm>>(null);

// 获取row props
const getRowProps = computed(() => {
  return {};
});
// 获取props
const getProps = computed(() => {
  return { ...props, ...unref(propsRef) };
});
// update props
const setProps = (formProps: FormProps) => {
  merge(unref(propsRef), unref(formProps));
};

const getBindValue = computed(() => {
  return { ...props, ...unref(propsRef) };
});
</script>
