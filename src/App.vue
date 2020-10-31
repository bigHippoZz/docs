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
import "./utils/compile";
import {
    reactive,
    computed,
    watchEffect
} from "vue";
// import {
//     effect,
//     reactive,
//     targetMap
// } from "./reactive/index";
export default {
    name: "App",
    setup() {
        const state = reactive({
            name: "App",
            number: 23,
            array: [1, 2, 3],
        });

        const array = [1, 23, 4, 56];
        const proxyObj = new Proxy(array, {
            get(target, key) {
                return [""];
            },
            set(target, key, value) {
                return false;
            },
        });
        // watchEffect(() => {
        //     const computed1 = state.array;
        //     console.log(`computed1 -> ${computed1}`);
        // });
        // watchEffect(() => {
        //     const computed2 = state.name;
        //     console.log(`computed2 -> ${computed2}`);
        // });
        // watchEffect(() => {
        //     const computed3 = state.name + state.number;
        //     console.log(`computed3 -> ${computed3}`);
        // });
        // state.number = 10;
        // state.array[3] = 10;
        console.log(state);
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
