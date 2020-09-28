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
console.log(handle([3, 2, 2, 2, 1]));

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
        console.log(loop);
        for (let j = 0; j < loop; j++) {
            if (element[j] !== result[j]) {
                result = result.slice(0, j);
                console.log(result)
                break;
            }
        }
    }
    return result;
};

console.log(longestCommonPrefix(["apba","ap"]));

function unique(array, callback) {
    let map = new Map()
    return array.filter(
        children => !map.has(children.id) && map.set(children.id, 1)
    )
}

const result = unique([{ id: 1 }, { id: 1 }])
console.log(result)
