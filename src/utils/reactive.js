const collectionTypes = new Set([Set, Map, WeakMap, WeakSet]);
const hasOwn = (target, key) => Object.hasOwnProperty.call(target, key);
const hasChanged = (newValue, oldValue) => newValue === oldValue;
// 判断是不是 object 类型
function isObject(obj) {
    return obj !== null && typeof obj === "object";
}
function reactive(target) {
    return createReactiveObject(
        target,
        false,
        baseHandlers,
        collectionHandlers
    );
}
function createReactiveObject(
    target,
    isReadonly,
    baseHandlers,
    collectionHandlers
) {
    if (!isObject(target)) {
        return target;
    }
    return new Proxy(
        target,
        collectionTypes.has(target.constructor)
            ? collectionHandlers
            : baseHandlers
    );
}
function createGetter() {
    return function get(target, key, receiver) {
        const result = Reflect.get(target, key, receiver);
        console.log(`拦截getter target：${target} key：${key}`);
        track(target, "get", key);
        if (isObject(result)) {
            return reactive(result);
        }
        return result;
    };
}
function createSetter() {
    return function get(target, key, value, receiver) {
        const hasKey = hasOwn(target, key);
        const oldValue = target[key];
        const result = Reflect.set(target, key, value, receiver);
        if (!hasKey) {
            console.log(`更改setter target：${target} key：${key}`);
        } else if (!hasChanged(result, oldValue)) {
            console.log(`更新setter target：${target} key：${key}`);
        }
        trigger(target, "set", key, value);
        // console.log(`拦截setter target：${target} key：${key}`);
        return result;
    };
}

let uid = 0;
let effectStack = [];
let activeEffect;

function effect(func, options) {
    const effect = createReactiveEffect(func, options);
    if (!effect.lazy) {
        effect();
    }

    return effect;
}

function createReactiveEffect(func, options) {
    const effect = function () {
        if (!effectStack.includes(effect)) {
            try {
                effectStack.push(effect);
                activeEffect = effect;
                return func();
            } catch (error) {
                console.log(error);
            } finally {
                console.log(activeEffect, "activeEffect");
                effectStack.pop();
                activeEffect = effectStack[effectStack.length - 1];
            }
        }
    };
    effect.options = options;
    effect.id = uid++;
    effect.deps = [];
    return effect;
}

const get = createGetter();
const set = createSetter();
const baseHandlers = {
    get: get,
    set: set,
};

const collectionHandlers = {};

const targetMap = new WeakMap();

function track(target, type, key) {
    if (activeEffect === undefined) {
        return;
    }
    let depMap = targetMap.get(target);
    if (!depMap) {
        targetMap.set(target, (depMap = new Map()));
    }
    let dep = depMap.get(key);
    if (!dep) {
        depMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        activeEffect.deps.push(dep);
    }
}

function trigger(target, type, key, value) {
    
    const depsMap = targetMap.get(target); // 获取当前target对应的Map

    if (!depsMap) {
        return;
        // throw new Error("not depMap");
    }
    const effects = new Set(); // 存储依赖的effect

    const add = effectsToAdd => {
        if (effectsToAdd) {
            effectsToAdd.forEach(effect => {
                effects.add(effect);
            });
        }
    };

    const run = effect => {
        effect();
    };

    if (key !== null) {
        add(depsMap.get(key));
    }

    if (type === "add") {
        // 处理数组元素的新增
        add(depsMap.get(Array.isArray(target) ? "length" : ""));
    }

    // 遍历effects并执行
    effects.forEach(run);
}
const objectProxy = reactive({
    name: "Liwz",
    age: 24,
    array: [1, 3, 4, 5, 6],
});

objectProxy.array.push(10);

effect(function () {
    console.log(objectProxy.array.length);
});
