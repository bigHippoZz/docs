class Stack {
  private stack: Array<any>;
  private index: number;
  constructor() {
    this.stack = [];
    this.index = -1;
  }
  push(value: unknown) {
    this.stack.push(value);
    this.index++;
  }
  pop() {
    if (this.index < 0) return;
    this.stack.pop();
    this.index--;
  }
  top() {
    return this.stack[this.index];
  }
  length() {
    return this.index + 1;
  }
}

class MinStack {
  stack: Array<number>;
  minStack: Array<number>;
  constructor() {
    this.stack = [];
    this.minStack = [Infinity];
  }
  push(value: number) {
    this.stack.push(value);
    this.minStack.push(
      Math.min(this.minStack[this.minStack.length - 1], value)
    );
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() {
    return this.stack[this.stack.length];
  }
  getMin() {
    return this.minStack[this.minStack.length - 1];
  }
}

// 可以利用指针进行判断栈顶
const minStack = new MinStack();
