import { Component } from "vue";

import { NInput } from "naive-ui";

/**
 * formItem 所有的类型
 */
export type FormItemComponentType = "NInput";

export const formItemComponents = [NInput] as const;

export const formItemComponentsTypeMap = new Map<
	FormItemComponentType,
	Component
>();

formItemComponentsTypeMap.set("NInput", NInput);
