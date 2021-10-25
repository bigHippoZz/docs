import { PropType } from "@vue/runtime-core";
import { CSSProperties } from "@vue/runtime-dom";
import { FormProps, GridProps } from "naive-ui";
import { FormSchema } from "../hooks/useForm";

export const basicFormProps = {
	// 双向数据绑定数据
	modelValue: {
		type: Object as PropType<Recordable>,
		default: () => ({}),
	},
	// form 配置项
	baseFormOptions: {
		type: Object as PropType<Omit<Partial<FormProps>, "model">>,
		default: () => ({ size: "medium" }),
	},
	// row 配置项
	baseRowOptions: {
		type: Object as PropType<Partial<GridProps>>,
		default: () => ({ cols: 24, xGap: 24 }),
	},
	// row 样式
	baseRowStyle: {
		type: Object as PropType<CSSProperties>,
		default: () => ({}),
	},
	// 表单规则
	schema: {
		type: Array as PropType<FormSchema[]>,
		default: () => [],
	},
	test: {
		type: Array,
		default: () => [],
	},
	ifShowIndex: { type: Number },
	// // 是否显示收起展开按钮
	// showAdvancedButton: {
	//   type: Boolean,
	//   default: false,
	// },
	// // 显示提交按钮
	// showSubmitButton: {
	//   type: Boolean,
	//   default: false,
	// },
	// // submit 配置
	// submitButtonOption: {
	//   type: Object as PropType<ButtonProps>,
	//   default: {},
	// },
	// // 显示重置按钮
	// showResetButton: {
	//   type: Boolean,
	//   default: false,
	// },
	// // 重置按钮的配置
	// resetButtonOptions: {
	//   type: Object as PropType<ButtonProps>,
	//   default: {},
	// },
};

export type PrimitiveFormProps = typeof basicFormProps;

export type BasicFormProps = {
	[K in keyof PrimitiveFormProps]?: PrimitiveFormProps[K]["type"] extends PropType<
		infer V
	>
		? V
		: PrimitiveFormProps[K]["type"];
};
