import { createApp } from "vue";
import App from "./App.vue";
createApp(App).mount("#app");

const a = import.meta.globEager("./algorithm/**/*");
const b = import.meta.globEager("./complier/**/*");
const c = import.meta.globEager("./dataStructure/**/*");
const d = import.meta.globEager("./global/**/*");
const e = import.meta.globEager("./reactive/**/*");
