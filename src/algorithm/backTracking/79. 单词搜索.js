// 79. 单词搜索
// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。

// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

//

// 示例:

// board =
// [
//   ['A','B','C','E'],
//   ['S','F','C','S'],
//   ['A','D','E','E']
// ]

// 给定 word = "ABCCED", 返回 true
// 给定 word = "SEE", 返回 true
// 给定 word = "ABCB", 返回 false
//

// 提示：

// board 和 word 中只包含大写和小写英文字母。
// 1 <= board.length <= 200
// 1 <= board[i].length <= 200
// 1 <= word.length <= 10^3

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/word-search
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function(board, word) {
  const rowLen = board.length;
  const colLen = board[0].length;

  function helper(row, col, index) {
    if (row < 0 || row >= rowLen || col < 0 || col >= colLen) {
      return;
    }
    if (board[row][col] === 0) {
      return;
    }
    // 这里的判断很重要
    if (board[row][col] === word[index]) {
      // 可以利用word.length-1进行与index判断
      // 并不需要进行index === word.length 这种判断
      if (index === word.length - 1) {
        return true;
      }
      const current = board[row][col];
      board[row][col] = 0;
      const result =
        helper(row + 1, col, index + 1) ||
        helper(row - 1, col, index + 1) ||
        helper(row, col + 1, index + 1) ||
        helper(row, col - 1, index + 1);
      if (result) return true;
      board[row][col] = current;
    }
  }

  for (let row = 0; row < rowLen; row++) {
    for (let col = 0; col < colLen; col++) {
      if (board[row][col] === word[0] && helper(row, col, 0)) return true;
    }
  }
  return false;
};
