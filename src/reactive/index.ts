import { toRawType } from "../shared/index";
export const enum ReactiveFlags {
  SKIP = "__v_skip",
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly",
  RAW = "__v_raw",
}

export interface Target {
  [ReactiveFlags.SKIP]: boolean;
  [ReactiveFlags.IS_REACTIVE]: boolean;
  [ReactiveFlags.IS_READONLY]: boolean;
  [ReactiveFlags.RAW]: any;
}

export const reactiveMap = new WeakMap<Target, any>();
export const readonlyMap = new WeakMap<Target, any>();

export const enum TargetType {
  INVALID = 0,
  COMMON = 1,
  COLLECTION = 2,
}

function targetTypeMap(rawType: string) {
  switch (rawType) {
    case "Object":
    case "Array":
      return TargetType.COMMON;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return TargetType.COLLECTION;
    default:
      return TargetType.INVALID;
  }
}

// 判断一个对象是不是可扩展对象,是否可以在它上面添加新的属性
// Object.isExtensible({})
console.log(Object.isExtensible({}));

function getTargetType(value: Target) {
  return value[ReactiveFlags.SKIP] || !Object.isExtensible(value)
    ? TargetType.INVALID
    : targetTypeMap(toRawType(value));
}





function createReactiveObject(target:Target,isReadonly:boolean,baseHandlers:ProxyHandler<any>,collectionHandlers:ProxyHandler<any>){
    
}
 
export function reactive(target:object){

    if(target&&(target as Target)[ReactiveFlags.IS_READONLY] ){
        return target
    }
    return
}


