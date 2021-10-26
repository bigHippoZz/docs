<template>
	<n-input placeholder="Input" />
</template>

<script lang="ts" setup>
import { inject } from "vue";
import { FormSchema } from "../hooks/useForm";
import { formInjectKey } from "../BasicForm.vue";
// import { computed } from "vue";
// import { isFunction } from "lodash";

defineProps<{
	schema: FormSchema;
}>();

const context = inject(formInjectKey);

console.log(context?.model);

// const getValue = computed(() => {
// 	return {
// 		fieldName: props.schema.fieldName,
// 	};
// });

// const formItemRules = computed(() => {
// 	const { fieldName, rule, dynamicRules } = props.schema;
// 	if (isFunction(dynamicRules)) {
// 		return dynamicRules(getValue as any);
// 	}
// });

// const slot = useSlots();

// console.log(slot);

// const getValue = computed(() => {});
// const setValue = () => {};

// const getField = computed(() => {});
// const setField = () => {};

// const getOptions = () => {};

// const validField = computed(() => {});

// 增删改cha
// 字段的显示隐藏
// place
// model
// 各种事件
// css
// valid
</script>
