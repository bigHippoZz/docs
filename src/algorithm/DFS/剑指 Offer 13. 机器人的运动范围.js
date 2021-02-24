// 剑指 Offer 13. 机器人的运动范围
// 地上有一个m行n列的方格，从坐标 [0,0] 到坐标 [m-1,n-1] 。一个机器人从坐标 [0, 0] 的格子开始移动，它每次可以向左、右、上、下移动一格（不能移动到方格外），也不能进入行坐标和列坐标的数位之和大于k的格子。例如，当k为18时，机器人能够进入方格 [35, 37] ，因为3+5+3+7=18。但它不能进入方格 [35, 38]，因为3+5+3+8=19。请问该机器人能够到达多少个格子？

//

// 示例 1：

// 输入：m = 2, n = 3, k = 1
// 输出：3
// 示例 2：

// 输入：m = 3, n = 1, k = 0
// 输出：1
// 提示：

// 1 <= n,m <= 100
// 0 <= k <= 20
// 通过次数95,121提交次数184,906

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ji-qi-ren-de-yun-dong-fan-wei-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} m
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
const movingCount = function(m, n, k) {
  const map = Object.create(null);

  let result = 0;

  function helper(x) {
    return (x % 10) + Math.floor(x / 10);
  }

  function dfs(row, col) {
    if (row < 0 || col < 0 || row >= m || col >= n) {
      return;
    }
    const sum = helper(row) + helper(col);
    if (sum > k) {
      return;
    }

    const key = JSON.stringify([row, col]);
    if (map[key]) {
      return;
    }
    map[key] = true;
    result++;
    dfs(row + 1, col);
    dfs(row, col + 1);
    dfs(row - 1, col);
    dfs(row, col - 1);
  }

  dfs(0, 0);

  return result;
};



