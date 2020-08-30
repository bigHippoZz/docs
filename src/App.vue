<template>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
    <Images />
    <Height />
    <HoverUnderlineAnimation />
    <Box _name="box" id="webf23j2b3bhb54" :total='10'></Box>
    <!-- <App/> -->
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
// import HelloWorld from './components/HelloWorld.vue'
import Images from "./components/Images.vue";
import Height from "./components/Height.vue";
import HoverUnderlineAnimation from "./components/HoverUnderlineAnimation.vue";
// import "./utils/extends.js";
import "./utils/store";
import main from "./main.json";

import Box from "./components/Box.vue";
import LoadConfigurationFile, { log } from "./utils/Load-configuration-file";

export default {
    name: "App",
    components: {
        // HelloWorld,
        Images,
        Height,
        HoverUnderlineAnimation,
        Box,
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
        });
        let total = ref(0);
        const count = reactive({
            count: 0,
            total: computed(() => total.value + 110),
        });
        // console.log(count);
        let nextCount = computed(() => count.count + 10);
        watchEffect(() => {
            // console.log(count.count);
            // console.log($name.name, "$name");
            // console.log(count.count);
            // console.log(nextCount.value);
        });
        class oneselfObject {
            constructor(data) {
                this.data = data;
                this.data[this.data.length - 2] = { value: "no- empty" };
            }

            findItemMemo() {
                if (!this.findItem) {
                    this.findItem = this.data.find(i => !!i.value);
                }
                return this.findItem;
            }
        }

        // console.log();
        let object = new oneselfObject(Array(100).fill({ value: null }));
        // console.time("for start");

        for (let index = 0; index < 1000; index++) {
            object.findItemMemo();
            // const element = array[index];
        }

        // console.timeEnd("for start");

        // console.time("for end");

        for (let index = 0; index < 1000; index++) {
            object.findItemMemo();
            // const element = array[index];
        }

        // console.timeEnd("for end");

        // console.log(getURLParameters())
        let obj = { name: "liwuzhou", age: "23" };
        // hasownproperty
        // hasownproperty
        let hasKey = obj.hasOwnProperty("_");
        // console.log(hasKey);
        // console.log(Object.entries(obj));
        // console.log(Object.prototype.toString.call({}));

        // console.log(testObject)
        // console.log(new oneself());

        // console.log(objectToQueryString('string '))

        // setTimeout(() => {
        //   // count.total = 1230
        //   // total.value = 1000;
        //   count.count =1000
        // }, 2000);

        // setInterval(() => {
        //   count.count++;
        // }, 1000);
    },
};
</script>
