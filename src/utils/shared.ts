/**
 * 拿到object 原型链上的toString
 */
const objectToString = Object.prototype.toString;

/**
 * 获取当前对象的类型字符串
 * @param value
 */
const toTypeString = (value: unknown): string => objectToString.call(value);

/**
 * 
 * 判断当前对象类型
 */
export const toRawType = (value: unknown): string =>
    toTypeString(value).slice(8, -1);

export const isPlainObject = (val: unknown): val is object =>
    toTypeString(val) === "[object Object]";

console.log(toRawType(/23/));
