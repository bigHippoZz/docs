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

// formItemComponents.forEach((item) =>
//   formItemComponentsTypeMap.set(item.name, item)
// );

class Processor {
  private _state = new Map<string, Recordable>();
  // 注册指令
//   registerCommand(command: string, state: Recordable): boolean {}
  // 提交指令
  triggerCommand(command: string, state: Recordable) {}
}
