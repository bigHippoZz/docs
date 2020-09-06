<template>
    <ForNavBar v-slot="componentProps">
        <NavBar v-bind="componentProps" :componentRef="getRef"> </NavBar>
    </ForNavBar>
</template>

<script>
import {
    ref,
    reactive,
    watchEffect,
    computed,
    onMounted,
    provide,
    nextTick,
    inject,
} from "vue";
import { objectToQueryString } from "./utils/index";
import {
    parseQuery,
    useLink,
    useRoute,
    useRouter,
    stringifyQuery,
} from "vue-router";
import Images from "./components/Images.vue";
import Height from "./components/Height.vue";
import HoverUnderlineAnimation from "./components/HoverUnderlineAnimation.vue";
import Print from "./components/Print.vue";
import NavBar from "./components/NavBar.vue";
// import "./utils/extends.js";
import Box from "./components/Box.vue";
import Input from "./components/Input.vue";
import LoadConfigurationFile, { log } from "./utils/Load-configuration-file";
import BufferedInput from "./library/BufferedInput-hoc.vue";
import "./utils/store";
import main from "./main.json";
import { EnhanceWebSocket } from "./utils/webSocket.js";
import "./extends/ref.js";
import "./static/Stack.js";
import "./static/Set.js";

import "./static/LinkedList.js";
// import "./index.css";
// import "./main.less";

import ForNavBar from "./businessLogic/ForNavBar.vue";
export default {
    name: "App",
    components: {
        // HelloWorld,
        Images,
        Height,
        HoverUnderlineAnimation,
        Box,
        Input,
        Print,
        BufferedInput,
        NavBar,
        ForNavBar,
    },
    setup() {
        let $name = reactive({
            name: "liwuzhou",
        });
        LoadConfigurationFile();
        // console.log(log)
        // provide("conf", 'res');
        const provideObject = provide("provide", function (imagesRef) {
            // console.log(imagesRef, "imagesref");
            // console.log("依赖翻转");
            return $name;
        });
        // console.log(provideObject, "provide");
        onMounted(() => {
            // const styles = [...document.styleSheets];
            // console.log(styles, "styles");
            // styles.forEach(style => {
            //     const rules = [...style.cssRules];
            //     console.log(rules);
            // });
            let worker = new Worker("./worker/index.js");
            worker.onmessage = function ({ data }) {
                // console.log(data, "app");
            };
            worker.onerror = function (err) {
                // console.log(err);
            };
            // worker.postMessage(10);
            // 可选链的操作
            // let op = 0 ?? "hello world";
            // console.log(op);
            // let operation = true;
            // if (operation?.length) {
            //     console.log("next");
            // }
            // let enhanceWebSocket = new EnhanceWebSocket(
            //     "ws://10.0.41.80:50012"
            // );
        });

        let total = ref(0);
        const count = reactive({
            count: 0,
            total: computed(() => total.value + 110),
        });
        let nextCount = computed(() => count.count + 10);
        watchEffect(() => {});

        let obj = { name: "liwuzhou", age: "23" };
        let hasKey = obj.hasOwnProperty("_");
        const handleChange = event => {
            let files = event.target.files;
            console.log(files);
        };

        const handleBlur = event => {
            console.log(event, "blur");
        };

        const handleClick = () => {
            console.log("click");
        };
        const getRef = componentRef => {
            console.log(componentRef);
        };
        return {
            onStateChange: function () {
                console.log("hello world");
            },
            component: Print,
            handleChange,
            handleBlur,
            handleClick,
            getRef,
        };
    },
};
</script>
