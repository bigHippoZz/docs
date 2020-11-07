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
    console.log(...args)
  }
  public static getInstance(...args: unknown[]): Singleton {
    if (!Singleton.instance) {
      const result = new Singleton
      Singleton.instance = result
      return result
    }
    return Singleton.instance;
  }
}

const s = Singleton.getInstance()
const a = Singleton.getInstance()
// console.log(a===s)

/**
 * The Target defines the domain-specific interface used by the client code.
 */
class Target {
  public request(): string {
      return 'Target: The default target\'s behavior.';
  }
}

/**
* The Adaptee contains some useful behavior, but its interface is incompatible
* with the existing client code. The Adaptee needs some adaptation before the
* client code can use it.
*/
class Adaptee {
  public specificRequest(): string {
      return '.eetpadA eht fo roivaheb laicepS';
  }
}

/**
* The Adapter makes the Adaptee's interface compatible with the Target's
* interface.
*/
class Adapter extends Target {
  private adaptee: Adaptee;

  constructor(adaptee: Adaptee) {
      super();
      this.adaptee = adaptee;
  }

  public request(): string {
      const result = this.adaptee.specificRequest().split('').reverse().join('');
      return `Adapter: (TRANSLATED) ${result}`;
  }
}

/**
* The client code supports all classes that follow the Target interface.
*/
function clientCode(target: Target) {
  console.log(target.request());
}

console.log('Client: I can work just fine with the Target objects:');
const target = new Target();
clientCode(target);

console.log('');

const adaptee = new Adaptee();
console.log('Client: The Adaptee class has a weird interface. See, I don\'t understand it:');
console.log(`Adaptee: ${adaptee.specificRequest()}`);

console.log('');

console.log('Client: But I can work with it via the Adapter:');
const adapter = new Adapter(adaptee);
clientCode(adapter);



