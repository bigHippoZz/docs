import { isFunction, isObject } from "lodash";

export const requestProxy = async (...args: [url: string, ...rest: any[]]) => {
  const result = await fetch(...args);
  if (result.ok) {
    return result.json();
  }
  return new Error(result.statusText);
};

export const isPromise = (fn: unknown): fn is Promise<unknown> =>
  // @ts-ignore
  isObject(fn) && isFunction(fn.then) && isFunction(fn.catch);
