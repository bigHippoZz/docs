import { toRawType, isObject, def } from "../shared/index";
export const enum ReactiveFlags {
  SKIP = "__v_skip",
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
  RAW = "__v_raw",
}

export interface Target {
  [ReactiveFlags.SKIP]?: boolean;
  [ReactiveFlags.IS_REACTIVE]?: boolean;
  [ReactiveFlags.IS_READONLY]?: boolean;
  [ReactiveFlags.RAW]?: any;
}

export const reactiveMap = new WeakMap<Target, any>();
export const readonlyMap = new WeakMap<Target, any>();

export const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2,
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case "Object":
    case "Array":
      return TargetType.COMMON;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return TargetType.COLLECTION;
    default:
      return TargetType.INVALID;
  }
}

// 判断一个对象是不是可扩展对象,是否可以在它上面添加新的属性
// Object.isExtensible({})
// console.log(Object.isExtensible({}));

console.log(targetTypeMap("Object"));
function getTargetType(value: Target) {
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value));
}

function createReactiveObject(
  target: Target,
  isReadonly: boolean,
  baseHandlers: ProxyHandler<any>,
  collectionHandlers: ProxyHandler<any>
) {
  //  判断是不是对象
  if (!isObject(target)) {
    // console.log(__DEV__)
    console.warn(`${String(target)}`);
    return target;
  }
  // 判断是不是响应式对象
  if (
    target[ReactiveFlags.RAW] &&
    !isReadonly &&
    target[ReactiveFlags.IS_REACTIVE]
  ) {
    return target;
  }

  // 判断可能当前对象已经具有代理对象
  const proxyMap = isReadonly ? readonlyMap : reactiveMap;
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  // 代理的白名单
  const targetType = getTargetType(target);
  if (targetType === TargetType.INVALID) {
    return target;
  }
  const result = new Proxy(
    target,
    targetType === TargetType.COLLECTION ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target, result);
  return result;
}

export function reactive(target: object) {
  // 判断是不是只读属性
  if (target && (target as Target)[ReactiveFlags.IS_READONLY]) {
    return target;
  }
  //   return createReactiveObject(target,false,)
}

export const isReadonly = (value: unknown): boolean => {
  return !!(value && (value as Target)[ReactiveFlags.IS_READONLY]);
};
export const isReactive = (value: unknown): boolean => {
  if (isReadonly(value)) {
    return isReactive((value as Target)[ReactiveFlags.RAW]);
  }
  return !!(value && (value as Target)[ReactiveFlags.IS_REACTIVE]);
};
export const isProxy = (value: unknown): boolean => {
  return isReadonly(value) || isReactive(value);
};

export function toRaw<T>(observed: T): T {
  return (
    (observed && toRaw((observed as Target)[ReactiveFlags.RAW])) || observed
  );
}

export const markRaw = <T extends object>(value: T): T => {
  def(value, ReactiveFlags.SKIP, true);
  return value;
};