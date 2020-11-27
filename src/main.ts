import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./utils/index.ts";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

const contextReactive = require.context("./reactive", true, /\.ts$/);
contextReactive.keys().forEach((file) => contextReactive(file));

const dataStructure = require.context("./dataStructure", true, /\.ts$/);
dataStructure.keys().forEach((file) => dataStructure(file));


const complier = require.context("./complier", true, /\.ts$/);
complier.keys().forEach((file) => complier(file));


const algorithm = require.context("./algorithm", true, /\.ts$/);
algorithm.keys().forEach((file) => algorithm(file));