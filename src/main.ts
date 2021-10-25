import { createApp } from "vue";
import { setupImportFile, registerComponent } from "./plugins";
import { setupAppRouter } from "./routers";
import App from "./App.vue";

const app = createApp(App);

setupAppRouter(app);

setupImportFile();

registerComponent(app);

app.mount("#app");
