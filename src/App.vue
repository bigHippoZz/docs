<template>
    <NavBar :btn-list="btnList" />
    <Verse />
    <Layout>
        <ArticleList v-for="(item, index) in 10" :key="index" />
    </Layout>
    <Footer :btn-list="btnList" />
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
import Layout from "./components/Layout.vue";
import Images from "./components/Images.vue";
import Height from "./components/Height.vue";
import HoverUnderlineAnimation from "./components/HoverUnderlineAnimation.vue";
import Print from "./components/Print.vue";
import NavBar from "./view/NavBar.vue";
import ArticleList from "./view/ArticleList.vue";
import Footer from "./view/Footer.vue";
import Verse from "./components/Verse.vue";
import Box from "./components/Box.vue";
import Input from "./components/Input.vue";
import LoadConfigurationFile, { log } from "./utils/Load-configuration-file";
import BufferedInput from "./library/BufferedInput-hoc.vue";
import "./utils/store.js";
import main from "./main.json";
import { EnhanceWebSocket } from "./utils/webSocket.js";
import "./extends/ref.js";
import "./static/Stack.js";
import "./static/Set.js";
import "./static/Map.js";
import "./static/LinkedList.js";

import "./static/BinarySearchTree.js";
import "./index.css";

import { createStore } from "redux";
// 作者链接
const AUTHOR_LINK = "https://github.com/bigHippoZz";
export default {
    name: "App",
    components: {
        Images,
        Height,
        HoverUnderlineAnimation,
        Box,
        Input,
        Print,
        BufferedInput,
        NavBar,
        ArticleList,
        Layout,
        Verse,
        Footer,
    },
    setup() {
        const BTN_LIST = ["VUE", "REDUX", "SCHEDULE", "GUIDE", "Summary"];
        LoadConfigurationFile();
        const string = "参数[number,num,string]参数";
        const pattern = /^.*\[(.+?)\].*$/;
        // console.log(string.match(pattern)[1].split(","));
        // console.log(string.replace(/\[.+?\]/,10));

        function handle(nums) {
            if (nums.length === 0) {
                return -1;
            }

            if (nums.length === 1) {
                return 0;
            }

            // 初始索引为 0, 计算索引两边的和, 右边部分的和可以通过 reduce 计算
            let leftPartSum = 0;
            let rightPartSum = nums
                .slice(1)
                .reduce((sum, num) => (sum += num), 0);
            console.log(rightPartSum, "start");
            for (let i = 0; i < nums.length; i++) {
                console.log(nums[i], "nums");
                //  比较左侧和与右侧合值的是否相同 注意和值是在不断变化
                if (leftPartSum === rightPartSum) {
                    return i;
                }

                leftPartSum += nums[i];

                if (nums[i + 1]) {
                    rightPartSum -= nums[i + 1];
                    // console.log(rightPartSum,'rightPartSum')
                }
            }

            return -1;
        }


        console.log(handle([3,2,2,2,1]));

        return {
            btnList: BTN_LIST,
        };
    },
};
</script>
