import { TrackOpTypes, TriggerOpTypes } from "./operations";

import {
  Target,
  readonlyMap,
  reactiveMap,
  ReactiveFlags,
  toRaw,
} from "./index";
import { isArray, hasOwn, isSymbol } from "@/shared";
import { track, trigger } from "./effect";

export const arrayInstrumentations: Record<string, Function> = {};

// Symbol()没有全局登记机制 Symbol.for('string')具有全局登记机制
// Symbol.keyFor(Symbol) 返回具有全局登记机制的symbol 的key

export const builtInSymbols = new Set([
  Object.getOwnPropertyNames(Symbol)
    .map((key) => (Symbol as any)[key])
    .filter(isSymbol),
]);

console.log(builtInSymbols, "builtinsymbol");

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true);
function createGetter(isReadonly = false, shallow = false) {
  return function get(target: Target, key: string | symbol, receiver: object) {
    if (key === ReactiveFlags.IS_READONLY) {
      return isReadonly;
    } else if (key === ReactiveFlags.IS_REACTIVE) {
      return !isReadonly;
    } else if (
      key === ReactiveFlags.RAW &&
      receiver === (isReadonly ? readonlyMap : reactiveMap).get(target)
    ) {
      return target;
    }
    //待会再看
    const targetIsArray = isArray(target);
    if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const result = Reflect.get(target, key, receiver);
    // const current = isSymbol(key) ?
    // if(isSymbol(key)){
    // }
    // symbol 判断
    // 依赖跟踪
    if (!isReadonly) {
      track(target, TrackOpTypes.GET, key);
    }
    if (shallow) {
      return result;
    }
    return result;
    // if(isObject()){
    //    return   isReadonly ?
    // }
    // if(isRef())
  };
}

const set = createSetter();
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
