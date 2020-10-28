import { TargetType } from ".";
import { TrackOpTypes, TriggerOpTypes } from "./operations";

// 依赖
type Dep = Set<ReactiveEffect>;
// key对应的依赖
type KeyToDepMap = Map<any, Dep>;
// 全局依赖收集
const targetMap = new WeakMap<any, KeyToDepMap>();
// 响应式数据的依赖
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
  lazy?: boolean;
  scheduler?: (job: ReactiveEffect) => void;
  onTrack?: (event: DebuggerEvent) => void;
  onTrigger?: (event: DebuggerEvent) => void;
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

const effectStack: ReactiveEffect[] = [];
let activeEffect: ReactiveEffect | undefined;

export function isEffect(func: any): func is ReactiveEffect {
  return func && func._isEffect === true;
}

export function effect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions = {}
): ReactiveEffect<T> {
  //  如果是effect函数直接进行重新赋值
  if (isEffect(fn)) {
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

let uid = 0;
function createReactiveEffect<T = any>(
  fn: () => T,
  options: ReactiveEffectOptions
): ReactiveEffect<T> {
  const effect = function reactiveEffect(): unknown {
    if (!effect.active) {
      return options.scheduler ? undefined : fn();
    }

    if (!effectStack.includes(effect)) {
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

let shouldTrack = true;

const trackStack: boolean[] = [];

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
// 跟踪依赖
export function track(target: object, type: TrackOpTypes, key: unknown) {
  if (!shouldTrack || activeEffect === undefined) {
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
