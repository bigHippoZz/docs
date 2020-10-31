import { TrackOpTypes, TriggerOpTypes } from "./operations";

import {
  Target,
  readonlyMap,
  reactiveMap,
  ReactiveFlags,
  toRaw,
} from "./reactive";
import { isArray, hasOwn, isSymbol } from "@/shared";
import { track, trigger, pauseTracking, resetTracking } from "./effect";

export const arrayInstrumentations: Record<string, Function> = {};

// Symbol()没有全局登记机制 Symbol.for('string')具有全局登记机制
// Symbol.keyFor(Symbol) 返回具有全局登记机制的symbol 的key

(["includes", "indexOf", "lastIndexOf"] as const).forEach((key) => {
  const method = Array.prototype[key] as any;
  arrayInstrumentations[key] = function(this: unknown[], ...args: unknown[]) {
    console.log(this)
    const arr = toRaw(this); // 返回原始对象
    console.log(arr,'arr');
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

export const builtInSymbols = new Set([
  Object.getOwnPropertyNames(Symbol)
    .map((key) => (Symbol as any)[key])
    .filter(isSymbol),
]);
// console.log(builtInSymbols, "builtinsymbol");
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    console.log(key)
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

export const mutableHandlers: ProxyHandler<object> = {
  get,
  set,
};
