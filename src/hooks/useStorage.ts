import { onUnmounted, ref, unref, watchEffect } from "vue";

import { IStorageCache, StorageCache } from "../utils/cache/storageCache";

export function useStorage<T = string>(
  key: string,
  defaultValue?: T,
  options?: IStorageCache
) {
  // const storage = new StorageCache(options ?? {});
  // const value = ref(defaultValue);
  // const handleStorageChange = (event: StorageEvent) => {
  //   console.log(event);
  // };
  // window.addEventListener("storage", handleStorageChange);
  // onUnmounted(() => window.removeEventListener("storage", handleStorageChange));
  // // 监听 value
  // watchEffect(() => {
  //   console.log(value);
  //   storage.set(key, unref(value));
  // });
  // return value;
}
