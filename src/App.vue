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
} from "vue";
import { trigger } from "./reactive/effect";
// import { effect, reactive, targetMap, ref, shallowRef } from "./reactive/index";
export default {
  name: "App",
  setup() {
    let value = 10;
    const customize = customRef((track, tigger) => ({
      get() {
        console.log(track)
        track();
        return value;
      },
      set(newValue: number) {
        tigger();
        value = newValue;
      },
    }));
    console.log(customize.value)
    customize.value = 20
    console.log(customize.value)
    // const refObject = shallowRef({ name: "li" });
    // console.log(refObject);
    // refObject.value = "liwuzhou";
    // const refNumber = ref(ref(10));
    // console.log(refNumber);
    // refNumber.value = 110;
    // console.log(refNumber.value)
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
