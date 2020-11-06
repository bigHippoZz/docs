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
    this.factory.createProductA()
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
