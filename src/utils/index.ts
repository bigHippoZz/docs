export function logger(msg: unknown): void {
  return console.log(msg);
}

export class ValidatorClass {
  constructor(public name: string) {}
  get [Symbol.toStringTag]() {
    return "ValidatorClass";
  }
}

interface Button {
  text: string;
  loading: boolean;
}

abstract class DialogClass {
  constructor(public factory: AbstractFactory) {}
  public abstract createButton(): Button;
  render() {
    this.factory.createProductA();
    return this.createButton();
  }
}
class CloseDialogButton implements Button {
  text = "关闭";
  loading = false;
}

class CloseDialog extends DialogClass {
  context = "CloseDialog";
  createButton() {
    return new CloseDialogButton();
  }
  onClick() {
    console.log("onClick");
  }
}

interface AbstractFactory {
  createProductA(): Button;
  createProductB(): Button;
}

class ProductAButton implements Button {
  text = "a";
  loading = false;
}
class ProductBButton implements Button {
  text = "b";
  loading = false;
}

class ConcreteFactory1 implements AbstractFactory {
  createProductA() {
    return new ProductAButton();
  }
  createProductB() {
    return new ProductBButton();
  }
}
class ConcreteFactory2 implements AbstractFactory {
  createProductA() {
    return new ProductAButton();
  }
  createProductB() {
    return new ProductBButton();
  }
}
console.log(new CloseDialog(new ConcreteFactory1()));

class Car {
  public parts: string[] = [];
  public listParts() {
    console.log(`${this.parts.join(",")}`);
  }
}
interface Builder {
  reset(): void;
  setGPS(): void;
  setSeats(): void;
  setTitle(): void;
}

class CarBuilder implements Builder {
  public production!: Car;
  constructor() {
    this.reset();
  }
  reset() {
    this.production = new Car();
  }
  setGPS() {
    this.production.parts.push("GPS");
  }
  setSeats() {
    this.production.parts.push("Seats");
  }
  setTitle() {
    this.production.parts.push("Title");
  }
  getProduction() {
    const result = this.production;
    this.reset();
    return result;
  }
}

class Singleton {
  public static instance: Singleton;
  private constructor(...args: unknown[]) {
    console.log(...args);
  }
  public static getInstance(...args: unknown[]): Singleton {
    if (!Singleton.instance) {
      const result = new Singleton();
      Singleton.instance = result;
      return result;
    }
    return Singleton.instance;
  }
}

const s = Singleton.getInstance();
const a = Singleton.getInstance();

class Target {
  public request(): string {
    return 'Target: The default target\'s behavior.';
  }
}

class Adaptee {
  public specificRequest(): string {
    return ".eetpadA eht fo roivaheb laicepS";
  }
}

class Adapter extends Target {
  constructor(private adaptee: Adaptee) {
    super();
  }

  public request(): string {
    const result = this.adaptee
      .specificRequest()
      .split("")
      .reverse()
      .join("");
    return `Adapter: (TRANSLATED) ${result}`;
  }
}

// const target = new Target();

// const adaptee = new Adaptee();

// const adapter = new Adapter(adaptee);

// 不兼容的对象放入适配类中
// console.log(adapter.request(),'adapter')

interface Implementation {
  operationImplementation(): string;
}

class ConcreteImplementationA implements Implementation {
  operationImplementation() {
    return 'ConcreteImplementationA: Here\'s the result on the platform A.';
  }
}
class ConcreteImplementationB implements Implementation {
  operationImplementation() {
    return 'ConcreteImplementationA: Here\'s the result on the platform B.';
  }
}
// 使用变量保存多个维度的变化
class Abstraction {
  private abstract: Implementation;
  constructor(abstract: Implementation) {
    this.abstract = abstract;
  }
  public operations(): string {
    return this.abstract.operationImplementation();
  }
}

interface Component {
  operations(): string;
}
class ConcreteComponent implements Component {
  operations() {
    return "ConcreteComponent";
  }
}

class Decorator implements Component {
  private component: Component;
  constructor(component: Component) {
    this.component = component;
  }
  operations(): string {
    return this.component.operations();
  }
}

