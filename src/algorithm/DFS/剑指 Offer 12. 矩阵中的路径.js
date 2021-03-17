// 剑指 Offer 12. 矩阵中的路径
// 请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一格开始，每一步可以在矩阵中向左、右、上、下移动一格。如果一条路径经过了矩阵的某一格，那么该路径不能再次进入该格子。例如，在下面的3×4的矩阵中包含一条字符串“bfce”的路径（路径中的字母用加粗标出）。

// [["a","b","c","e"],
// ["s","f","c","s"],
// ["a","d","e","e"]]

// 但矩阵中不包含字符串“abfb”的路径，因为字符串的第一个字符b占据了矩阵中的第一行第二个格子之后，路径不能再次进入这个格子。

//

// 示例 1：

// 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
// 输出：true
// 示例 2：

// 输入：board = [["a","b"],["c","d"]], word = "abcd"
// 输出：false
//

// 提示：

// 1 <= board.length <= 200
// 1 <= board[i].length <= 200

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ju-zhen-zhong-de-lu-jing-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = function(board, word) {
  const { length } = word;
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      const ele = board[row][col];
      if (word[0] === ele && heleper(board, row, col, 0, word)) {
        return true;
      }
    }
  }
  function heleper(board, row, col, index, word) {
    if (
      row < 0 ||
      row >= board.length ||
      col < 0 ||
      col >= board[0].length ||
      board[row][col] === "*"
    ) {
      return;
    }
    const current = board[row][col];
    // 这里注意索引是从 0 开始的
    // if (index === length) {
    //   return true;
    // }
    if (current !== word[index]) {
      return;
    }
    if (index === length - 1) {
      return true;
    }

    board[row][col] = "*";
    const result =
      heleper(board, row + 1, col, index + 1, word) ||
      heleper(board, row, col + 1, index + 1, word) ||
      heleper(board, row - 1, col, index + 1, word) ||
      heleper(board, row, col - 1, index + 1, word);
    board[row][col] = current;
    return result;
  }
  return false;
};

// console.log(exist([["a"]], "a"));
