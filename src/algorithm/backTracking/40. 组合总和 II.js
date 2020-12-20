// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：

// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。
// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combination-sum-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum2 = function(candidates, target) {
  // 遇见重复的项 建议往排序的思路上靠
  candidates.sort((a, b) => b - a);
  const result = [];
  const len = candidates.length;
  function backTracking(path, index, sum) {
    if (sum >= target) {
      if (target === sum) {
        result.push(path.slice());
      }
      return;
    }
    for (let i = index; i < len; i++) {
      if (i - 1 >= index && candidates[i - 1] === candidates[i]) {
        continue;
      }
      path.push(candidates[i]);
      backTracking(path, i + 1, sum + candidates[i]);
      path.pop();
    }
  }
  backTracking([], 0, 0);
  return result;
};
