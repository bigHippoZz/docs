import { ConfigEnv, defineConfig, loadEnv, UserConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import vueJsx from "@vitejs/plugin-vue-jsx";
import pkg from "./package.json";
import dayjs from "dayjs";
import { generateModifyVars } from "./build/generate/generateModifyVars";
import { wrapperEnv } from "./build/utils";
import { createProxy } from "./build/vite/proxy";

const { dependencies, devDependencies, version, name } = pkg;
const __APP_INFO__ = {
	pkg: { dependencies, devDependencies, version, name },
	lastBuildTime: dayjs().format("YYYY-MM-DD hh:mm:ss"),
};

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
	const root = process.cwd();
	const env = loadEnv(mode, root);
	const viteEnv = wrapperEnv(env);
	const { VITE_PORT, VITE_PROXY } = viteEnv;
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

		css: {
			preprocessorOptions: {
				less: {
					modifyVars: generateModifyVars(),
					javascriptEnabled: true,
				},
			},
		},
		server: {
			host: true,
			port: VITE_PORT,
			proxy: createProxy(VITE_PROXY),
		},
	};
};
