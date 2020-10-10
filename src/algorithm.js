/// 切割当前字符串中的数组
const string = "参数[number,num,string]参数";
const pattern = /^.*\[(.+?)\].*$/;
function handle(numb) {
    if (numb.length === 0) {
        return -1;
    }
    if (numb.length === 1) {
        return 0;
    }
    // 初始索引为 0, 计算索引两边的和, 右边部分的和可以通过 reduce 计算
    let leftPartSum = 0;
    let rightPartSum = numb.slice(1).reduce((sum, num) => (sum += num), 0);
    // console.log(rightPartSum, "start");
    for (let i = 0; i < numb.length; i++) {
        // console.log(numb[i], "numb");
        //  比较左侧和与右侧合值的是否相同 注意和值是在不断变化
        if (leftPartSum === rightPartSum) {
            return i;
        }
        leftPartSum += numb[i];
        if (numb[i + 1]) {
            rightPartSum -= numb[i + 1];
            // console.log(rightPartSum,'rightPartSum')
        }
    }
    return -1;
}
// console.log(handle([3, 2, 2, 2, 1]));

//[[1,4],[2,3]]
//[[1,4],[0,4]]

/**
 * @param {number[][]} intervals
 * @return {number[][]}
 */
function merge(intervals) {
    if (!intervals.length) return [];
    let i = 0;
    let len = intervals.length;
    let res = [];
    intervals.sort((a, b) => a[0] - b[0]);
    while (i < len) {
        let currentLeft = intervals[i][0];
        let currentRight = intervals[i][1];
        while (i < len - 1 && currentRight >= intervals[i + 1][0]) {
            i++;
            currentRight = Math.max(currentRight, intervals[i][1]);
        }
        res.push([currentLeft, currentRight]);
        i++;
    }

    return res;
}

// console.log(
//     merge([
//         [1, 4],
//         [2, 3],
//     ])
// );

/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
    if (!strs.length) return "";
    let result = strs[0];
    for (let index = 1; index < strs.length; index++) {
        const element = strs[index];
        const loop = Math.max(element.length, result.length);
        // console.log(loop);
        for (let j = 0; j < loop; j++) {
            if (element[j] !== result[j]) {
                result = result.slice(0, j);
                console.log(result);
                break;
            }
        }
    }
    return result;
};

// console.log(longestCommonPrefix(["apba","ap"]));

function unique(array, callback) {
    let map = new Map();
    return array.filter(
        children => !map.has(children.id) && map.set(children.id, 1)
    );
}

const result = unique([{ id: 1 }, { id: 1 }]);
// console.log(result)

/**
 *
 * @param {number[]} nums
 */
function arrayPairSum(nums) {
    console.log(nums.sort().filter((a, idx) => (idx + 1) % 2));
    return nums
        .sort()
        .filter((a, idx) => (idx + 1) % 2)
        .reduce((a, b) => (a += b), 0);
}

// console.log(arrayPairSum([1, 4, 2, 3]));

function twoSum(numbers, target) {
    // 利用双指针进行判断
    let left = 0;
    let right = numbers.length - 1;
    while (left < right) {
        if (numbers[left] + numbers[right] === target) {
            return [++left, ++right];
        } else {
            (numbers[left] + numbers[right] > target && right--) || left--;
        }
    }
}

// console.log(twoSum([-3, 3, 4, 90], 0));
// console.log([2, 7, 11, 15].slice(0, 2));

function removeElement(nums, val) {
    // let len = 0;
    // // 利用遍历进行判断是不是相同 然后将ans 相加
    // for (let i = 0; i < nums.length;i++){
    //     if(nums[i]!==val){
    //         nums[len] = nums[i];
    //         len++;
    //     }
    // }
    // console.log(nums)
    // return len;
    let fast = 0,
        slow = 0;
    while (fast < nums.length) {
        if (nums[fast] !== val) {
            nums[slow] = nums[fast];
            slow++;
        }
        fast++;
    }
    console.log(nums);
    return slow;
}

// console.log(removeElement([1, 3, 2], 3));

var findMaxConsecutiveOnes = function (nums) {
    if (!nums.length) return 0;
    let fast = 0;
    let slow = 0;
    let next = 0;
    while (fast < nums.length) {
        if (nums[fast] === 1) {
            ++slow;
        } else {
            next = Math.max(slow, next);
            slow = 0;
        }
        fast++;
    }
    return Math.max(slow, next);
};

// console.log(findMaxConsecutiveOnes([1, 1, 1, 0, 1, 1, 1, 1]));

var minSubArrayLen = function (s, nums) {
    let fast = 0;
    let slow = 0;
    let sum = 0;
    let next = 0;
    while (fast < nums.length) {
        while (slow < nums.length) {
            sum += nums[slow++];
            if (s <= sum) {
                if (!fast) {
                    next = slow - fast;
                } else {
                    next = Math.min(next, slow - fast);
                }

                break;
            }
        }
        sum = 0;
        fast++;
        slow = fast;
    }
    return next;
};
// console.log(minSubArrayLen(7, [2, 3, 1, 2, 4, 3, 0]));

