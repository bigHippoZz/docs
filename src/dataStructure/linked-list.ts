import { Node } from "./models/linked-list-models";
import { defaultEquals, IEqualsFunction } from "./utils";

export class LinkedList<T> {
  private head: Node<T> | undefined;
  private count = 0;
  constructor(private equalsFunction: IEqualsFunction<T> = defaultEquals) {}

  push(element: T) {
    const node = new Node<T>(element);
    if (this.head == null) {
      this.head = node;
    } else {
      let current = this.head;
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;
  }

  insert(element: T, index: number) {
    if (index >= index && index <= this.size()) {
      const node = new Node<T>(element);
      let current = this.head;
      if (index === 0) {
        node.next = current;
        this.head = node;
      } else {
        const prev = this.getElementByIndex(index - 1) as Node<T>;
        current = prev.next;
        prev.next = node;
        node.next = current;
      }
      this.count++;
    }
  }

  getElementByIndex(index: number): Node<T> | undefined {
    if (index >= 0 && index <= this.size()) {
      let current = this.head;
      for (let i = 0; i < index && current != null; i++) {
        current = current.next;
      }
      return current;
    }
  }

  indexOf(element: T) {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      if (this.equalsFunction(element, current.element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  removeByIndex(index: number) {
    if (index >= 0 && index < this.size()) {
      let current = this.head;
      if (index === 0) {
        this.head = current!.next;
        current!.next = void 0;
      } else {
        const prev = this.getElementByIndex(index - 1) as Node<T>;
        current = prev.next as Node<T>;
        prev.next = current.next;
        current.next = void 0;
      }
    }
  }

  remove(element: T) {
    this.removeByIndex(this.indexOf(element));
  }

  size(): number {
    return this.count;
  }
  isEmpty(): boolean {
    return this.count === 0;
  }
  clear() {
    this.head = void 0;
    this.count = 0;
  }
  getHead() {
    return this.head;
  }

  toString() {
    if (this.head == null) {
      return "";
    }
    let current = this.head.next;
    let objString = this.head.element + "";
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }

  *[Symbol.iterator](): Iterator<T> {
    let current = this.head;
    for (let i = 0; i < this.size() && current != null; i++) {
      yield current.element;
      current = current.next;
    }
  }

  static generateArray(start: number, end: number): number[] {
    return new Array<number>(end - start + 1).fill(0).map((_, i) => start + i);
  }

  static fromLinkedList<T>(array: T[]): LinkedList<T> {
    const list = new LinkedList<T>();
    for (let i = 0; i < array.length; i++) {
      list.push(array[i]);
    }
    return list;
  }
}
