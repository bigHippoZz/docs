// 47. 全排列 II

// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

//

// 示例 1：

// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// 示例 2：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutations-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function(nums) {
  const result = [];
  const len = nums.length;
  function backTracking(index) {
    if (index === len) {
      result.push(nums.slice());
    }
    for (let i = index; i < len; i++) {
      if (i !== index && nums[i] === nums[index]) continue;
      [nums[i], nums[index]] = [nums[index], nums[i]];
      backTracking(index + 1);
      [nums[i], nums[index]] = [nums[index], nums[i]];
    }
  }
  backTracking(0);

  return result;
};
