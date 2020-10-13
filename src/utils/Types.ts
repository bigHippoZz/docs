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

/**
 * type Partial<T>
 * 将T中所有属性设置为可选属性 一般用于object.assign
 * @var Partial
 */

type Todo = {
    name: string;
    title: string;
};
type PartialTodo = Partial<Todo>;

/**
 * type Readonly<T>
 * 将T中所有的属性都设置为readonly
 * @var Readonly
 */
type ReadonlyTodo = Readonly<Todo>;
/**
 * type Records<Keys,Type>
 * 将Keys中所有key转为Type类型
 * @var Record
 */
type RecordTodo = Record<keyof Todo, string>;

/**
 * type Pick<Type,Keys>
 * 从Keys中选择属性来构造Type
 * @var Pick
 */
type Todo3 = {
    about: string;
    title: string;
    name: number;
};
type PickTodo = Pick<Todo3, keyof Todo>;

/**
 * type Omit<Type,Keys>
 * 从Keys中移除属性来构造Type，与Pick相反
 * @var Omit
 */
type OmitTodo = Omit<Todo3, keyof Todo>;

/**
 * type Exclude<Type, ExcludedUnion>
 * 通过从Type可分配给的所有联合成员中排除来构造类型ExcludedUnion。
 * exclude 不包括
 * @var Exclude
 */
type ExcludeTodo = Exclude<"a" | "b", "a">;

/**
 * type Extract<Type, Union>
 * 通过从Type可分配给的所有联合成员中提取来构造类型Union。
 * Extract 摘录 提取
 * @var Extract
 */
type UnionTodo = Extract<"a" | "b", "a">;

/**
 * type NonNullable<Type>
 * 从Type中排除null undefined
 * @var NonNullable
 */
type NonNullableTodo = NotNullable<Todo>;

/**
 * type Parameters<Type>
 * 从函数类型的参数中使用类型构造一个元组类型Type
 * @var Parameters
 */

type func = (x: string, y: Todo) => void;
type ParametersTodo = Parameters<func>;

/**
 * type ReturnType<Type>
 * 构造一个由函数的返回类型组成的类型Type。
 * @var ReturnType
 */
type ReturnTypeFunc = ReturnType<func>;

/**
 * type Required<Type>
 * 构造一个类型，该类型由Type的所有属性设置为required与Partial
 * @var Required
 */

type Todo4 = {
    name?: string;
    title?: string;
};
type RequiredTodo = Required<Todo4>;

/**
 * type InstanceType<Type>
 * 在中构造一个由构造函数的实例类型组成的类型Type。
 * @var InstanceType
 */
class C {
    x = 1;
    y = 1;
}
type InstanceTypeC = InstanceType<typeof C>;
