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
// import {
//   reactive,
//   computed,
//   watchEffect,
//   readonly,
//   isReadonly,
//   isReactive,
//   ref,
//   customRef,
//   toRef,
//   toRefs,
// } from "vue";
import { onMounted } from "vue";
import {
  effect,
  reactive,
  targetMap,
  ref,
  shallowRef,
  computed,
} from "./reactive/index";
import { trigger } from "./reactive/effect";
import { useForEachNode } from "./algorithm/BSF";

import { useDFSforEachNode } from "./algorithm/DFS";
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
    // useForEachNode("#app").then((res) => console.log(res));
    useDFSforEachNode("#app").then((response) => {
      console.log(response, "responseNode");
    });
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
