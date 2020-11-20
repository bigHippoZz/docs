class CircularQueue<T> {
  private head: number;
  private tail: number;
  private queue: Array<T>;
  private len: number;
  constructor(len: number) {
    // 头部
    this.head = -1;
    // 尾部
    this.tail = -1;
    // 当前队列
    this.queue = [];
    // 当前队列最大容量
    this.len = len;
  }
  //   队列添加项
  enQueue(value: T): boolean {
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
  //   队列删除项
  deQueue(): boolean {
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
  //   是不是空
  isEmpty(): boolean {
    return this.head === -1;
  }
  //   是不是满了
  isFull(): boolean {
    return this.head === (this.tail + 1) % this.len;
  }
  //   获取首个元素
  Front(): T {
    return this.queue[this.head];
  }
  //   获取最后的元素
  Rear(): T {
    return this.queue[this.tail];
  }
}

// 首先不会清空队列的！！！！
// 然后用新的数据进行替代
const queue = new CircularQueue(3);
queue.enQueue(10);
queue.enQueue(20);
queue.enQueue(30);
queue.deQueue();
queue.deQueue();
// queue.deQueue();
// console.log(queue.isEmpty());
