import { isNumber } from "lodash";
import { isFalsy } from "utility-types";
import { computed, Ref, unref } from "vue";
import { BasicFormProps } from "..";
import { FormSchema } from "./useForm";

export function useItemLabelWidth(
  schemaItemRef: Ref<FormSchema>,
  propsRef: Ref<BasicFormProps>
) {
  return computed(() => {
    const { labelWidth } = unref(schemaItemRef);
    const { baseFormOptions } = unref(propsRef);
    const globalLabelWidth = baseFormOptions?.labelWidth ?? 0;
    if (isFalsy(labelWidth) && isFalsy(globalLabelWidth)) {
      return {
        labelCol: { style: { textAlign: "left" } },
        wrapperCol: { style: {} },
      };
    }
    let width = labelWidth || globalLabelWidth;
    width = isNumber(width) ? `${width}px` : width;
    return {
      labelCol: { style: { width } },
      wrapperCol: { style: { width: `calc ( 100% - ${width}%)` } },
    };
  });
}
