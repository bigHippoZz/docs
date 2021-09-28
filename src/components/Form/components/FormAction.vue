<template>
  <n-grid-item v-if="showFormActonGroup" v-bind="colOptions">
    <n-form-item v-bind="formItemOptions">
      <slot :name="FormActionSlotName.resetBefore"></slot>
      <n-button
        v-if="showResetButton"
        v-bind="resetButtonOptions"
        @click="context.reset"
        attr-type="button"
        type="default"
        size="small"
        >{{ resetText }}</n-button
      >
      <slot :name="FormActionSlotName.resetAfter"></slot>
      <slot :name="FormActionSlotName.submitBefore"></slot>
      <n-button
        v-if="showSubmitButton"
        @click="context.submit"
        v-bind="submitButtonOptions"
        attr-type="button"
        type="info"
        size="small"
        >{{ submitText }}</n-button
      >
      <slot :name="FormActionSlotName.submitAfter"></slot>
      <slot :name="FormActionSlotName.advanceBefore"></slot>
      <n-button @click="toggleAdvanced" text v-bind="advanceButtonOptions">
        {{ advance ? Advance.putAway : Advance.unfold }}
        <n-icon>
          <IosArrowLeft24Regular></IosArrowLeft24Regular>
        </n-icon>
      </n-button>
      <slot :name="FormActionSlotName.advanceAfter"></slot>
    </n-form-item>
  </n-grid-item>
</template>

<script lang="ts" setup>
import {
  ButtonProps,
  GridItemProps,
  NButton,
  NFormItem,
  NIcon,
  NGridItem,
  FormItemProps,
} from "naive-ui";
import { PropType } from "vue";
import { IosArrowLeft24Regular } from "@vicons/fluent";
import { useFormContext } from "../hooks/useFormContext";
import { Advance, FormActionSlotName } from "../typings/FormAction";

const props = defineProps({

  resetText: {
    default: "重置",
  },
  submitText: {
    default: "提交",
  },

  resetButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
  submitButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
  advanceButtonOptions: { type: Object as PropType<ButtonProps>, default: {} },
  colOptions: { type: Object as PropType<GridItemProps>, default: {} },
  formItemOptions: { type: Object as PropType<FormItemProps>, default: {} },

  showResetButton: {
    type: Boolean,
    default: true,
  },
  showSubmitButton: {
    type: Boolean,
    default: true,
  },
  showAdvanceButton: {
    type: Boolean,
    default: true,
  },
  showFormActonGroup: { type: Boolean, default: true },

  advance: { type: Boolean, default: false },
});

const emit = defineEmits<{
  (e: "update:advance", toggle: boolean): void;
}>();

const toggleAdvanced = () => {
  emit("update:advance", !props.advance);
};

const context = useFormContext();

</script>
