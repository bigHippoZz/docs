import { createApp } from "vue";
import { setupImportFile, registerComponent } from "./plugins";
import { setupAppRouter } from "./routers";
import App from "./App.vue";

setupImportFile();

const app = createApp(App);

setupAppRouter(app);

registerComponent(app);

app.mount("#app");
