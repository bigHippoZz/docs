import { InjectionKey } from "@vue/runtime-core";
import { inject, provide } from "vue";

export interface CreateContextOptions {
	readonly: boolean;
	native: boolean;
}
/**
 *  创建context
 * @param context
 * @param key
 * @returns
 */
export const createContext = <T>(context: any, key: InjectionKey<T>) => {
	provide(key, context);
	return { context };
};
/**
 * 使用context
 * @param key
 * @param defaultValue
 * @returns
 */
export const useContext = <T>(key: InjectionKey<T>, defaultValue?: any): T => {
	return inject(key, defaultValue ?? {});
};
