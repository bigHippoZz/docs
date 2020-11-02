import { hasChanged, isObject } from "@/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { isReactive, reactive, toRaw } from "./reactive";

declare const RefSymbol: unique symbol;

export interface Ref<T = any> {
  value: T;
  [RefSymbol]: true;
  _shallow?: boolean;
}

export function isRef<T>(r: Ref<T> | unknown): r is Ref<T>;
export function isRef<T>(r: any): r is Ref<T> {
  return Boolean(r && r.__v_isRef === true);
}

export function convert<T extends unknown>(val: T): T {
  // 判断当前val是不是对象，如果是的话添加响应式，不是则直接返回
  return isObject(val) ? reactive(val) : val;
}

class RefImpl<T> {
  private _value!: T;
  public readonly __v_isRef = true;
  constructor(private _rawValue: T, public readonly _shallow: boolean = false) {
    // convert 方法进行转换 将基本类型转换为reactive响应式
    this._value = _shallow ? _rawValue : convert(_rawValue);
  }
  get value() {
    console.log(toRaw(this), "toRaw(this)");
    // 添加依赖追踪
    track(toRaw(this), TrackOpTypes.GET, "value");
    // this._value 就是真实的基本类型ref
    return this._value;
  }
  set value(newVal) {
    if (hasChanged(toRaw(this), this._rawValue)) {
      // rawValue 的作用就是保存上一次变量的地址
      this._rawValue = newVal;
      // 变更数据
      this._value = this._shallow ? newVal : convert(newVal);
      // 触发依赖
      trigger(toRaw(this), TriggerOpTypes.SET, "value", newVal);
    }
  }
}

function createRef(rawValue: unknown, shallow = false) {
  // 判断当前对象是不是ref
  if (isRef(rawValue)) {
    return rawValue;
  }
  // 生成ref响应式数据
  return new RefImpl(rawValue, shallow);
}

export function ref(value?: unknown) {
  return createRef(value);
}
// 创建浅层的ref 只会响应value，value可以为对象
export function shallowRef(value?: unknown) {
  return createRef(value, true);
}

//进行解包
export function unref<T>(ref: T): T extends Ref<infer V> ? V : T {
  return isRef(ref) ? (ref.value as any) : ref;
}
// 手动触发trigger
export function triggerRef(ref: Ref) {
  trigger(toRaw(ref), TriggerOpTypes.SET, "value", void 0);
}

const shallowUnwrapHandlers: ProxyHandler<any> = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  },
};

export function proxyRefs<T extends object>(objectWithObject: T) {
  return isReactive(objectWithObject)
    ? objectWithObject
    : new Proxy(objectWithObject, shallowUnwrapHandlers);
}



class CustomRefsImpl { 
  
}