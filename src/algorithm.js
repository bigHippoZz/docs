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
