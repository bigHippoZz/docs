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

const target = new Target();

const adaptee = new Adaptee();

const adapter = new Adapter(adaptee);

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
    return this.abstract.operationImplementation()
  }
}


