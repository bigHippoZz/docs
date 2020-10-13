enum Color {
    Blue,
    Red,
}

let color: Color = Color.Red;
console.log(color);

// 并不知道当前变量的类型 可能是有用户传入 或者api传入
let noSure: unknown = 10;
noSure = false;
console.log(noSure);
// 类型变量any允许您访问任意属性，即使不存在也是如此。这些属性包括函数，并且TypeScript不会检查它们的存在或类型：

let looselyTyped: any;

// looselyTyped.Red()

let strictTyped: unknown;
// strictTyped.logo()

// never 通常用于返回错误
function logError(msg: string): never {
    throw new Error(msg);
}

// 类型断言 比如你清楚当前的变量类型
let someValue: unknown = " this is  string";
let stringLength = (someValue as string).length;

/// 关于Number，String，Boolean，Symbol和Object 不建议使用Object 类型

function reverseWords(str: string) {
    return str.repeat(1);
}
// 力扣上的题目会用的到
// console.log('string'.repeat(10))

// 接口

interface LabeledValue {
    label: string;
}

function logLabelValue(obj: LabeledValue): void {
    return console.log(obj);
}

logLabelValue({ label: "label" });

interface Point {
    readonly x: number;
    readonly y: number;
}
let p1: Point = { x: 21, y: 23 };
let a: number[] = [1, 2, 3];
let ro: ReadonlyArray<number> = a;

interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    return {
        color: config.color || "red",
        area: config.width ? config.width * config.width : 20,
    };
}
// 建议使用类型断言进行处理
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

interface Animal {
    name: string;
}

interface Dog extends Animal {
    bread: string;
}

interface NotOkay {
    [propName: string]: Animal;
    [index: number]: Dog;
}

interface NumberOrStringDictionary {
    [propName: string]: string | number;
    length: number;
    name: string;
}

interface ReadonlyStringArray {
    readonly [index: number]: string;
}

// 实例端
// class Clock implements ClockInterface {
//     currentTime: Date = new Date();
//     constructor(n: number, m: number) {}
// }

// function createClock(hour: number, minute: number): ClockInterface {
//     return new Clock(hour, minute);
// }

interface ClockInterface {
    currentTime: Date;
}

// 静态端
interface ClockConstructor {
    new (hour: number, minute: number): ClockInterface;
}
/**
 * 使用类表达式
 */

const Clock: ClockConstructor = class implements ClockInterface {
    currentTime: Date = new Date();
};

// 扩展接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}
interface Square extends Shape, PenStroke {
    sideLength: number;
}

let shape: Square = {} as Square;
// shape.color = "string ";
// shape.sideLength = "string";

// 混合类型
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}

function getCounter(): Counter {
    // 类型断言 强行将传counter转为 Counter
    let counter: Counter = function (start: number): string {
        return "hello world";
    } as Counter;
    counter.interval = 1000;
    counter.reset = function () {};
    return counter;
}

class Conf {
    protected state = {};
    // logger() {}
    handlers() {}
}

interface ExtendConfig extends Conf {
    logger(): void;
}
// 当您创建一个扩展带有私有或受保护成员的类的接口时，该接口类型只能由该类或其子类实现。!!!
class UserConf extends Conf implements ExtendConfig {
    // protected state = {};
    logger() {}
    handlers() {}
}

console.log(new UserConf());

// console.log(globalThis)

const deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
        // console.log(this);
        return this;
    },
};

// console.log(deck.cards)
type Easing = "ease-in" | "ease-out" | "ease-in-out";

interface UiElementInterface {
    addEventListener(onClick: (this: void, e: unknown) => void): void;
}

class UiElement implements UiElementInterface {
    info = "this is UI";
    addEventListener(onClick: (this: void, e: string) => void) {
        onClick("string");
    }
    animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
            console.log("ease-in");
        } else if (easing === "ease-in-out") {
            console.log("ease-in-out");
        }
    }
}

class Handlers {
    name = "handlers";
    handleClick(this: Handlers) {
        console.log(this.name);
    }
}

const uiElement = new UiElement();
const handlers = new Handlers();
// uiElement.addEventListener(() => handlers.handleClick());

// 数字类型 利用类型断言
function rollDice(): 1 | 2 | 3 | 4 | 5 | 6 {
    return Math.floor(Math.random() * 6) as 1 | 2 | 3 | 4 | 5 | 6;
}

interface Bird {
    fly(): void;
    layEggs(): void;
}
interface Fish {
    swim(): void;
    layEggs(): void;
}

type AnimalString = "bird" | "fish";

// 使用类型推断
function getSmallPet(animal: AnimalString): Bird | Fish {
    if (animal === "bird") {
        return { fly() {}, layEggs() {} };
    } else {
        return { swim() {}, layEggs() {} };
    }
}

function isFish(pet: Bird | Fish): pet is Bird {
    return (pet as Bird).fly !== undefined;
}

// getSmallPet('fish')

interface NetworkLoadingState {
    state: "loading";
}
interface NetworkFailedState {
    state: "failed";
}
interface NetworkSuccessState {
    state: "success";
    response: {
        title: string;
        duration: number;
        summary: string;
    };
}
interface NetworkFromCachedState {
    state: "from_cache";
    id: string;
    response: NetworkSuccessState["response"];
}
type NetworkState =
    | NetworkSuccessState
    | NetworkLoadingState
    | NetworkFailedState
    | NetworkFromCachedState;

