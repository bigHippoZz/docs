// 77. 组合
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/combinations
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
const combine = function(n, k) {
  const result = [];
  function backTracking(path, index) {
    if (index === k) {
      result.push(path.slice());
    }
    for (let i = index; i < n; i++) {
      path.push(i);
      backTracking(path, i + 1);
      path.pop();
    }
  }
  backTracking(0);
  return result;
};

// 总结：归根结底还是递归，只是递归的变种，将副作用放入函数的参数和return中
// 递归自己的理解：递归可以拿到下一次递归的一些状态，这是for循环所做不到的
