<template>
    <NavBar />
    <Verse />
    <Layout>
        <ArticleList v-for="(item, index) in 10" :key="index" />
    </Layout>
    <Footer  />
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
import "./index.css";
// import "./main.less";
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
        let $name = reactive({
            name: "liwuzhou",
        });
        LoadConfigurationFile();
        const provideObject = provide("provide", function (imagesRef) {
            return $name;
        });
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
        const handleLinkClick = event => {
            console.log(event);
        };
        const handleClickAuthor = () => {
            location.href = AUTHOR_LINK;
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
            handleLinkClick,
            handleClickAuthor,
        };
    },
};
</script>
