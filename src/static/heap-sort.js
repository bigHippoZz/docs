import { defaultCompare } from "./BinarySearchTree";
import { swap } from "./MinHeap";

// 通过堆排序找到最大的 然后进行交换进行排序
function heapify(array, index, heapSize, compareFn) {
    let largest = index;
    const left = 2 * index + 1;
    const right = 2 * index + 2;

    if (left < heapSize && compareFn(array[left], array[index]) > 0) {
        largest = left;
    }

    if (right < heapSize && compareFn(array[right], array[largest]) > 0) {
        largest = right;
    }

    if (largest !== index) {
        swap(array, index, largest);
        heapify(array, largest, heapSize, compareFn);
    }
}

function buildMaxHeap(array, compareFn) {
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        console.log(i, "index");
        heapify(array, i, array.length, compareFn);
    }
    console.log(array);
    return array;
}

export default function heapSort(array, compareFn = defaultCompare) {
    let heapSize = array.length;
    buildMaxHeap(array, compareFn);

    while (heapSize > 1) {
        swap(array, 0, --heapSize);
        heapify(array, 0, heapSize, compareFn);
    }

    console.log(array);
    return array;
}

function func(array) {
    const result = [];
    for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
        result.push(i);
    }
    console.log(result);
}

const array = [23, 45, 67, 7, 12, 245, 2];
// console.log([23, 45, 67, 7, 12, 245, 2]);
// heapSort([23, 45, 67, 7, 12, 245, 2]);

// console.log(Math.floor(23.9));

function shuffle(array) {
    for (let index = array.length - 1; index > 0; index--) {
        console.log(index);
        const randomIndex = Math.floor(Math.random() * (index + 1));
        swap(array, index, randomIndex);
    }
}

// shuffle(array);
