// 46. 全排列
// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutations
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permute = function(nums) {
  const result = [];
  const { length } = nums;
  // index 主要是指针的作用加停止递归的，最巧妙的地方就是利用index进行选取nums的数字
  function helper(index) {
    if (index === length) {
      result.push(nums.slice());
      return;
    }
    for (let i = index; i < length; i++) {

      [nums[index], nums[i]] = [nums[i], nums[index]];
      console.log(
        `回溯 前！！！！！ index -> ${index} ， i -> ${i} nums[i] -> ${nums[i]} current -> ${nums.slice()}`
      );
      helper(index + 1);
      [nums[index], nums[i]] = [nums[i], nums[index]];
      console.log(
        `回溯 后 index -> ${index} ， i -> ${i} nums[i] -> ${nums[i]} current -> ${nums.slice()}`
      );
    }
  }
  helper(0);
  return result;
};


// const result = permute([1, 2, 3]);
// console.log(result);
