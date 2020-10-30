<template>
<div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
</div>
<router-view />
</template>

<script lang="ts">
import {
    EnhanceWebSocket
} from "./utils/WebSocket";

import {
    effect,
    reactive,
    targetMap
} from "./reactive/index";
export default {
    name: "App",
    setup() {
        const state = reactive({
            name: "App",
            number: 23,
        });
        effect(() => {
            const computed = state.number + 10;
            console.log(`computed1 -> ${computed}`);
        });

        effect(() => {
            const computed = state.name;
            console.log(`computed2 -> ${computed}`);
        });
        effect(() => {
            const computed = state.name + state.number;
            console.log(`computed3 -> ${computed}`);
        });

        state.number = 10;
        console.log(state);
        console.log(targetMap);
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
