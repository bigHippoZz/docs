import { createApp } from "vue";
import App from "./App.vue";
import { setupImportFile } from "./plugins/algo";
import { setupAppRouter } from "./routers";

const app = createApp(App);

setupImportFile();
setupAppRouter(app);
app.mount("#app");
