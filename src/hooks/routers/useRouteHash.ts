import { computed, nextTick, Ref, unref } from "vue";
import { useRoute, useRouter } from "vue-router";
type MaybeRef<T> = T | Ref<T>;
export interface ReactiveRouteOptions {
  /**
   * Mode to update the router query, ref is also acceptable
   *
   * @default 'replace'
   */
  mode?: MaybeRef<"replace" | "push">;

  /**
   * Route instance, use `useRoute()` if not given
   */
  route?: ReturnType<typeof useRoute>;

  /**
   * Router instance, use `useRouter()` if not given
   */
  router?: ReturnType<typeof useRouter>;
}

export const useRouteHash = (
  name: string,
  defaultValue?: string,
  {
    mode = "replace",
    route = useRoute(),
    router = useRouter(),
  }: ReactiveRouteOptions = {}
) => {
  return computed({
    get() {
      const data = route.query[name];
      return data ?? defaultValue;
    },
    set(value: any) {
      nextTick(() => {
        router[unref(mode)]({ query: { ...route.query, [name]: value } });
      });
      console.log(value);
    },
  });
};