class ConcreteDecoratorA extends Decorator {
  operations() {
    return super.operations();
  }
}

class Flyweight {
  private sharedState: any;
  constructor(sharedState: any) {
    this.sharedState = sharedState;
  }
  public operation(uniqueState: unknown): void {
    const s = JSON.stringify(this.sharedState);
    const u = JSON.stringify(uniqueState);
    console.log(`Flyweight: Displaying shared (${s}) and unique (${u}) state.`);
  }
}

class FlyweightFactory {
  private flyweights: { [key: string]: Flyweight } = {};
  constructor(initialFlyweights: Array<Array<string>>) {
    for (const state of initialFlyweights) {
      this.flyweights[this.getKey(state)] = new Flyweight(state);
    }
  }

  private getKey(state: string[]): string {
    return state.join("_");
  }

  public getFlyweight(sharedState: string[]): Flyweight {
    const key = this.getKey(sharedState);
    if (!(key in this.flyweights)) {
      console.log(
        "FlyweightFactory: Can't find a flyweight, creating new one."
      );
      this.flyweights[key] = new Flyweight(sharedState);
    } else {
      console.log("FlyweightFactory: Reusing existing flyweight.");
    }
    return this.flyweights[key];
  }

  public listFlyweights(): void {
    const count = Object.keys(this.flyweights).length;
    console.log(`\nFlyweightFactory: I have ${count} flyweights:`);
    for (const key in this.flyweights) {
      console.log(key);
    }
  }
}

const factory = new FlyweightFactory([
  ["Chevrolet", "Camaro2018", "pink"],
  ["Mercedes Benz", "C300", "black"],
  ["Mercedes Benz", "C500", "red"],
  ["BMW", "M5", "red"],
  ["BMW", "X6", "white"],
  // ...
]);

function addCarToPoliceDatabase(
  ff: FlyweightFactory,
  plates: string,
  owner: string,
  brand: string,
  model: string,
  color: string
) {
  console.log("\nClient: Adding a car to database.");
  const flyweight = ff.getFlyweight([brand, model, color]);
  // The client code either stores or calculates extrinsic state and passes it
  // to the flyweight's methods.
  flyweight.operation([plates, owner]);
}
// addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "M5", "red");
// addCarToPoliceDatabase(factory, "CL234IR", "James Doe", "BMW", "X1", "red");
// factory.listFlyweights();

// console.log(factory);

interface Command {
  execute(): void;
}

class SimpleCommand implements Command {
  private payload: string;
  constructor(payload: string) {
    this.payload = payload;
  }
  execute(): void {
    console.log(`simple: do someting ${this.payload}`);
  }
}

class ComplexCommand implements Command {
  private receiver: Receiver;
  private a: string;
  private b: string;
  constructor(receiver: Receiver, a: string, b: string) {
    this.receiver = receiver;
    this.a = a;
    this.b = b;
  }
  execute(): void {
    console.log(
      "ComplexCommand: Complex stuff should be done by a receiver object."
    );
    this.receiver.dosomething(this.a);
    this.receiver.doSomethingElse(this.b);
  }
}

class Receiver {
  dosomething(a: string) {
    console.log("a", a);
  }
  doSomethingElse(b: string) {
    console.log("b", b);
  }
}

class Invoke {
  private onStart!: Command;
  private onEnd!: Command;
  setOnStart(command: Command): void {
    this.onStart = command;
  }
  setOnFinish(command: Command): void {
    this.onEnd = command;
  }
  doSomethingImportant() {
    if (this.isCommand(this.onStart)) {
      this.onStart.execute();
    }
    if (this.isCommand(this.onEnd)) {
      this.onEnd.execute();
    }
  }
  private isCommand(object: unknown): object is Command {
    return (object as Command)?.execute !== undefined;
  }
}

// const invoke  = new Invoke()
// const receiver = new Receiver()
// const command = new ComplexCommand(receiver,'a','b')
// invoke.setOnStart(command)
// invoke.doSomethingImportant()




// 将具体业务有中介者进行分发，组件只负责处理事件
interface Mediator {
  notify(): void;
}


class BaseMediator implements Mediator {
  notify() {
    console.log("notify");
  }
}
