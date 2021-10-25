import { FormRules } from "naive-ui";
// import { ComputedRef, ref, Ref } from "vue";
// import { FormAction } from "../typings/form";

export type Rule = FormRules;

export type RenderCallbackParams = {
	model: Recordable;
	values: Recordable;
	fieldName: string;
};

export interface FormSchema<K = string, V = any> {
	// 字段名称
	fieldName: K;
	// 字段默认值
	defaultValue?: V;
	// 组件值更改的的内部事件
	changeEventName?: string;
	// labelName
	labelName?: string;
	// 自定义的labelWidth
	labelWidth?: string | number;
	// v-show
	isShow?: boolean;
	// 校验规则
	rule?: Rule[];
	// 动态校验规则
	dynamicRules?: (renderCallbackParams: RenderCallbackParams) => Rule;
}
