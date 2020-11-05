import { TrackOpTypes, TriggerOpTypes } from "./operations";
import {
  Target,
  readonlyMap,
  reactiveMap,
  ReactiveFlags,
  toRaw,
  reactive,
} from "./reactive";
import { isArray, hasOwn, isSymbol, isIntegerKey, isObject, extend } from "@/shared";
import { track, trigger, pauseTracking, resetTracking } from "./effect";
import { isRef } from "./ref";
import { readonly } from "vue";
export const ITERATE_KEY = Symbol("");
export const arrayInstrumentations: Record<string, Function> = {};

// Symbol()没有全局登记机制 Symbol.for('string')具有全局登记机制
// Symbol.keyFor(Symbol) 返回具有全局登记机制的symbol 的key

(["includes", "indexOf", "lastIndexOf"] as const).forEach((key) => {
  const method = Array.prototype[key] as any;
  arrayInstrumentations[key] = function(this: unknown[], ...args: unknown[]) {
    console.log(this);
    const arr = toRaw(this); // 返回原始对象
    console.log(arr, "arr");
    // 添加响应式
    for (let i = 0, l = this.length; i < l; i++) {
      track(arr, TrackOpTypes.GET, i + "");
    }
    const res = method.apply(arr, args);
    if (res === -1 || res === false) {
      return method.apply(arr, args.map(toRaw));
    } else {
      return res;
    }
  };
});
// 这里数组直接进行写死  这样的话就不用进行判断array.prototype[key] 类型推断
(["push", "pop", "shift", "unshift", "splice"] as const).forEach((key) => {
  const method = Array.prototype[key] as any;
  arrayInstrumentations[key] = function(this: unknown, ...args: unknown[]) {
    pauseTracking(); // 停止跟踪
    const res = method.apply(this, args);
    resetTracking(); // 重置跟踪
    return res;
  };
});

const builtInSymbols = new Set(
  Object.getOwnPropertyNames(Symbol)
    .map((key) => (Symbol as any)[key])
    .filter(isSymbol)
);

console.log(builtInSymbols, "builtinsymbol");
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    // 判断当前是不是readonly
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
      // 判断当前是不是reactive
    } else if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (
      key === ReactiveFlags.RAW &&
      receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)
    ) {
      return target;
    }
    // 数组操作
    const targetIsArray = isArray(target);
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const result = Reflect.get(target, key, receiver);
    // 依赖跟踪
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key);
    }
    // 进行浅响应式
    if (shallow) {
      return result;
    }
    if (isRef(result)) {
      // 是数组的话将返回ref,不进行解包
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      // 当不是为数组的时候或者不是整数的时候,才进行做某些事情
      return shouldUnwrap ? result.value : result;
    }
    if (isObject(result)) {
      return isReadonly ? readonly(result) : reactive(result);
    }
    return result;
  };
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);

function createSetter(shallow = false) {
  return function set(
    target: object,
    key: string | symbol,
    value: unknown,
    receiver: object
  ): boolean {
    const oldValue = (target as any)[key];
    if (!shallow) {
      value = toRaw(value);
    }
    const result = Reflect.set(target, key, value, receiver);
    // 触发依赖
    trigger(target, TriggerOpTypes.SET, key, value, oldValue);
    return result;
  };
}
const set = createSetter();

const shallowSet = /*#__PURE__*/ createSetter(true)
// 拦截删除的操作
function deleteProperty(target: object, key: string | symbol): boolean {
  // hasOwn 只是检测浅层，但是由于Refect.deleteProperty(target, key) 中不管有没有key 都会返回true
  // 所以要进行判断
  const hadKey = hasOwn(target, key);
  const oldValue = (target as any)[key];
  // Reflect 并不会删除原型链上的数据，如果属性不可配置，则返回false
  // 返回值代表是否会删除成功 例如 Object.freeze() 中就不会删除成功
  const result = Reflect.deleteProperty(target, key);
  // 删除深层的包括原型链的话，不会触发依赖
  if (hadKey && result) {
    // 触发依赖
    trigger(target, TriggerOpTypes.DELETE, key, undefined, oldValue);
  }
  return result;
}
// 拦截has的操作 也就是 in 的拦截，但是for in 并不会进行拦截
function has(target: object, key: string | symbol): boolean {
  const result = Reflect.has(target, key);
  // symbol并不能触发响应式
  // builtInSymbols.has(key))暂时理解为访问原型链上的属性并不会触发依赖追踪
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, TrackOpTypes.HAS, key);
  }
  return result;
}
// 列举所有的keys 也会进行依赖追踪
// Object.getOwnPropertyNames() 只会列举string number类型的key 还包括不可枚举的属性
// Object.getOwnPropertySymbols() 列举 symbol 类型的key symbol能够被列举出来
// Object.keys() 列举string number中的可枚举属性 symbol 不能被列举出来
function ownKeys(target: object): (string | number | symbol)[] {
  // 枚举时 数组的话会依赖追踪他的length
  track(target, TrackOpTypes.ITERATE, isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
  deleteProperty,
  has,
  ownKeys,
};

export const readonlyHandlers: ProxyHandler<object> = {
  get: readonlyGet,
  set() {
    console.log("failed(set):target is readonly");
    return true;
  },
  deleteProperty() {
    console.log("faild(deleteProperty):target is readonly");
    return true;
  },
};

export const shallowReactiveHandlers: ProxyHandler<object> = extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet,
  }
);
export const shallowReadonlyHandlers: ProxyHandler<object> = extend(
  {},
  readonlyHandlers,
  {
    get: shallowReadonlyGet
  }
)

