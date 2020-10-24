<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import { EnhanceWebSocket } from "./utils/webSocket";
export default {
  name: "App",
  setup() {
    const ws = new EnhanceWebSocket("ws://121.40.165.18:8800");
    // ws.listen((event) => {
    //   console.log(event);
    // });
    // setInterval(() => {
    //   ws.send("hello world");
    // }, 2500);
    // ws.send("hello world");
    // let index = 0;
    // let time: number | null = null;
    // time = setInterval(() => {
    //   index++;
    //   if (index > 100) clearInterval(time as number);
    //   ws.send(`hello world as ${index}`);
    // });
    // setTimeout(() => {
    //   console.log(ws.queue);
    // }, 1000);
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
