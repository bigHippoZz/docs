<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { EnhanceWebSocket } from "./utils/WebSocket";
import "./utils/compile";
import {
  reactive,
  computed,
  watchEffect,
  readonly,
  isReadonly,
  isReactive,
  ref,
  customRef,
  toRef,
  toRefs,
} from "vue";

// import { effect, reactive, targetMap, ref, shallowRef } from "./reactive/index";
import { trigger } from "./reactive/effect";

function useuseFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2,
  });
  // 这样会丢失响应式
  return state;
}
export default {
  name: "App",
  setup() {
    const reactiveArr = reactive([1, 2, 3, 4, 5, ref(6)]);
    console.log(reactiveArr[5]);
    const current = { name: "liwuzhou" };
    const p = new Proxy(current, {
      get<T extends {}, K extends keyof T>(target: T, key: K) {
        console.log(key);
        console.log(target[key]);
        return target[key];
      },
      set<T extends object, K extends keyof T>(target: T, key: K, value: any) {
        return (target[key] = value);
      },
      has(target, key) {
        console.log(key, "has -> key");
        return Reflect.has(target, key);
      },
    });
    // console.log(Object.getOwnPropertySymbols(Symbol.prototype));
    // console.log(Object.getOwnPropertyNames(Symbol.prototype));
    // const reativeStateArr = reactive([1, 2, 3, 4, 5, 6]);
    // effect(()=>{
    //   console.log(Object.keys(reativeStateArr).length);
    // })
    // console.log(reativeStateArr.push(10));
    const object = reactive({ name: "liwuzhou" });
    watchEffect(() => {
      console.log(Object.keys(object));
    });
    (object as any)["age"] = "23";
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
