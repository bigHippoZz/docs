class Stack {
    constructor() {
        this.count = 0;
        this.item = {};
    }

    push(value) {
        this.item[this.count] = value;
        this.count++;
    }
    pop() {
        if (this.isEmpty()) {
            return;
        }
        let result = this.item[this.count];
        this.count--;
        delete this.item[this.count];
        return result;
    }
    peek() {
        return this.item[this.count];
    }
    isEmpty() {
        return this.count === 0;
    }
    clear() {
        while (!this.isEmpty()) {
            this.pop();
        }
    }
    size() {
        return this.count;
    }
}

let stack = new Stack();

class Queue {
    constructor() {
        this.count = 0;
        this.item = {};
        this.lowestCount = 0;
    }
    enqueue(value) {
        this.item[this.count] = value;
        this.count++;
    }
    dequeue() {
        if (this.isEmpty()) return;
        let result = this.item[this.lowestCount];
        delete this.item[this.lowestCount];
        this.lowestCount++;
        return result;
    }
    peek() {
        return this.item[this.lowestCount];
    }
    isEmpty() {
        return this.lowestCount === this.count;
    }
    size() {
        if (this.isEmpty()) return 0;
        return this.count - this.lowestCount;
    }

    toString() {
        if (this.isEmpty()) return "";
        let objectString = `${this.item[this.lowestCount]}`;
        for (let index = this.lowestCount + 1; index < this.count; index++) {
            objectString = `${objectString},${this.item[index]}`;
        }
        return objectString;
    }
}

let queue = new Queue();

class Deque extends Queue {
    addFront(value) {
        if (this.isEmpty()) {
            this.addBack(value);
        } else if (this.lowestCount > 0) {
            this.lowestCount--;
            this.item[this.lowestCount] = value;
        } else {
            for (let index = 0; index < this.count; index++) {
                this.item[index + 1] = this.item[index];
            }
            this.count++;
            this.lowestCount = 0;
            this.item[0] = value;
        }
    }

    addBack(value) {
        super.enqueue(value);
    }
    removeFront() {
        return super.dequeue();
    }
    removeBack() {
        if (this.isEmpty()) return;
        this.count--;
        let result = this.item[this.count];
        delete this.item[this.count];

        return result;
    }
    peekFront() {
        return super.peek();
    }
    peekBack() {
        if (this.isEmpty()) return;
        return this.item[this.count - 1];
    }
}

let deque = new Deque();

// console.log(deque);
deque.addFront(10);
deque.addFront(10);
deque.addFront(10);
deque.removeBack();
// console.log(deque);

function hotPotato(list, num) {
    let queue = new Queue();
    for (let index = 0; index < list.length; index++) {
        queue.enqueue(list[index]);
    }

    while (queue.size() > 1) {
        for (let index = 0; index < num; index++) {
            queue.enqueue(queue.dequeue());
        }
        queue.dequeue();
        console.log(queue);
    }
    console.log(queue.size());
    return queue.dequeue();
}
function handle(string) {
    let deque = new Deque();
    if (typeof string === "string") {
        let stringList = string.split("");
        for (let index = 0; index < stringList.length; index++) {
            deque.addBack(stringList[index]);
        }
        let f,
            l,
            flag = true;
        while (deque.size() > 1) {
            f = deque.removeFront();
            l = deque.removeBack();
            if (f !== l) {
                flag = false;
            }
        }
        return flag;
    } else {
        return false;
    }
}

