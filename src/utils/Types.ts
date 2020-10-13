/**
 * 从T中删除分配给U的类型
 */
export type Diff<T, U> = T extends U ? never : T;
/**
 *  从T中删除不可分配给U的类型
 */
export type Filter<T, U> = T extends U ? T : never;

/**
 *  从T中删除分配给 null undefined的类型
 */
export type NotNullable<T> = Diff<T, null | undefined>;

/**
 * 从T中删除不可分配给Function的类型
 */
export type FunctionFilter<T> = Filter<T, Function>;
