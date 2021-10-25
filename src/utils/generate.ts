/**
 * 生成随机字符串
 */
export const randomString = (num: number) => {
	num = num || 32;
	const string = "abcdefhijkmnprstwxyz12345678";
	const len = string.length;
	let result = "";
	for (let i = 0; i < num; i++) {
		result += string.charAt((Math.random() * len) >>> 0);
	}
	return result;
};

/**
 * 生成随机数
 * @param min
 * @param max
 * @returns
 */
export function generateRandom(min: number, max: number) {
	return Math.round(Math.random() * (max - min)) + min;
}

/**
 * 生成随机的UUID
 * @returns
 */
export function uuid4() {
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (c) => {
		// eslint-disable-next-line no-bitwise
		const r = (Math.random() * 16) | 0;
		// eslint-disable-next-line no-bitwise
		const v = c === "x" ? r : (r & 0x3) | 0x8;
		return v.toString(16);
	});
}

/**
 * 返回测试数据
 * @param fileName string
 * @returns
 */
export const fetchData = async (fileName: string) => {
	const response = await fetch(`./data/${fileName}`);
	return await response.text();
};
