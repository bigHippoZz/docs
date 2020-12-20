// 39. 组合总和
// 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的数字可以无限制重复被选取。

// 说明：

// 所有数字（包括 target）都是正整数。
// 解集不能包含重复的组合。
// 示例 1：

// 输入：candidates = [2,3,6,7], target = 7,
// 所求解集为：
// [
//   [7],
//   [2,2,3]
// ]
// 示例 2：

// 输入：candidates = [2,3,5], target = 8,
// 所求解集为：
// [
//   [2,2,2,2],
//   [2,3,3],
//   [3,5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combination-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
const combinationSum = function(candidates, target) {
  //   const result = [];
  //   const length = candidates.length;
  //   function backTracking(target, combine, index) {
  //     if (target === 0) {
  //       result.push(combine);
  //       return;
  //     }
  //     if (index === length) {
  //       return;
  //     }

  //     backTracking(target, combine, index + 1);

  //     if (target > 0) {
  //       backTracking(
  //         target - candidates[index],
  //         [...combine, candidates[index]],
  //         index
  //       );
  //     }
  //   }

  //   backTracking(target, [], 0);
  //   return result;

  const result = [];

  const len = candidates.length;

  function backTracking(start, path, sum) {
    if (sum >= target) {
      if (target === sum) {
        result.push(path.slice());
      }
      return;
    }
    for (let i = start; i < len; i++) {
      path.push(candidates[i]);
      backTracking(i, path, sum + candidates[i]);
      path.pop();
    }
  }

  backTracking(0, [], 0);
  return result
};
