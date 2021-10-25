import { isFunction } from "lodash";
import { ViperError } from "./error";
import { isPrimitive } from "./is";

export interface WrappedFunction extends Function {
	[key: string]: any;
	viper?: boolean;
	__viper_origin__?: WrappedFunction;
	__viper_wrapped__?: WrappedFunction;
}

// 机制 合成 匿名
export interface Mechanism {
	type: string;
	handled: boolean;
	data: Recordable;
	synthetic?: boolean;
}

let ignoreOnError: number = 0;

export function ignoreNextError() {
	ignoreOnError += 1;
	setTimeout(() => {
		ignoreOnError -= 1;
	});
}

export function shouldIgnoreOnError() {
	console.log(ignoreOnError);
	return ignoreOnError > 0;
}

export function fill(
	target: any,
	name: string,
	replacementFactory: (...args: any[]) => any,
): void {
	if (!Reflect.has(target, name)) {
		throw new ViperError("current name is not a valid record");
	}

	if (isPrimitive(target)) {
		return;
	}

	const original = target[name];

	const wrapped = replacementFactory(original);

	if (isFunction(wrapped)) {
		try {
			wrapped.prototype = wrapped.prototype ?? {};
			Object.defineProperties(wrapped, {
				__viper_origin__: {
					enumerable: false,
					value: original,
				},
			});
		} catch (_error) {}
	}

	target[name] = wrapped;
}

export function wrap(
	fn: WrappedFunction,
	options: { mechanism?: Mechanism } = {},
	before?: WrappedFunction,
) {
	// 1.判断是否执行过wrap
	// 2.拷贝fn中的属性和方法 不限制于原型
	// 3.进行双向引用
	// 4.更改函数名字

	// wrap
	if (typeof fn !== "function") {
		return;
	}

	try {
		// wrapped fn
		if (fn.viper) {
			return fn;
		}

		// original fn
		if (fn.__viper_wrapped__) {
			return fn.__viper_wrapped__;
		}
	} catch (_error) {
		return fn;
	}

	const viperWrappedFunction: WrappedFunction = function (this: any) {
		const args = [].slice.call(arguments, 0);

		try {
			if (before && isFunction(before)) {
				before.apply(this, args);
			}

			const wrappedArguments = args.map((arg) => wrap(arg, options));

			if (fn.handleEvent) {
				return fn.handleEvent(this, wrappedArguments);
			}
			return fn.apply(this, wrappedArguments);
		} catch (error) {
			console.log(error);
			ignoreNextError();
			throw error;
		}
	};

	try {
		for (const propertyName in fn) {
			if (Object.prototype.hasOwnProperty.call(fn, propertyName)) {
				viperWrappedFunction[propertyName] = fn[propertyName];
			}
		}
	} catch (_error) {}

	// 初始化fn prototype
	fn.prototype = fn.prototype || {};
	// 变更viperWrappedFunction原型
	viperWrappedFunction.prototype = fn.prototype;

	Object.defineProperty(fn, "__viper_wrapped__", {
		enumerable: false,
		value: viperWrappedFunction,
	});

	Object.defineProperties(viperWrappedFunction, {
		viper: { enumerable: false, value: true },
		__viper_origin__: {
			enumerable: false,
			value: fn,
		},
	});

	try {
		const descriptor = Object.getOwnPropertyDescriptor(
			viperWrappedFunction,
			"name",
		) as PropertyDescriptor;

		if (descriptor.configurable) {
			Object.defineProperty(viperWrappedFunction, "name", {
				get(): string {
					return fn.name;
				},
			});
		}
	} catch (_error) {}
	return viperWrappedFunction;
}

const defaultFunctionName = "<anonymous>";

/**
 * 获取函数名称
 * @param fn
 * @returns
 */
export function getFunctionName(fn: unknown): string {
	try {
		if (isFunction(fn)) {
			return fn.name ?? defaultFunctionName;
		}
		return defaultFunctionName;
	} catch (_error) {
		return defaultFunctionName;
	}
}
