import { isFunction } from "lodash";
import { getGlobalObject } from ".";

const global = getGlobalObject<Window>();

export function supportsFetch() {
	if (!("fetch" in global)) {
		return false;
	}
	try {
		new Response();
		new Headers();
		new Request("");
		return true;
	} catch (_error) {
		return false;
	}
}

/**
 * 判断当前是不是原生fetch
 * @param fetchImp
 * @returns
 */
export function isNativeFetch(fetchImp: Function) {
	return (
		fetchImp &&
		/^function\s+fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(
			fetchImp.toString(),
		)
	);
}
/**
 * 判断当前浏览器是否支持原生fetch
 * @returns
 */
export function supportsNativeFetch() {
	if (!supportsFetch()) {
		return false;
	}

	if (isNativeFetch(global.fetch)) {
		return true;
	}
	let result = false;
	try {
		const doc = global.document;
		if (doc && isFunction(doc?.createElement)) {
			const sandbox = document.createElement("iframe");
			sandbox.hidden = true;
			doc.head.appendChild(sandbox);
			result = isNativeFetch(sandbox.contentWindow?.fetch!);
			doc.head.removeChild(sandbox);
		}
	} catch (error) {
		console.log(
			`Could not create sandbox iframe for pure fetch check, bailing to window.fetch: `,
			error,
		);
	}
	return result;
}

export type FetchImp = typeof fetch;

let cacheFetchImp: FetchImp;

export function getNativeFetchImplementation(): FetchImp {
	if (cacheFetchImp) {
		return cacheFetchImp;
	}

	if (isNativeFetch(global.fetch)) {
		return (cacheFetchImp = global.fetch.bind(global));
	}
	let fetchImp = global.fetch;
	try {
		const doc = global.document;
		if (doc && isFunction(doc?.createElement)) {
			const sandbox = document.createElement("iframe");
			sandbox.hidden = true;
			doc.head.appendChild(sandbox);
			if (sandbox.contentWindow?.fetch) {
				fetchImp = sandbox.contentWindow?.fetch;
			}
			doc.head.removeChild(sandbox);
		}
	} catch (error) {
		console.log(
			`Could not create sandbox iframe for pure fetch check, bailing to window.fetch: `,
			error,
		);
	}
	return (cacheFetchImp = fetchImp.bind(global));
}
