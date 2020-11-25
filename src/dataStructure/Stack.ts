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
// 用栈实现队列

class QueueForTwoStack<T> {
  private stack: T[];
  private helperStack: T[];
  private popElement: T | null;
  constructor() {
    this.stack = [];
    this.helperStack = [];
    this.popElement = null;
  }
  push(val: T) {
    if (!this.stack.length) this.popElement = val;
    this.stack.push(val);
  }
  pop() {
    let target = null;

    while (this.stack.length) {
      this.helperStack.push(this.stack.pop() as T);
    }
    if (this.helperStack.length) {
      target = this.helperStack.pop();
      this.popElement = this.helperStack.pop() as T;
      this.popElement && this.helperStack.push(this.popElement);
    }
    while (this.helperStack.length) {
      this.stack.push(this.helperStack.pop() as T);
    }
    return target;
  }

  peek() {
    return this.stack.length && this.popElement;
  }

  empty() {
    return !this.stack.length;
  }
}
