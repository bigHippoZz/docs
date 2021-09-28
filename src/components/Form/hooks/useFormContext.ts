import { InjectionKey } from "@vue/runtime-core";

export interface FormContext {
  reset(): void;
  submit(): void;
}

export const FORM_CONTEXT_KEY: InjectionKey<FormContext> = Symbol();

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
