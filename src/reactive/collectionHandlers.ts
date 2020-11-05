import { isObject } from "@/shared";
import { readonly } from "vue";
import { ITERATE_KEY } from "./baseHandlers";
import { track } from "./effect";
import { TrackOpTypes } from "./operations";
import { reactive, ReactiveFlags, toRaw } from "./reactive";

type CollectionType = IterableCollections | WeakCollections;
type IterableCollections = Map<any, any> | Set<any>;
type WeakCollections = WeakMap<any, any> | WeakSet<any>;
type MapTypes = Map<any, any> | WeakMap<any, any>;
type SetTypes = Set<any> | WeakSet<any>;
const toShallow = <T extends unknown>(value: T): T => value;

const toReactive = <T extends unknown>(value: T): T =>
  isObject(value) ? reactive(value) : value;

const toReadonly = <T extends unknown>(value: T): T =>
  isObject(value) ? readonly(value as Record<any, any>) : value;

const getProto = <T extends CollectionType>(value: T): any =>
  Reflect.getPrototypeOf(value);

function get(
  target: MapTypes,
  key: unknown,
  isReadonly = false,
  isShallow = false
) {
  target = (target as any)[ReactiveFlags.RAW];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, TrackOpTypes.GET, key);
  }
  !isReadonly && track(rawTarget, TrackOpTypes.GET, rawKey);
  const { has } = getProto(rawTarget);
  const wrap = isReadonly ? toReadonly : isShallow ? toShallow : toReactive;
  if (has.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  }
}

function has(this: CollectionType, key: unknown, isReadonly = false) {
  const target = (this as any)[ReactiveFlags.RAW];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly && track(rawTarget, TrackOpTypes.HAS, key);
  }
  !isReadonly && track(rawTarget, TrackOpTypes.HAS, rawKey);
  return key === rawKey
    ? target.has(key)
    : target.has(key) || target.has(rawKey);
}

function size(target: IterableCollections, isReadonly = false) {
  target = (target as any)[ReactiveFlags.RAW];
  !isReadonly && track(toRaw(target), TrackOpTypes.ITERATE, ITERATE_KEY);
  return Reflect.get(target,'size',target)
}


function add(this:SetTypes,value:unknown){
    
}
