/**
 * 比较两个元素是否相同
 * @param {any} a
 * @param {any} b
 */
export function defaultEquals(a, b) {
    return a === b;
}
/**
 * 创建node元素
 */
export class Node {
    constructor(element) {
        this.element = element;
        this.next = null;
    }
}

class LinkedList {
    constructor(equals = defaultEquals) {
        // 存储链表中的元素数量
        this.count = 0;
        // 存储元素中第一个元素的引用
        this.head = null;
        this.equals = equals;
    }
    // 添加一个元素首先判断是不是链表是不是为空
    // 然后不是为空的话向其添加元素
    push(element) {
        const node = new Node(element);
        let current;
        if (this.head === null) {
            this.head = node;
        } else {
            current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = node;
        }
        this.count++;
    }
    // 第一种情况 只有一个元素的情况
    // 第二种情况 有多个元素 移除第一个元素
    removeAt(index) {
        if (index < this.count && index >= 0) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
            } else {
                let pre = this.getElementAt(index - 1);
                current = pre.next;
                pre.next = current.next;
            }
            this.count--;
            let element = current.element;
            current = null;
            return element;
        }
    }
    getElementAt(index) {
        if (index >= 0 && this.count >= index) {
            let node = this.head;
            for (let i = 0; i < index && node !== null; i++) {
                node = node.next;
            }
            return node;
        }
    }

    insert(element, index) {
        let node = new Node(element);
        if (index >= 0 && index <= this.count) {
            let current = this.head;
            if (index === 0) {
                this.head = node;
                node.next = current;
            } else {
                let pre = this.getElementAt(index - 1);
                current = pre.next;
                pre.next = node;
                node.next = current;
            }
            this.count++;
            return true;
        }
    }

    indexOf(element) {
        let current = this.head;
        for (let index = 0; index < this.count; index++) {
            if (this.equals(current.element, element)) {
                return index;
            }
            current = current.next;
        }
        return -1;
    }
    remove(element) {
        this.removeAt(this.indexOf(element));
    }

    toString() {
        if (this.head === null) {
            return "";
        }

        let current = this.head;
        let objectString = `${this.head.element}`;
        for (
            let index = 0;
            index < this.count && current.next !== null;
            index++
        ) {
            current = current.next;
            objectString = `${objectString},${current.element}`;
        }
        return objectString;
    }
    get isEmpty() {
        return this.count === 0;
    }

    get size() {
        return this.count;
    }
}

// let linkedList = new LinkedList();
// linkedList.push(10);
// linkedList.push(11);
// linkedList.push(12);

// console.log(linkedList.indexOf(12));
// console.log(linkedList);

class DoublyNode extends Node {
    constructor(element, next, pre) {
        super(element, next);
        this.pre = pre;
    }
}

class DoublyLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
        this.tail = null;
    }

    insert(element, index) {
        let node = new DoublyNode(element);
        if (index >= 0 && this.count >= index) {
            let current = this.head;
            if (index === 0) {
                if (this.head === null) {
                    this.head = node;
                    this.tail = node;
                } else {
                    this.head = node;
                    current.pre = node;
                    node.next = current;
                }
            } else if (this.count === index) {
                current = this.tail;

                current.next = node;
                node.pre = current;
                this.tail = node;
            } else {
                let pre = this.getElementAt(index - 1);
                current = pre.next;
                node.next = current;
                pre.next = node;
                current.pre = node;
                node.pre = pre;
            }
            this.count++;
            return true;
        }
    }

    removeAt(index) {
        if (index >= 0 && this.count > index) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                if (this.count === 1) {
                    this.tail = null;
                } else {
                    this.head.pre = null;
                }
            } else if (index === this.count - 1) {
                current = this.tail;
                this.tail = current.pre;
                this.tail.next = null;
            } else {
                current = this.getElementAt(index);
                let pre = current.pre;
                pre.next = current.next;
                current.next.pre = pre;
            }
            this.count--;
            return current.element;
        }
    }
}

// let doublyLinkedList = new DoublyLinkedList();
// doublyLinkedList.insert(10, 0);
// doublyLinkedList.insert(12, 1);
// doublyLinkedList.insert(14, 2);
// doublyLinkedList.insert(13, 3);
// doublyLinkedList.removeAt(1);
// console.log(doublyLinkedList);

class CircularLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
    }
    insert(element, index) {
        let node = new Node(element);
        if (index >= 0 && this.count >= index) {
            let current = this.head;
            if (index === 0) {
                if (this.count === 0) {
                    this.head = node;
                    node.next = this.head;
                } else {
                    node.next = current;
                    current = this.getElementAt(this.size - 1);
                    this.head = node;
                    console.log(current);
                    current.next = this.head;
                }
            } else {
                let pre = this.getElementAt(index - 1);
                current = pre.next;
                pre.next = node;
                node.next = current;
            }
        }
        this.count++;
        return true;
    }
}

class CircularDoublyLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
        this.tail = null;
    }

    insert(element, index) {
        let node = new DoublyNode(element);
        if (this.count >= index && index >= 0) {
            let current = this.head;
            if (index === 0) {
                if (this.count === 0) {
                    this.head = node;
                    this.tail = node;
                    node.pre = node;
                    node.next = node;
                    // this.tail =
                } else {
                    this.head = node;
                    this.head.next = current;
                    current.pre = this.head;
                    this.tail.next = this.head;
                    this.head.pre = this.tail;
                    // current = this.getElementAt(this.size-1)
                    // this.head.pre = current
                    // current.next = this.head
                }
            } else if (index === this.count) {
                current = this.tail;
                current.next = node;
                node.pre = current;
                node.next = this.head;
                this.head.pre = node;
                this.tail = node;
            } else {
                let pre = this.getElementAt(this.size);
                current = pre.next;
                pre.next = node;
                node.pre = pre;
                node.next = current;
                current.pre = node;
            }
        }
        this.count++;
    }

    removeAt(index) {
        if (this.count > index && index >= 0) {
            let current = this.head;
            if (index === 0) {
                if (this.count === 0) {
                    return;
                } else {
                    this.head = current.next;
                    this.head.pre = this.tail;
                    this.tail.next = this.head;
                }
            } else if (index === this.count - 1) {
                current = this.tail.pre;
                this.tail = current;
                this.tail.next = this.head;
                this.head.pre = this.tail;
            } else {
                current = this.getElementAt(index);
                let pre = current.pre;
                pre.next = current.next;
                current.next.pre = pre;
            }
        }
        this.count--;
    }
}

// let circularDoublyLinkedList = new CircularDoublyLinkedList();

// circularDoublyLinkedList.insert(10, 0);
// circularDoublyLinkedList.insert(11, 1);
// circularDoublyLinkedList.insert(12, 2);
// // circularDoublyLinkedList.removeAt(1);
// console.log(circularDoublyLinkedList);
const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
    if (a === b) return 0;
    return a - b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class SortedLinkedList extends LinkedList {
    constructor(equals = defaultEquals, compareFn = defaultCompare) {
        super(equals);
        this.compare = compareFn;
    }

    insert(element) {
        if (this.isEmpty) {
            return super.insert(element, 0);
        }
        let pos = this.getIndexNextSortedElement(element);
        super.insert(element, pos);
    }

    getIndexNextSortedElement(element) {
        var i = 0;
        let current = this.head;
        for (; i < this.count; i++) {
            console.log(current.element);
            let com = this.compare(element, current.element);
            if (com === Compare.LESS_THAN) {
                console.log(i, com);
                return i;
            }
            current = current.next;
        }

        console.log(i);

        return i;
    }
}
// let sortedLinkedList = new SortedLinkedList();
// sortedLinkedList.push(10);
// sortedLinkedList.insert(12);
// sortedLinkedList.insert(13);
// sortedLinkedList.insert(14);
// sortedLinkedList.insert(15);
// sortedLinkedList.insert(9);
// sortedLinkedList.insert(11);
// console.log(sortedLinkedList);

class _CircularDoublyLinkedList extends LinkedList {
    constructor(equals = defaultEquals) {
        super(equals);
        this.tail = null;
    }

    push(element) {
        if (!element) return;
        let node = new DoublyNode(element);
        let current;
        if (this.count === 0) {
            this.head = node;
            this.tail = node;
            node.pre = node;
            node.next = node;
        } else {
            current = this.tail;
            this.tail = node;
            current.next = node;
            this.tail.pre = current;
            this.tail.next = this.head;
            this.head.pre = node;
        }
        this.count++;
        return this.count;
    }

    insert(element, index) {
        const node = this.createNode(element);
        let current = this.head;
        if (index >= 0 && this.count >= index) {
            if (index === 0) {
                if (this.count === 0) {
                    return this.push(node);
                } else {
                    this.head = node;
                    this.head.next = current;
                    current.pre = this.head;
                    this.head.pre = this.tail;
                    this.tail.next = this.head;
                }
            } else if (this.count === index) {
                current = this.tail;
                this.tail = node;
                current.next = this.tail;
                this.tail.pre = current;
                this.tail.next = this.head;
                this.head.pre = this.tail;
            } else {
                current = this.getElementAt(index);
                let pre = current.pre;
                pre.next = node;
                node.pre = pre;
                node.next = current;
                current.pre = node;
            }
        }
        this.count++;
    }

    removeAt(index) {
        if (index >= 0 && this.count > index) {
            let current = this.head;
            if (index === 0) {
                this.head = current.next;
                if (this.count === 1) {
                    // this.head = null;
                    this.tail = null;
                } else {
                    this.head.pre = this.tail;
                    this.tail.next = this.head;
                }
            } else if (this.count - 1 === index) {
                current = this.tail.pre;
                this.tail = current;
                this.tail.next = this.head;
                this.head.pre = this.tail;
            } else {
                current = this.getElementAt(index);
                let pre = current.pre;
                pre.next = current.next;
                current.next.pre = pre;
            }
        }

        this.count--;
    }

    createNode(element) {
        return new DoublyNode(element);
    }
}

let _crcularDoublyLinkedList = new _CircularDoublyLinkedList();
_crcularDoublyLinkedList.push(10);
_crcularDoublyLinkedList.push(11);
_crcularDoublyLinkedList.push(12);
_crcularDoublyLinkedList.removeAt(1);
console.log(_crcularDoublyLinkedList);
