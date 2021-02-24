// 52. N皇后 II
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 给你一个整数 n ，返回 n 皇后问题 不同的解决方案的数量。

//

// 示例 1：

// 输入：n = 4
// 输出：2
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
// 示例 2：

// 输入：n = 1
// 输出：1
//

// 提示：

// 1 <= n <= 9
// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。
// 通过次数56,644提交次数68,910

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/n-queens-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @return {number}
 */
const totalNQueens = function(n) {
  let result = 0;

  function canSet(row, col, temp = []) {
    return temp.some((colIndex, rowIndex) => {
      return (
        col === colIndex ||
        colIndex + rowIndex === row + col ||
        rowIndex - colIndex === row - col
      );
    });
  }
  function helper(row, temp) {
    if (row === n) {
      result++;
      return;
    }
    for (let col = 0; col < n; col++) {
      if (canSet(row, col, temp)) {
        continue;
      }
      helper(row + 1, [...temp, col]);
    }
  }
  helper(0, []);
  return result;
};

