import type { ComponentPublicInstance, FunctionalComponent } from "vue";
import type { Ref } from "vue";
declare global {
	const __DEV__: boolean;
	const __APP_INFO__: string;
	const PERFORM_SORTING: boolean;

	declare interface ViteEnv {
		VITE_PUBLIC_PATH: string;
		VITE_PROXY: [string, string][];
		VITE_DROP_CONSOLE: boolean;
		VITE_GLOB_API_URL: string;
		VITE_GLOB_UPLOAD_URL: string;
		VITE_GLOB_API_URL_PREFIX: string;
		VITE_PORT: number;
	}

	declare type Nullable<T> = T | null;
	declare type Recordable<T = any> = Record<string, T>;
	declare type MaybeRef<T> = T | Ref<T>;
}

declare module "vue" {
	export type JSXComponent<Props = any> =
		| { new (): ComponentPublicInstance<Props> }
		| FunctionalComponent<Props>;
}
