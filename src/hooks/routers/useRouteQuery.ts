import { computed, nextTick, unref } from "vue";
import { useRoute, useRouter } from "vue-router";

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

export function useRouteQuery(
	key: string,
	defaultValue: string = "",
	{
		mode = "replace",
		route = useRoute(),
		router = useRouter(),
	}: ReactiveRouteOptions = {},
) {
	return computed({
		get() {
			const data = route.query;
			return data[key] ?? defaultValue;
		},
		set(value) {
			nextTick(() => {
				router[unref(mode)]({
					query: { ...route.query, [key]: `${value}` },
				});
			});
		},
	});
}
