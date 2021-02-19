// 51. N 皇后
// n 皇后问题 研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。

// 给你一个整数 n ，返回所有不同的 n 皇后问题 的解决方案。

// 每一种解法包含一个不同的 n 皇后问题 的棋子放置方案，该方案中 'Q' 和 '.' 分别代表了皇后和空位。

//

// 示例 1：

// 输入：n = 4
// 输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]
// 解释：如上图所示，4 皇后问题存在两个不同的解法。
// 示例 2：

// 输入：n = 1
// 输出：[["Q"]]
//

// 提示：

// 1 <= n <= 9
// 皇后彼此不能相互攻击，也就是说：任何两个皇后都不能处于同一条横行、纵行或斜线上。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/n-queens
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @return {string[][]}
 */
const solveNQueens = function(n) {
  const result = [];
  /* 这个题解最牛逼的地方就是在这里使用some进行错误判断 */
  function canSet(row, col, temp) {
    return temp.some((colIndex, rowIndex) => {
      return (
        colIndex === col ||
        colIndex + rowIndex === row + col ||
        rowIndex - colIndex === row - col
      );
    });
  }
  function helper(row, temp = []) {
    if (row === n) {
      result.push(
        temp.map((colIndex) => {
          const current = new Array(n).fill(".");
          current[colIndex] = "Q";
          return current.join("");
        })
      );
      return;
    }
    for (let col = 0; col < n; col++) {
      if (canSet(row, col, temp)) {
        continue;
      }
      helper(
        row + 1,
        [...temp, col] /* 这里的数组进行了拷贝，并不需要进行撤销 */
      );
    }
  }
  helper(0, []);
  console.log(result);
  return result;
};

solveNQueens(4);
