export type ProxyList = [string, string][];
export const httpREG = /^https:\/\//;

export const createProxy = (serviceList: ProxyList) => {
	const result: Recordable = Object.create(null);

	for (const [prefix, target] of serviceList) {
		const isHttps = httpREG.test(target);
		result[prefix] = {
			target: target,
			changeOrigin: true,
			ws: true,
			rewrite: (path: string) =>
				path.replace(new RegExp(`^${prefix}`), ""),
			// https is require secure=false
			...(isHttps ? { secure: false } : {}),
		};
	}
	return result;
};
