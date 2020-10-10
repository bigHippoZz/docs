interface CircularQueue<T> {
    max_size: number;
    head: number;
    tail: number;
    queue: Array<T>;
    enQueue(value: T): boolean;
    deQueue(): boolean;
    Front(): T | -1;
    Rear(): T | -1;
    isEmpty(): boolean;
    isFull(): boolean;
}
class MyCircularQueue implements CircularQueue<number> {
    public max_size!: number;
    public head!: number;
    public tail!: number;
    public queue!: any[];

    constructor(size: number) {
        this.max_size = size;
        this.head = this.tail = -1;
        this.queue = [];
    }

    enQueue(value: number) {
        if (this.isFull()) {
            return false;
        }
        if (this.isEmpty()) {
            this.head = 0;
        }
        this.tail = (this.tail + 1) % this.max_size;
        this.queue[this.tail] = value;
        return true;
    }

    deQueue(): boolean {
        if (this.isEmpty()) {
            return false;
        }
        if (this.head === this.tail) {
            this.head = this.tail = -1;
        } else {
            this.head = (this.head + 1) % this.max_size;
        }

        return true;
    }

    Front(): number | -1 {
        if (this.isEmpty()) {
            return -1;
        }

        return this.queue[this.head];
    }

    Rear(): number | -1 {
        if (this.isEmpty()) {
            return -1;
        }

        return this.queue[this.head];
    }

    isEmpty() {
        return this.head === -1;
    }
    isFull() {
        return this.head === (this.tail + 1) % this.max_size;
    }
}
// const circularQueue = new MyCircularQueue(10); // 设置长度为 3
// circularQueue.enQueue(1); // 返回 true
// circularQueue.enQueue(2); // 返回 true
// circularQueue.enQueue(3); // 返回 true
// circularQueue.enQueue(4); // 返回 false，队列已满
// circularQueue.enQueue(5); // 返回 false，队列已满
// circularQueue.enQueue(6); // 返回 false，队列已满
// circularQueue.enQueue(7); // 返回 false，队列已满
// circularQueue.enQueue(8); // 返回 false，队列已满
// circularQueue.enQueue(9); // 返回 false，队列已满
// circularQueue.enQueue(10); // 返回 false，队列已满
// // circularQueue.Rear(); // 返回 3
// // circularQueue.isFull(); // 返回 true
// circularQueue.deQueue(); // 返回 true
// circularQueue.deQueue(); // 返回 true

// circularQueue.enQueue(4); // 返回 true
// console.log(circularQueue);
// // circularQueue.Rear(); // 返回 4