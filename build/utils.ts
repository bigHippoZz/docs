export function wrapperEnv(envConf: Recordable): ViteEnv {
	const result: ViteEnv = Object.create(null);
	Object.keys(envConf).forEach((key) => {
		let value = envConf[key].replace("\\n", "\n");
		value = value === "true" ? true : value === "false" ? false : value;

		if (key === "VITE_PORT") {
			value = isNaN(Number(value)) ? 4397 : Number(value);
		}
		if (key === "VITE_PROXY" && key) {
			try {
				value = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				value = "";
			}
		}
		result[key] = value;
	});
	return result;
}
