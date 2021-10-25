interface ViperGlobal {}

const fallbackGlobalObject = {};

/**
 * 安全的获取全局作用域对象
 * @returns
 */
export function getGlobalObject<T>() {
	return (
		globalThis
			? globalThis
			: window !== undefined
			? window
			: self !== undefined
			? self
			: fallbackGlobalObject
	) as T & ViperGlobal;
}
