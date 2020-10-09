import { Compare, defaultCompare } from "./BinarySearchTree";
import { defaultEquals } from "./LinkedList";
import { shuffle } from "./heap-sort";
import { swap } from "./MinHeap";
// import { cloneWith } from "lodash";
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
// console.log(interpolationSearch(array, 0));

const string = "2,4,9,10";

// console.log(Math.floor(8 * (2 / 8)));
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
    // let { length } = nums;
    // if (!length) return 0;
    // let fast = 0;
    // let slow = 0;
    // let ans = Number.MAX_VALUE;
    // let sum = 0;
    // while (fast < length) {
    //     sum += nums[fast];
    //     while (sum >= s) {
    //         // debugger;
    //         ans = Math.min(ans, fast - slow + 1);
    //         sum -= nums[slow++];
    //     }

    //     fast++;
    // }
    // return ans === Number.MAX_VALUE ? 0 : ans;
    let { length } = nums;
    if (!length) return 0;
    let sums = [0];
    for (let index = 1; index <= length; index++) {
        sums[index] = sums[index - 1] + nums[index - 1];
    }
    console.log(sums);
};
// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3]));

/**
 * @param {string} s
 * @return {string}
 */

function reverseString(string) {
    return string.split("").reverse().join("");
}
var reverseWords = function (s) {
    if (!s.length) return "";
    if (s === " ") return " ";
    const list = s.split(" ");
    return list.map(str => reverseString(str)).join(" ");
};
// console.log(reverseWords("Let's take LeetCode contest"));
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
    let { length } = nums;
    if (!length) return [];
    let fast = 0;
    let slow = 0;
    // debugger;
    while (fast < length) {
        if (nums[fast] !== 0) {
            fast !== slow && swap(nums, fast, slow);
            slow++;
        }
        fast++;
    }
    // console.log(nums);
    return nums;
};

moveZeroes([1, 2]);

var removeDuplicates = function (nums) {
    let { length } = nums;
    if (!length) return 0;
    let slow = 0;
    let fast = 0;
    while (fast < length) {
        if (nums[fast] !== nums[slow]) {
            nums[++slow] = nums[fast];
        }
        fast++;
    }
    console.log(nums);
    console.log(slow);
    return slow + 1;
};

// removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4]);

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target, i = 0, map = {}, { length } = nums) {
    if (i > length) return;
    let dis = target - nums[i];
    if (map[dis] !== undefined) return [map[dis], i];
    map[nums[i]] = i;
    return twoSum(nums, target, ++i, map);
};
// console.log(twoSum([2, 7, 11, 15], 9));
