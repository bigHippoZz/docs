import {
    BinarySearchTree,
    Compare,
    Node,
    defaultCompare,
} from "./BinarySearchTree";
const swap = (array, a, b) => ([array[a], array[b]] = [array[b], array[a]]);
class MinHeap {
    constructor(compareFn = defaultCompare) {
        this.compareFn = compareFn;
        this.heap = [];
    }
    // 获取当前节点的左侧节点
    getLeftIndex(index) {
        return 2 * index + 1;
    }
    // 获取当前节点的右侧节点
    getRightIndex(index) {
        return 2 * index + 2;
    }
    // 获取父节点
    getParentIndex(index) {
        if (index === 0) {
            return undefined;
        }
        return Math.floor((index - 1) / 2);
    }
    insert(value) {
        if (value !== null) {
            this.heap.push(value);
            this.siftUp(this.heap.length - 1);
            return true;
        }
        return false;
    }

    siftUp(index) {
        let parent = this.getParentIndex(index);
        while (
            index > 0 &&
            this.compareFn(this.heap[parent], this.heap[index]) ===
                Compare.BIGGER_THAN
        ) {
            swap(this.heap, parent, index);
            index = parent;
            parent = this.getParentIndex(index);
        }
    }

    size() {
        return this.heap.length;
    }

    isEmpty() {
        return this.heap.length === 0;
    }

    findMinimum() {
        return this.isEmpty() ? undefined : this.heap[0];
    }

    extract() {
        if (this.isEmpty()) {
            return undefined;
        }
        if (this.size === 1) return this.heap.shift();
        const removedValue = this.heap.shift();
        return removedValue;
    }

    siftDown(index) {
        let element = index;
        const left = this.getLeftIndex(index);
        const right = this.getRightIndex(index);
        const size = this.size();
    }
}

const minHeap = new MinHeap();

minHeap.insert(2);
minHeap.insert(3);
minHeap.insert(4);
minHeap.insert(5);
minHeap.insert(1);
console.log(minHeap);
