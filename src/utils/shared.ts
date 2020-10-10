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
 * 判断当前对象类型
 */
export const toRawType = (value: unknown): string =>
    toTypeString(value).slice(8, -1);

/**
 * 判断当前是不是原始对象
 */
export const isPlainObject = (val: unknown): val is object =>
    toTypeString(val) === "[object Object]";

/**
 * 使用访问器进行访问
 * @param object 
 * @param key 
 * @param value 
 */
export const def = (object: object, key: string | symbol, value: any) => {
    Object.defineProperty(object, key, {
        value,
        configurable: true /**当且仅当该属性的 configurable 键值为 true 时，该属性的描述符才能够被改变，同时该属性也能从对应的对象上被删除。 */,
        enumerable: false /** 当且仅当该属性的 enumerable 键值为 true 时，该属性才会出现在对象的枚举属性中。 */,
    });
};
/**
 *  获取全局global对象
 */
let _globalThis: any;
export const getGlobalThis = (): any =>
    _globalThis ||
    (_globalThis =
        typeof globalThis !== undefined
            ? globalThis
            : typeof self !== undefined
            ? self
            : typeof window !== undefined
            ? window
            : typeof global !== undefined
            ? global
            : {});
