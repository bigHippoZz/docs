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
console.log(queue.isEmpty());
console.log(queue);
// head tail 初始值为-1
// 利用求余来进行循环
// tail 永远追不上 head
// head 可以追上 tail
