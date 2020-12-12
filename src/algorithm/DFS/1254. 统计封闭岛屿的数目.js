// 1254. 统计封闭岛屿的数目
// 有一个二维矩阵 grid ，每个位置要么是陆地（记号为 0 ）要么是水域（记号为 1 ）。

// 我们从一块陆地出发，每次可以往上下左右 4 个方向相邻区域走，能走到的所有陆地区域，我们将其称为一座「岛屿」。

// 如果一座岛屿 完全 由水域包围，即陆地边缘上下左右所有相邻区域都是水域，那么我们将其称为 「封闭岛屿」。

// 请返回封闭岛屿的数目。

//

// 示例 1：
// 输入：grid = [[1,1,1,1,1,1,1,0],[1,0,0,0,0,1,1,0],[1,0,1,0,1,1,1,0],[1,0,0,0,0,1,0,1],[1,1,1,1,1,1,1,0]]
// 输出：2
// 解释：
// 灰色区域的岛屿是封闭岛屿，因为这座岛屿完全被水域包围（即被 1 区域包围）。
// 示例 2：
// 输入：grid = [[0,0,1,0,0],[0,1,0,1,0],[0,1,1,1,0]]
// 输出：1
// 示例 3：

// 输入：grid = [[1,1,1,1,1,1,1],
//              [1,0,0,0,0,0,1],
//              [1,0,1,1,1,0,1],
//              [1,0,1,0,1,0,1],
//              [1,0,1,1,1,0,1],
//              [1,0,0,0,0,0,1],
//              [1,1,1,1,1,1,1]]
// 输出：2
//
// 提示：

// 1 <= grid.length, grid[0].length <= 100
// 0 <= grid[i][j] <=1

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/number-of-closed-islands
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[][]} grid
 * @return {number}
 */
var closedIsland = function(grid) {
    let islands = 0;
    let count = 0;
    function helper(grid, x, y) {
      if (x < 0 || x >= grid.length || y < 0 || y >= grid[0].length) {
        islands++;
        return;
      }
      if (grid[x][y] !== 0) {
        return;
      }
      grid[x][y] = -1;
      helper(grid, x - 1, y);
      helper(grid, x, y - 1);
      helper(grid, x + 1, y);
      helper(grid, x, y + 1);
    }
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[row].length; col++) {
        const currentElement = grid[row][col];
        if (currentElement === 0) {
          helper(grid, row, col);
          if (!islands) {
            count++;
          }
          islands = 0;
        }
      }
    }
    return count;
//   var dfs = (grid, i, j) => {
//     let h = grid.length,
//       w = grid[0].length;

//     if (i < 0 || j < 0 || i >= h || j >= w) return false;
//     if (grid[i][j] == 1) return true;

//     grid[i][j] = 1;
//     let up = dfs(grid, i - 1, j);
//     let down = dfs(grid, i + 1, j);
//     let left = dfs(grid, i, j - 1);
//     let right = dfs(grid, i, j + 1);
//     if (up && down && left && right) return true;
//     else return false;
//   };
//   let h = grid.length,
//     w = grid[0].length;
//   let res = 0;
//   for (let i = 0; i < h; i++) {
//     for (let j = 0; j < w; j++) {
//       if (grid[i][j] == 0) {
//         if (dfs(grid, i, j)) res++;
//       }
//     }
//   }
//   console.log(res);

//   return res;
};
