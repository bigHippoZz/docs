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
  nums.sort();
  const result = [];
  const used = [];
  const { length } = nums;
  function helper(paths, index) {
    if (index === length) {
      result.push(paths.slice());
      return;
    }

    for (let i = 0; i < length; i++) {
      if (i && nums[i - 1] === nums[i] && !used[i - 1]) {
        continue;
      }
      if (used[i]) {
        continue;
      }
      used[i] = true;
      paths.push(nums[i]);
      helper(paths, index + 1);
      used[i] = false;
      paths.pop();
    }
  }
  helper([], 0);
  return result;
};

// const result = permuteUnique([1, 3, 1]);
// console.log(result);
