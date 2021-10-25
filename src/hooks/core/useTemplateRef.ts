import { customRef, getCurrentInstance, onMounted, onUpdated, Ref } from "vue";

export const useTemplateRef = <T>(
	key: string,
	defaultValue: T | null = null,
) => {
	const instance = getCurrentInstance();
	let _trigger: () => void = () => {};
	const element = customRef((track, trigger) => {
		_trigger = trigger;
		return {
			get() {
				track();
				return instance?.proxy?.$refs[key] ?? defaultValue;
			},
			set() {},
		};
	});
	onMounted(_trigger);
	onUpdated(_trigger);
	return element as Readonly<Ref<T>>;
};