function logger(state: NetworkState) {
    switch (state.state) {
        case "failed":
            break;
        case "loading":
            break;
        case "success":
            return `Downloaded ${state.response.title} - ${state.response.summary}`;
        default:
            return "this is logger state";
    }
}
// 抽象类
abstract class FloraAndFauna {
    public abstract name: string;
    move(distanceInMeters: number = 0): void {
        console.log(`${this.name} moved ${distanceInMeters}`);
    }
    public abstract printMeeting<T>(message: T): T;
}

class Snake extends FloraAndFauna {
    constructor(public name: string) {
        super();
    }
    printMeeting<T>(message: T): T {
        return message;
    }
    public moveSum() {
        return this.move(100);
    }
}

const snake = new Snake("string");
console.log(snake);

// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}
// 泛型函数 利用Array接口进行判断
function loggingIdentity<T>(arg: Array<T>): Array<T> {
    console.log(arg.length);
    return arg;
}

function getProperty<T, K extends keyof T>(object: T, key: K) {
    return object[key];
}
function create<R, T extends { new (...args: any[]): R }>(c: T): R {
    return new c();
}

class BeeKeeper {
    hasMask!: boolean;
}

class ZooKeeper {
    nameTag!: string;
}

class Animal {
    numLegs!: number;
}

class Bee extends Animal {
    constructor() {
        super();
        this.keeper = {
            hasMask: false,
        };
    }
    keeper!: BeeKeeper;
}

class Lion extends Animal {
    keeper!: ZooKeeper;
}

// const bee = new Bee();
// console.log(bee);

function createInstance<A extends Animal, T extends new (...args: any[]) => A>(
    c: T
): A {
    return new c();
}

// function f(stringOrNull: string | null): string {
//     if (stringOrNull === null) {
//         return "null";
//     } else {
//         return stringOrNull;
//     }
// }

function f(stringOrNull: string | null): string {
    return stringOrNull ?? "default";
}

type Second = number;

type Container<T> = { value: T };

type Tree<T> = {
    readonly key: T;
    readonly left?: Tree<T>;
    readonly right?: Tree<T>;
};

type LinkedList<T> = T & { next: LinkedList<T> };
/**
 * type 创建之后是无法更改的 interface 是可以进行更改
 * 如果您无法使用接口表达某种形状，而需要使用并集或元组类型，则通常使用类型别名
 *  */
function pluck<T, K extends keyof T>(o: T, propNames: K[]): T[K][] {
    return propNames.map(n => o[n]);
}

interface Dictionary<T> {
    [key: string]: T;
}

let keys: keyof Dictionary<number>;

let values: Dictionary<number>["foo"];

interface Person {
    name: string;
    age: number;
}

type PersonPartial = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;

type Keys = "option1" | "option2";
type Flags = { [K in Keys]: boolean };

let option: Flags = {
    option1: false,
    option2: false,
};

type NullablePerson = {
    [P in keyof Person]: Person[P] | null;
};
type PartialPerson = { [P in keyof Person]?: Person[P] };

// type Pick<T, K extends keyof T> = {
//     [P in K]: T[P];
// };

// type Record<K extends keyof any, T> = {
//     [P in K]: T;
// };

// 请注意，它keyof any表示可用作对象索引的任何值的类型。换句话说，keyof any当前等于string | number | symbol。

// function conditionFn<T extends boolean>(
//     x: T
// ): T extends false ? string : number {}

type Nullable<T> = { [P in keyof T]?: T[P] | null };

let nullable: Nullable<string> = "string";
type TypeName<T> = T extends string
    ? "string"
    : T extends number
    ? "number"
    : T extends boolean
    ? "boolean"
    : T extends undefined
    ? "undefined"
    : T extends Function
    ? "function"
    : "object";

type T0 = TypeName<string>;
type T5 = TypeName<string | string[] | undefined>;
// string object undefined

type BoxedValue<T> = { value: T };
type BoxedArray<T> = { value: T[] };
type Boxed<T> = T extends any[] ? BoxedArray<number[]> : BoxedValue<T>;
type Diff<T, U> = T extends U ? never : T; // 从T中删除分配给U的类型
type Filter<T, U> = T extends U ? T : never; // 从T中删除不可分配给U的类型

type T1 = Diff<"a" | "b" | "c" | "d", "a" | "c" | "f">;
type T2 = Filter<"a" | "b" | "c" | "d", "a" | "c" | "f">; // "a" | "c"
type T3 = Diff<number | string | (() => void), Function>;
type T4 = Filter<number | string | (() => void), Function>;

type NotNullable<T> = Diff<T, null | undefined>;
type T50 = NotNullable<string | number | undefined>;
// 当前的x可以为null，undefined的 y则不可以为null undefined
function TNotNullable<T>(x: T, y: NotNullable<T>) {}

type FunctionPropertyNames<T> = {
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type Part = {
    id: number;
    name: undefined;
    subparts: Part[];
    updatePart(): void;
};
type F1 = FunctionPropertyNames<Part>;
// Pick 可以理解为给定指定的key拿到响应的value
type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

// type ReturnType<T>  = T extends (...args:any[])=> inter R ?R : T

type Unpacked<T> = T extends (infer U)[]
    ? U
    : T extends (...args: any[]) => infer U
    ? U
    : T extends Promise<infer U>
    ? U
    : T;

type U0 = Unpacked<string>;
type U1 = Unpacked<string[]>;
type U2 = Unpacked<() => string>;
type U3 = Unpacked<Promise<string>>;
type U4 = Unpacked<Unpacked<Promise<string>>>;

type Foo<T> = T extends { a: infer U; b: infer U } ? U : T;

type K1 = Foo<{ a: number; b: number }>;
type K2 = Foo<{ a: number; b: string }>;
