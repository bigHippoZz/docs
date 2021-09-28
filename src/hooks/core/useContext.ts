import { InjectionKey } from "@vue/runtime-core";

export interface CreateContextOptions {
  readOnly: boolean;
  native: boolean;
}

const createContext = <T>(context: any, key: InjectionKey<T>) => {};
