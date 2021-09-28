import { isFunction, isPlainObject, isString } from "lodash";
import { IService } from "./typings";
import { isPromise, requestProxy } from "./core";

const generateService = <D, P extends unknown[]>(
  service: IService<D, P>
): (() => Promise<D>) | ((...args: P) => Promise<D>) => {
  return async function (...args: P) {
    if (isFunction(service)) {
      return generateService(service(...args))();
    } else if (isPromise(service)) {
      return service;
    } else if (isString(service)) {
      return requestProxy(service);
    } else if (isPlainObject(service)) {
      const { url, ...rest } = service;
      return requestProxy(url, rest);
    } else {
      throw new Error(" unknown  service type  ");
    }
  };
};
export default generateService;
