import { InjectionKey } from "@vue/runtime-core";

export type FormContext<T = any> = T;

/**
 * 创建form上下文
 */
export const createFormContext = (context: FormContext) => {};

/**
 * 使用form上下文
 */
export const useFormContext = (): FormContext => {
	return {
		reset() {},
		submit() {},
	};
};
