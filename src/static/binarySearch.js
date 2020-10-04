import { min } from "lodash";
import { Compare, defaultCompare } from "./BinarySearchTree";
import { defaultEquals } from "./LinkedList";
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

function lesserOrEquals(a, b, compareFn) {
    const comp = compareFn(a, b);
    return comp === Compare.LESS_THAN || comp === Compare.EQUAlS;
}

function interpolationSearch(
    array,
    value,
    compareFn = defaultCompare,
    equalsFn = defaultEquals,
    diffFn = defaultDiff
) {}