var generate = function (numRows) {
    if (!numRows) return [];
    const result = [];
    for (let index = 0; index < numRows; index++) {
        const item = [];
        item[0] = 1;
        item[index] = 1;
        if (index > 1) {
            for (let j = 1; j < index; j++) {
                item[j] = result[index - 1][j - 1] + result[index - 1][j];
            }
        }
        result.push(item);
    }
    return result;
};

// console.log(generate(5));

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var findDiagonalOrder = function (matrix) {
    const { length } = matrix;
    if (!length) return [];
    let result = []; // 最终的遍历结果
    let direction = true; // 方向 true 右上 false 左下
    let row = length;
    let col = matrix[0].length;
    let i = 0;
    let j = 0;

    while (i < row && j < col) {
        result.push(matrix[i][j]);
        // col = matrix[i].length; // 每行的长度
        if (direction) {
            i -= 1;
            j += 1;
        } else {
            i += 1;
            j -= 1;
        }
        // 记住处理的4个边界情况
        // 处理边界 -- 转弯
        if (i < 0 || j < 0 || i === row || j === col) {
            if (direction) {
                // 右上
                if (j < col) i = 0;
                // 上边越界，像右移动
                else {
                    // 右边越界，向下移动
                    i += 2;
                    j--;
                }
            } else {
                // 左下
                if (i < row) j = 0;
                // 左边越界， 像下移动
                else {
                    // 下边越界， 想右移动
                    i--;
                    j += 2;
                }
            }
            direction = !direction; // 转换方向
        }
    }
    return result;
};

// console.log(
//     findDiagonalOrder([
//         [1, 2, 3],
//         [4, 5, 6],
//         [7, 8, 9],
//     ])
// );

class MinStack {
    constructor() {
        this.x_stack = [];
        this.min_stack = [Infinity];
    }
    push(x) {
        this.x_stack.push(x);
        this.min_stack.push(Math.min(this.getMin(), x));
    }
    pop() {
        this.x_stack.pop();
        this.min_stack.pop();
    }
    top() {
        return this.x_stack[this.x_stack.length - 1];
    }
    getMin() {
        return this.min_stack[this.min_stack.length - 1];
    }
}

const minStack = new MinStack();

minStack.push(10);
minStack.push(1);
minStack.push(2);
minStack.push(3);

// console.log(minStack);

/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const { length } = s;
    if (!length) return true;
    if (length % 2 === 1) return false;

    let map = {
        "(": ")",
        "{": "}",
        "[": "]",
    };
    let stack = [];
    for (let index = 0; index < length; index++) {
        if (map[stack[stack.length - 1]] === s[index]) {
            stack.pop();
        } else {
            stack.push(s[index]);
        }
    }
    return !stack.length;

    // let head = 0;
    // let tail = s.length - 1;
    // while (head < tail) {
    //     if (map[s[head]] !== s[tail]) {
    //         return false;
    //     }
    //     head++;
    //     tail--;
    // }
    // return true;
};

class Stack {
    constructor() {
        this.stack = [];
    }
    push(str) {
        return this.stack.push(str);
    }
    pop() {
        return this.stack.pop();
    }
    get top() {
        return this.stack[this.stack.length - 1];
    }
}
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    const { length } = tokens;
    const map = {
        "+": (a, b) => a + b,
        "-": (a, b) => a - b,
        "*": (a, b) => a * b,
        "/": (a, b) => parseInt(a / b),
    };
    const stack = new Stack();
    for (let index = 0; index < length; index++) {
        const element = tokens[index];
        if (element in map) {
            let b = stack.pop();
            let a = stack.pop();
            let calculation = map[element](a, b);
            stack.push(calculation);
        } else {
            stack.push(+element);
        }
    }
    return stack.top;
};

// console.log(evalRPN(["2", "1", "+", "3", "*"]));

/**
 * @param {string} s
 * @return {string}
 */
var decodeString = function (s) {
    let map = {
        "[": "]",
    };

    let pattern = /a-z/;
    const { length } = s;
    const tokenStack = [];
    const stringStack = [];
    const numberStack = [];
    const currentValue = "";
    for (let index = 0; index < length; index++) {
        const element = s[index];
        if (isNaN(+element)) {
            // 当前为字符串
            currentValue += element;
        } else {
            // 为数字
            stringStack.push(currentValue);
            currentValue = "";
            numberStack.push(element);
        }
    }
    console.log(stringStack);
    console.log(numberStack);
};

/**
 * 四平方数之和 + 贪心算法
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
    let sqList = new Set();
    for (let index = 1; index <= n; index++) {
        sqList.add(index * index);
    }
    console.log(sqList, "sqList");
};


numSquares(13)