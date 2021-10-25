import { computed, ref, UnwrapRef, watch, unref } from "vue";

interface UseModelOptions {
	// 事件名称
	eventName?: string;
	// 主动还是被动
	passive?: boolean;
	// 监听object array
	deep?: boolean;
}

export function useModel<O, K extends keyof O, Name extends string>(
	props: O,
	key: K,
	emit: (name: Name, ...args: any[]) => void,
	options: UseModelOptions = {},
) {
	// !!! 主要是分清是自己手动进行变更还是 被动的进行更新
	let { eventName, passive = true, deep = true } = options;
	eventName = eventName ?? `update:${key}`;
	if (passive) {
		const model = ref<O[K]>(props[key]);
		watch(
			() => props[key],
			(value) => {
				model.value = value as UnwrapRef<O[K]>;
			},
			{ deep },
		);
		watch(
			() => unref(model),
			(value) => {
				if (value !== props[key] || deep) {
					emit(eventName as Name, value);
				}
			},
			{ deep },
		);
		return model;
	} else {
		return computed<O[K]>({
			get() {
				return props[key];
			},
			set(value) {
				emit(eventName as Name, value);
			},
		});
	}
}
