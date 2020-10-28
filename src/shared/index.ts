// 空函数
// export const NOOP = () => {};
// 总是返回false
export const NO = () => false;

export const isObject = (val: unknown): val is Record<any, any> =>
  val !== null && typeof val === "object";

export const objectToString = Object.prototype.toString;
export const hasOwnProperty = Object.prototype.hasOwnProperty;
// 判断当前对象是否有key 但是原型链上的不算
export const hasOwn = (
  val: object,
  key: string | symbol
): key is keyof typeof val => hasOwnProperty.call(val, key);

export const toTypeString = (val: unknown): string => objectToString.call(val);
export const toRawType = (val: unknown): string =>
  toTypeString(val).slice(8, -1);
export const def = (object: object, key: string | symbol, value: any) =>
  Object.defineProperty(object, key, {
    configurable: true,
    enumerable: false,
    value,
  });

export const isArray = Array.isArray;
export const isSymbol = (val: unknown): val is symbol =>
  typeof val === "symbol";
