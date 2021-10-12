export enum Advance {
  putAway = "收起",
  unfold = "展开",
}

export enum FormActionSlotName {
  resetBefore = "resetBefore",
  resetAfter = "resetAfter",
  submitBefore = "submitBefore",
  submitAfter = "submitAfter",
  advanceBefore = "resetBefore",
  advanceAfter = "advanceBefore",
}

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
