import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/global'
import "./utils/index.ts";
createApp(App)
  .use(store)
  .use(router)
  .mount("#app");

const contextReactive = require.context("./reactive", true, /\.ts$/);
contextReactive.keys().forEach((file) => contextReactive(file));

const dataStructure = require.context("./dataStructure", true, /\.[j,t]s$/);
dataStructure.keys().forEach((file) => dataStructure(file));

const complier = require.context("./complier", true, /\.[j,t]s$/);
complier.keys().forEach((file) => complier(file));

const algorithm = require.context("./algorithm", true, /\.[j,t]s$/);
algorithm.keys().forEach((file) => algorithm(file));
