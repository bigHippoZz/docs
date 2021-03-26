/**
 * 循环队列
 *
 * 思路：
 * 1.队尾不能与队头重叠，队尾永远追不上队头
 * 2.队头可以与队尾重叠，这种情况下队列中只剩一个元素
 * 3.利用求余数来进行指针的移动
 */
class Queue<T> {
  len: number;
  head: number;
  tail: number;
  queue: Array<T>;
  constructor(len: number) {
    this.len = len;
    this.head = -1;
    this.tail = -1;
    this.queue = [];
  }
  /**
   * 入队列
   * @param value T
   */
  enQueue(value: T) {
    if (this.isFull()) {
      return false;
    }
    if (this.isEmpty()) {
      this.head = 0;
    }
    this.tail = (this.tail + 1) % this.len;
    this.queue[this.tail] = value;
    return true;
  }
  /**
   * 出队列
   */
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    if (this.head === this.tail) {
      this.head = this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.len;
    }
    return true;
  }
  isEmpty() {
    return this.head === -1;
  }
  isFull() {
    return this.head === (this.tail + 1) % this.len;
  }
}

const queue = new Queue(3);

queue.enQueue(10);
queue.enQueue(10);
queue.enQueue(10);
queue.deQueue();
queue.deQueue();
// queue.deQueue();
// console.log(queue.isEmpty());

export class ListNode<T> {
  val: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.prev = this.next = null;
  }
}
class CircularDeque {
  head: ListNode<string>;
  last: ListNode<string>;
  length: number;
  max: number;
  constructor(max: number) {
    this.head = this.createNode("head");
    this.last = this.createNode("last");
    this.head.next = this.last;
    this.last.prev = this.head;
    this.length = 0;
    this.max = max;
  }
  createNode(nodeVal: string) {
    return new ListNode(nodeVal);
  }
  insertFront(val: string) {
    if (this.isFull()) return false;
    const currentNode = this.createNode(val);
    const nextNode = this.head.next;
    currentNode.prev = this.head;
    currentNode.next = nextNode;
    (nextNode as ListNode<string>).prev = currentNode;
    this.head.next = currentNode;
    this.length++;
    return true;
  }
  insertLast(val: string) {
    if (this.isFull()) {
      return false;
    }
    const currentNode = this.createNode(val);
    const prevNode = this.last.prev;
    this.last.prev = currentNode;
    currentNode.next = this.last;
    currentNode.prev = prevNode;
    (prevNode as ListNode<string>).next = currentNode;
    this.length++;
    return true;
  }
  deleteFront() {
    if (this.isEmpty()) {
      return false;
    }
    const currentNode = this.head.next?.next as ListNode<string>;
    this.head.next = currentNode;
    currentNode.prev = this.head;
    this.length--;
    return true;
  }

  deleteLast() {
    if (this.isEmpty()) {
      return false;
    }
    const currentNode = this.last.prev?.prev as ListNode<string>;
    this.last.prev = currentNode;
    currentNode.next = this.last;
    this.length--;
    return true;
  }

  isFull() {
    return this.length >= this.max;
  }
  isEmpty() {
    return this.length === 0;
  }
}
const result = new CircularDeque(3);

// console.log(result);
// result.insertFront('hello')
// result.insertLast('world')

