// 695. 岛屿的最大面积

// 给定一个包含了一些 0 和 1 的非空二维数组 grid 。

// 一个 岛屿 是由一些相邻的 1 (代表土地) 构成的组合，这里的「相邻」要求两个 1 必须在水平或者竖直方向上相邻。你可以假设 grid 的四个边缘都被 0（代表水）包围着。

// 找到给定的二维数组中最大的岛屿面积。(如果没有岛屿，则返回面积为 0 。)

//

// 示例 1:

// [[0,0,1,0,0,0,0,1,0,0,0,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,1,1,0,1,0,0,0,0,0,0,0,0],
//  [0,1,0,0,1,1,0,0,1,0,1,0,0],
//  [0,1,0,0,1,1,0,0,1,1,1,0,0],
//  [0,0,0,0,0,0,0,0,0,0,1,0,0],
//  [0,0,0,0,0,0,0,1,1,1,0,0,0],
//  [0,0,0,0,0,0,0,1,1,0,0,0,0]]
// 对于上面这个给定矩阵应返回 6。注意答案不应该是 11 ，因为岛屿只能包含水平或垂直的四个方向的 1 。

// 示例 2:

// [[0,0,0,0,0,0,0,0]]
// 对于上面这个给定的矩阵, 返回 0。

//

// 注意: 给定的矩阵grid 的长度和宽度都不超过 50。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/max-area-of-island
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxAreaOfIsland = function(grid) {
  let result = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      const current = grid[row][col];
      if (current !== 1) continue;
      result = Math.max(result, helper(grid, row, col));
    }
  }
  function helper(grid, x, y) {
    if (
      x < 0 ||
      x >= grid.length ||
      y < 0 ||
      y >= grid[0].length ||
      grid[x][y] !== 1
    ) {
      return 0;
    }
    grid[x][y] = 0;
    const top = helper(grid, x - 1, y);
    const bottom = helper(grid, x + 1, y);
    const left = helper(grid, x, y - 1);
    const right = helper(grid, x, y + 1);
    return left + top + right + bottom + 1;
  }
  return result;
  // 时间复杂度 O(r * c) 遍历所有的网格
  // 空间复杂度 O(r * c) 递归调用栈可能是整个网格的数量
};
// 思路 这道题是一道平淡无奇的海岛问题，采用BFS DFS都可以进行解决，最后重要的思路就是将遍历的岛屿进行沉没设置为 0 防止在进行递归
