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
