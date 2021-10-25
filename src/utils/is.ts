/**
 * 判断两个对象是不是实例关系
 * {@link isInstanceOf}
 *
 * @param wat
 * @param base
 * @returns
 */
export function isInstanceOf(wat: any, base: any): boolean {
	try {
		return wat instanceof base;
	} catch (_error) {
		return false;
	}
}

/**
 * 判断当前对象是不是原始类型
 * {@link isPrimitive}
 *
 * @param value
 * @returns
 */
export function isPrimitive(value: unknown): value is Primitive {
	return (
		value === null ||
		(typeof value !== "object" && typeof value !== "function")
	);
}

/**
 * 判断当前对象是不是promiseLike
 * {@link isThenable}
 *
 * @param value
 * @returns
 */
export function isThenable(value: unknown): value is PromiseLike<any> {
	// @ts-ignore
	return value && value.then && typeof value.then === "function";
}
