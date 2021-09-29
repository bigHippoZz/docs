import { createApp } from "vue";
import App from "./App.vue";
import { setupAppRouter } from "./routers";
const app = createApp(App);
setupAppRouter(app);
app.mount("#app");
