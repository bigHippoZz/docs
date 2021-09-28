import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import pkg from "./package.json";
import dayjs from "dayjs";
const resolve = (dir: string) => {
  return path.join(__dirname, dir);
};

const { dependencies, devDependencies, version, name } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, version, name },
  lastBuildTime: dayjs().format("YYYY-MM-DD hh:mm:ss"),
};

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  console.log(root, env);
  return {
    plugins: [vue(), vueJsx()],
    define: {
      __DEV__: process.env.NODE_EN !== "production",
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    resolve: {
      alias: {
        "@": resolve("src"),
      },
    },
  };
};
