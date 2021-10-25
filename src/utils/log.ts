import { isFunction } from "lodash";
import { getGlobalObject } from "./global";

export interface WrapperFunction extends Function {
	[key: string]: any;
	__viper__?: boolean;
	__viperOrigin__?: WrapperFunction;
	__viperWrapper__?: WrapperFunction;
}

// 获取全局对象
const globalObject = getGlobalObject<typeof globalThis>();

// logger 前缀
const PREFIX = "Viper";

function sandboxConsole(callback: () => void): void {
	const globalObject = getGlobalObject<typeof globalThis>();

	const levels = ["debug", "info", "warn", "error", "log", "assert"] as const;

	if (Reflect.has(globalObject, "console")) {
		return callback();
	}

	const originalConsole = (globalObject as any).console;

	const wrappedLevels: Record<string, any> = Object.create(null);

	// execution
	callback();
}

interface ViperLoggerOptions {
	log?(): void;
	warn?(): void;
	error?(): void;
}

class Logger {
	// 开关
	private _enabled = false;

	constructor(public options: ViperLoggerOptions) {
		// 初始值为 false
		this._enabled = false;
	}

	disable() {
		this._enabled = false;
	}

	enable() {
		this._enabled = true;
	}

	log(...args: any[]): void {
		if (!this._enabled) {
			return;
		}
		// 放入沙盒进行执行
		sandboxConsole(() => {
			globalObject.console.log(`${PREFIX}[log]: ${args.join(" ")}`);
		});
	}

	warn(...args: any[]): void {
		if (!this._enabled) {
			return;
		}
		sandboxConsole(() => {
			globalObject.console.warn(`${PREFIX}[warn]: ${args.join(" ")}`);
		});
	}

	error(...args: any[]): void {
		if (!this._enabled) {
			return;
		}
		sandboxConsole(() => {
			globalObject.console.error(`${PREFIX}[error]: ${args.join(" ")}`);
		});
	}
}

export function printVarInFunc(
	varName: string,
	functionName: string | Function,
	variable: any
) {
	const color = ["#000", "#FF00E4", "#000", "#2080f0", "#000"].map(
		(item) => "color:" + item
	);
	if (isFunction(functionName)) {
		functionName = functionName.name;
	}
	console.log(
		`%c[log]:variable %c'${varName}' %cin Function %c'${functionName}'%c ->`,
		...color,
		variable
	);
}
