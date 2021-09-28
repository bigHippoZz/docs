import { PropType } from "@vue/runtime-core";
import { CSSProperties } from "@vue/runtime-dom";
import { ButtonProps } from "naive-ui";
import { FormSchema } from "./hooks/useForm";

export const basicFormProps = {
  // 双向数据绑定数据
  model: {
    type: Object as PropType<Recordable>,
    default: {},
  },
  // labelWidth
  labelWidth: {
    type: [String, Number],
    default: 0,
  },
  // 表单规则
  schema: {
    type: Array as PropType<FormSchema[]>,
    default: () => [],
  },
  // row类型
  baseRowStyle: {
    type: Object as PropType<CSSProperties>,
    default: {},
  },
  //   表单大小
  size: {
    type: String as PropType<"default" | "small" | "large">,
    default: "default",
  },
  // 禁用表单
  disabled: {
    type: Boolean,
    default: false,
  },
  // 是否显示收起展开按钮
  showAdvancedButton: {
    type: Boolean,
    default: false,
  },
  // 显示提交按钮
  showSubmitButton: {
    type: Boolean,
    default: false,
  },
  // submit 配置
  submitButtonOption: {
    type: Object as PropType<ButtonProps>,
    default: {},
  },
  // 显示重置按钮
  showResetButton: {
    type: Boolean,
    default: false,
  },
  // 重置按钮的配置
  resetButtonOptions: {
    type: Object as PropType<ButtonProps>,
    default: {},
  },
};

export type FormProps = {
  [K in keyof typeof basicFormProps]: typeof basicFormProps[K]["type"];
};


export interface FormAction<V> {
	// 提交
	submit: () => Promise<V>;
	// set value
	setFieldsValue: (value: V) => Promise<V>;
	// get value
	getFieldsValue: () => V;
	// remove value
	resetFieldsValue: () => Promise<void>;
  }
  
  
  