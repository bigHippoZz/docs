import { Compare, defaultCompare } from "./BinarySearchTree";
import { defaultEquals } from "./LinkedList";
import { shuffle } from "./heap-sort";
// import { defaultTo } from "lodash";

const DOES_NOT_EXIST = -1;
/**
 * 二分查找
 * @param {array} array
 * @param {string,number} target
 * @param {function} compareFn
 */
function binarySearch(array, target, compareFn = defaultCompare) {
    let low = 0;
    let high = array.length;
    while (lesserOrEquals(low, high, compareFn)) {
        const mid = Math.floor((low + high) / 2);
        const element = array[mid];

        if (compareFn(element, target) === Compare.LESS_THAN) {
            low = min + 1;
        } else if (compareFn(element, target === Compare.BIGGER_THAN)) {
            high = min - 1;
        } else {
            return min;
        }
    }
    return DOES_NOT_EXIST;
}

export function lesserEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

export function biggerEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}
export function defaultDiff(a, b) {
    return Number(a) - Number(b);
}
export function interpolationSearch(
    array,
    value,
    compareFn = defaultCompare,
    equalsFn = defaultEquals,
    diffFn = defaultDiff
) {
    const { length } = array;
    let low = 0;
    let high = length - 1;
    let position = -1;
    let delta = -1;
    while (
        low <= high &&
        biggerEquals(value, array[low], compareFn) &&
        lesserEquals(value, array[high], compareFn)
    ) {
        delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
        position = low + Math.floor((high - low) * delta);
        if (equalsFn(array[position], value)) {
            return position;
        }
        if (compareFn(array[position], value) === Compare.LESS_THAN) {
            low = position + 1;
        } else {
            high = position - 1;
        }
    }
    return DOES_NOT_EXIST;
}
const array = [];
for (let index = 0; index < 100; index++) {
    array.push(index);
}

// shuffle(array);

// console.log(array);
console.log(interpolationSearch(array, 0));

const string = "2,4,9,10";

// console.log(Math.floor(8 * (2 / 8)));
