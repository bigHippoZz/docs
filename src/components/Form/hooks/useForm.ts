import { ComputedRef, ref, Ref } from "vue";
import { FormAction } from "../typings/form";

type $Values<T> = T[keyof T];
export interface FormProps<T = any> {
  model: T;
  schema: FormSchema<$Values<T>>[];
}

export interface FormSchema<K = any> {
  field: K;
}
type FormSchemaKey<T> = T extends FormSchema<infer K> ? K : never;
type A = Pick<DynamicProps<FormProps>, "model">;
type DynamicProps<T> = {
  [K in keyof T]: T[K] | Ref<T[K]> | ComputedRef<T[K]>;
};

export const useForm = <T extends FormProps>(conf: T) => {
  const methods: FormAction<T["model"]> = {
    submit: function () {
      throw new Error("Function not implemented.");
    },
    setFieldsValue: function (value: FormSchemaKey<T["schema"]>) {
      throw new Error("Function not implemented.");
    },
    getFieldsValue: function () {
      return conf.model;
      //   throw new Error("Function not implemented.");
    },
    resetFieldsValue: function () {
      throw new Error("Function not implemented.");
    },
  };
  return [methods];
};
