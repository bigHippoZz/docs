import { isArray, isIntegerKey, isMap } from "@/shared";
import { ITERATE_KEY } from './baseHandlers';
import { TrackOpTypes, TriggerOpTypes } from "./operations";
export const MAP_KEY_ITERATE_KEY = Symbol("");
// 依赖
type Dep = Set<ReactiveEffect>;
// key对应的依赖
type KeyToDepMap = Map<any, Dep>;
// 全局依赖收集
export const targetMap = new WeakMap<any, KeyToDepMap>();
// 响应式数据的依赖

let shouldTrack = true;
const trackStack: boolean[] = [];
const effectStack: ReactiveEffect[] = [];
let activeEffect: ReactiveEffect | undefined;
let uid = 0;

export interface ReactiveEffect<T = any> {
  (): T;
  _isEffect: true;
  id: number;
  active: boolean;
  raw: () => T;
  deps: Array<Dep>;
  options: ReactiveEffectOptions;
  allowRecurse: boolean;
}

export interface ReactiveEffectOptions {
  lazy?: boolean;// 是否延迟执行
  scheduler?: (job: ReactiveEffect) => void;//调度函数
  onTrack?: (event: DebuggerEvent) => void;//追踪时触发
  onTrigger?: (event: DebuggerEvent) => void;//触发回调时触发
  onStop?: () => void;
  allowRecurse?: boolean;
}

export type DebuggerEvent = {
  effect: ReactiveEffect;
  target: object;
  type: TrackOpTypes | TriggerOpTypes;
  key: any;
} & DebuggerEventExtraInfo;

export interface DebuggerEventExtraInfo {
  newValue?: any;
  oldValue?: any;
  oldTarget?: Map<any, any> | Set<any>;
}

// 入栈 track   暂停跟踪
export function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
// 开始跟踪
export function enableTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = true;
}
// 重置跟踪
export function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === undefined ? true : last;
  //   shouldTrack = last ?? true;
}
function cleanup(effect: ReactiveEffect) {
  const { deps } = effect;
  //极有可能处理内存引用问题
  if (deps.length) {
    for (let index = 0; index < deps.length; index++) {
      deps[index].delete(effect);
    }
    deps.length = 0;
  }
}


export function stop(effect: ReactiveEffect) {
  if (effect.active) {
    cleanup(effect);
    if (effect.options.onStop) {
      effect.options.onStop();
    }
    effect.active = false;
  }
}

export function isEffect(func: any): func is ReactiveEffect {
  return func && func._isEffect === true;
}

function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(): unknown {
    // 停止响应式追踪
    if (!effect.active) {
      // 如果有scheduler就会停止响应
      return options.scheduler ? undefined : fn();
    }
    // 防止多层嵌套
    if (!effectStack.includes(effect)) {
      console.log('%cstart effectStack track','color:red')
      cleanup(effect);
      try {
        // 开始进行跟踪
        enableTracking();
        // 推入栈中
        effectStack.push(effect);
        // 对activeEffect进行赋值
        activeEffect = effect;
        // 执行依赖 获取依赖
        return fn();
      } finally {
        // 弹出栈
        effectStack.pop();
        // 重置栈
        resetTracking();
        // 对activeEffect进行重新赋值
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  } as ReactiveEffect;
  effect.id = uid++;
  effect.allowRecurse = !!options.allowRecurse;
  effect._isEffect = true;
  effect.active = true;
  effect.raw = fn;
  effect.deps = [];
  effect.options = options;
  return effect;
}
export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = {}
): ReactiveEffect<T> {
  //  如果是effect函数直接进行重新赋值
  if (isEffect(fn)) {
    console.log(fn,'fn')
    fn = fn.raw;
  }
  // 创建effect
  const effect = createReactiveEffect(fn, options);
  // 是否具有lazy属性
  if (!options.lazy) {
    effect();
  }
  // 返回effect
  return effect;
}
// 跟踪依赖
export function track(target: object, type: TrackOpTypes, key: unknown) {
  // 根据shouldTrack进行判断是否停止依赖追踪
  // activeEffect判断当前是否有effect执行
  if (!shouldTrack || activeEffect === undefined) {
    console.log(`Does not trigger responsive -> key:[${key}]`);
    return;
  }
  let depsMap = targetMap.get(target);
  if (!depsMap) {
    targetMap.set(target, (depsMap = new Map()));
  }
  let dep = depsMap.get(key);
  if (!dep) {
    depsMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    // 双向引用
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.options.onTrack) {
      activeEffect.options.onTrack({
        effect: activeEffect,
        target,
        type,
        key,
      });
    }
  }
}

// 触发依赖
export function trigger(
  target: object,
  type: TriggerOpTypes,
  key?: unknown,
  newValue?: unknown,
  oldValue?: unknown,
  oldTarget?: Map<unknown, unknown> | Set<unknown>
) {
  
  const depsMap = targetMap.get(target);
  // 并未进行跟踪
  if (!depsMap) {
    return;
  }
  const effects = new Set<ReactiveEffect>();
  // debugger
  const add = (effectsToAdd: Set<ReactiveEffect> | undefined) => {
    if (effectsToAdd) {
      effectsToAdd.forEach((effect) => {
        if (effect !== activeEffect || effect.allowRecurse) {
          effects.add(effect);
        }
      });
    }
  };

  if (type === TriggerOpTypes.CLEAR) {
    depsMap.forEach(add);
  } else if (key === "length" && isArray(target)) {
    // 数组的特殊判断
    depsMap.forEach((dep, key) => {
      if (key === "length" || key >= (newValue as number)) {
        add(dep);
      }
    });
  } else {
    if (key !== void 0) {
      add(depsMap.get(key));
    }
  }
  switch (type) {
    case TriggerOpTypes.ADD:
      if(!isArray(target)){
        add(depsMap.get(ITERATE_KEY))
        if(isMap(target)){
          add(depsMap.get(MAP_KEY_ITERATE_KEY))
        }
      }else if(isIntegerKey(key)){
        add(depsMap.get('length'))
      }
      break;
  
    case TriggerOpTypes.DELETE:
      if(!isArray(target)){
        add(depsMap.get(ITERATE_KEY))
        if(isMap(target)){
          add(depsMap.get(MAP_KEY_ITERATE_KEY))
        }
      }
      break;
    case TriggerOpTypes.SET:
      if(isMap(target)){
        add(depsMap.get(ITERATE_KEY))
      }
      break;
  }

  const run = (effect: ReactiveEffect) => {
    if (effect.options.onTrigger) {
      effect.options.onTrigger({
        effect,
        target,
        key,
        type,
        newValue,
        oldValue,
        oldTarget,
      });
    }

    if (effect.options.scheduler) {
      effect.options.scheduler(effect);
    } else {
      effect();
    }
  };

  effects.forEach(run);
}
