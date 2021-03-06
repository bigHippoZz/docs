import { hasChanged, isArray, isObject } from "@/shared";
import { track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { isProxy, isReactive, reactive, toRaw } from "./reactive";

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

export type CustomRefFactory<T> = (
  track: () => void,
  tigger: () => void
) => {
  get: () => T;
  set: (value: T) => void;
};

// 自定义ref
export class CustomRefsImpl<T> {
  private readonly _get: ReturnType<CustomRefFactory<T>>["get"];
  private readonly _set: ReturnType<CustomRefFactory<T>>["set"];
  public readonly __v_isRef = true;
  constructor(factory: CustomRefFactory<T>) {
    const { get, set } = factory(
      () => track(this, TrackOpTypes.GET, "value"),
      () => trigger(this, TriggerOpTypes.SET, "value")
    );
    this._get = get;
    this._set = set;
  }

  get value() {
    return this._get();
  }

  set value(newVal) {
    this._set(newVal);
  }
}

class ObjectRefImpl<T extends object, K extends keyof T> {
  public readonly __v_isRef = true;
  constructor(private readonly _object: T, private readonly _key: K) {}
  get value() {
    return this._object[this._key];
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
// 实例自定义ref
export function customRef<T>(factory: CustomRefFactory<T>): Ref<T> {
  return new CustomRefsImpl(factory) as any;
}
// 将响应式对象的property进行响应式连接
// https://v3.cn.vuejs.org/api/refs-api.html#toref
/**
 * const state = reative({name:'liwuzhou'})
 * const statePropertyName = toRef(state,'name')
 */
export function toRef<T extends object, K extends keyof T>(object: T, key: K) {
  return isRef(object[key]) ? object[key] : new ObjectRefImpl(object, key);
}
// 将整个对象中的基本类型转换为ref对象，防止缺失响应式
export function toRefs<T extends {}>(object: T) {
  // 判断当前是不是响应式对象
  if (!isProxy(object)) {
    console.log("toRefs object is not a proxy object");
  }
  // 判断是对象还是数组 这样返回的数据好有数
  const result: any = isArray(object) ? new Array(object.length) : {};
  for (const key in object) {
    // 转换为Ref对象
    result[key] = toRef(object, key);
  }
  return result;
}
