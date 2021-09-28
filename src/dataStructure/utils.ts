export type IEqualsFunction<T> = (a: T, b: T) => boolean;

export const defaultEquals = <T>(a: T, b: T) => a === b;
