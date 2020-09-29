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
import "./static/AVLTree.js";
import "./index.css";
import "./algorithm.js";
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

        return {
            btnList: BTN_LIST,
        };
    },
};
</script>
