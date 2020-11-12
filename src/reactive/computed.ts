import { isFunction } from "@/shared";
import { effect, ReactiveEffect, track, trigger } from "./effect";
import { TrackOpTypes, TriggerOpTypes } from "./operations";
import { ReactiveFlags, toRaw } from "./reactive";
import { Ref } from "./ref";

export interface WritableComputedRef<T> extends Ref<T> {
  readonly effect: ReactiveEffect<T>;
}

export interface ComputedRef<T = any> extends WritableComputedRef<T> {
  readonly value: T;
}

export type ComputedGetter<T> = (ctx?: any) => T;
export type ComputedSetter<T> = (v: T) => void;

export interface WritableComputedOptions<T> {
  get: ComputedGetter<T>;
  set: ComputedSetter<T>;
}

class ComputedRefImpl<T> {
  private _value!: T;

  private _dirty = true;

  public readonly effect: ReactiveEffect<T>;

  public readonly __v_isRef = true;

  public readonly [ReactiveFlags.IS_READONLY]: boolean;

  constructor(
    getter: ComputedGetter<T>,
    private readonly _setter: ComputedSetter<T>,
    isReadonly: boolean
  ) {
    // 创建effect收集依赖
    this.effect = effect(getter, {
      lazy: true, // 延迟执行
      scheduler: () => {
          
        if (!this._dirty) {
          this._dirty = true; // 将数据弄脏
          trigger(toRaw(this), TriggerOpTypes.SET, "value");
        }
      },
    });
    this[ReactiveFlags.IS_READONLY] = isReadonly;
  }

  get value() {
    // 缓存干净的数据
    // 判断当前是不是脏数据
    if (this._dirty) {
      // 根据effect 进行求值，也就是computed中的函数
      this._value = this.effect();
      // 设置为干净的数据
      this._dirty = false;
      console.log(`this._dirty has change`);
    }
    console.log(this._dirty, `this._dirty change->${this._value}`);
    // 进行依赖追踪
    console.groupCollapsed("toRaw this computed");
    console.log(this, "this");
    console.log(toRaw(this), "toRaw this");
    console.groupEnd();
    track(toRaw(this), TrackOpTypes.GET, "value");
    return this._value;
  }
  set value(newValue: T) {
    // 根据客户端传入数据进行求值
    this._setter(newValue);
  }
}

export function computed<T>(getter: ComputedGetter<T>): ComputedRef<T>;
export function computed<T>(
  options: WritableComputedOptions<T>
): WritableComputedRef<T>;
export function computed<T>(
  getterOrOptions: ComputedGetter<T> | WritableComputedOptions<T>
) {
  let getter: ComputedGetter<T>;
  let setter: ComputedSetter<T>;
  if (isFunction(getterOrOptions)) {
    getter = getterOrOptions;
    setter = () => console.log("setter");
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  return new ComputedRefImpl(
    getter,
    setter,
    isFunction(getterOrOptions) || !getterOrOptions.set
  ) as any;
}
