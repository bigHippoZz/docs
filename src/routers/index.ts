import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

import Demo from "@/views/Demo.vue";
import { App } from "@vue/runtime-dom";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: Demo,
    name: "Demo",
  },
];

const router = createRouter({
  history: createWebHashHistory("/"),
  routes: routes,
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupAppRouter(app: App) {
  app.use(router);
  return app;
}
