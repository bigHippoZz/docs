// 深度优先搜索模板
import { onMounted } from "vue";
import { querySelector } from "./BSF";

import { TreeNode } from "./BinaryTreeForEach";
// 非递归版本
function DepthFirstSearchTemplate(node: Element) {
  const nodes = [];
  const stack = [node];
  const visited = new Set();
  while (stack.length) {
    const currentNode = stack.pop();
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);
    nodes.push(currentNode);
    if (currentNode) {
      for (const children of currentNode?.children) {
        stack.push(children);
      }
    }
  }
  return nodes;
}

// 递归版本
function DepthFirstSearchTemplateRecursion(
  node: Element,
  nodeList: Array<Element> = []
) {
  if (node) {
    nodeList.push(node);
    for (const children of node.children) {
      DepthFirstSearchTemplateRecursion(children, nodeList);
    }
  }
  return nodeList;
}

export function useDFSforEachNode(el: string) {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const node = querySelector(el);
      if (!node) return reject(new Error("Could not find node"));
      setTimeout(() => {
        resolve(DepthFirstSearchTemplateRecursion(node));
      }, 1000);
    });
  });
}

// 岛屿数量  https://leetcode-cn.com/problems/number-of-islands/
// 利用递归调用栈
function helper(grid: string[][], row: number, col: number) {
  if (
    row < 0 ||
    row >= grid.length ||
    col < 0 ||
    col >= grid[0].length ||
    grid[row][col] !== "1"
  ) {
    return;
  }
  grid[row][col] = "0";
  helper(grid, row + 1, col);
  helper(grid, row - 1, col);
  helper(grid, row, col + 1);
  helper(grid, row, col - 1);
}

function numIslands(grid: string[][]): number {
  if (!grid || !grid.length) return 0;
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === "1") {
        count++;
        helper(grid, row, col);
      }
    }
  }
  return count;
}

// 树状结构中序遍历
export function inorderTraversalStack(root: TreeNode | null) {
  const nodes = [];
  const stack = [];
  while (root || stack.length) {
    // 终止条件：当root为最左侧的节点时，root = root.left，此时root已经为undefined
    while (root) {
      // 获取当前最深的左侧树
      stack.push(root);
      root = root.left;
    }
    // 备注 此时的root一定是 undefined
    root = stack.pop() as TreeNode;
    nodes.push({ context: root, value: root.val });
    // 出栈那一刻就会进入right的分支
    root = root.right;
  }
  return nodes;
}
export const tree: TreeNode = {
  val: 8,
  left: {
    val: 2,
    left: null,
    right: { val: 3, left: null, right: null },
  },
  right: {
    val: 9,
    left: null,
    right: null,
  },
};

// const result = inorderTraversal(tree);
// console.log(result);

// 递归版本的遍历
export const inorderTraversal = (root: TreeNode) => {
  const result: Array<string | number> = [];
  function forEach(root: TreeNode | null) {
    if (!root) return;
    forEach(root.left);
    result.push(root.val);
    forEach(root.right);
  }
  forEach(root);
  return result;
};

// 494. 目标和 https://leetcode-cn.com/problems/target-sum/

// 利用递归深度进行计算
// 利用递归进行计算 然后得出最终的结果，进行n++
const findTargetSumWays = function(nums: number[], S: number) {
  let count = 0;
  const loop = (index: number, sum: number) => {
    if (nums.length > index) {
      // 注意不要随意变更index的数值 因为要使用index进行数组的访问！！
      loop(index + 1, sum - nums[index]);
      loop(index + 1, sum + nums[index]);
    } else {
      sum === S && count++;
    }
  };
  loop(0, 0);
  return count;
};

// debugger
// 剑指 Offer 55 - I. 二叉树的深度
// 输入一棵二叉树的根节点，求该树的深度。从根节点到叶节点依次经过的节点（含根、叶节点）形成树的一条路径，最长路径的长度为树的深度。

// 例如：

// 给定二叉树 [3,9,20,null,null,15,7]，

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回它的最大深度 3 。

// 提示：

// 节点总数 <= 10000

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/er-cha-shu-de-shen-du-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// 采用BFS
function maxDepth(root: TreeNode | null): number {
  if (!root) return 0;
  const queue = [root];
  let count = 0;
  while (queue.length) {
    const len = queue.length;
    count++;
    for (let i = 0; i < len; i++) {
      const current = queue.shift();
      current?.left && queue.push(current.left);
      current?.right && queue.push(current.right);
    }
  }
  return count;
}
// 使用DFS  自底向上
function maxDepthDFS(root: TreeNode | null): number {
  if (!root) return 0;
  const left = maxDepthDFS(root.left);
  const right = maxDepthDFS(root.right);
  return Math.max(left + 1, right + 1);
}
// 自顶向下
function forEachTree(root: TreeNode | null) {
  let ans = 0;
  function loop(root: TreeNode | null, sum: number) {
    if (!root) return;
    if (!root.left && !root.right) {
      ans = Math.max(ans, sum);
    }
    loop(root.left, sum + 1);
    loop(root.right, sum + 1);
  }
  loop(root, 1);
  return ans;
}
const result = forEachTree(tree);

console.log(result);

// 给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \      \
//         7    2      1
// 返回 true, 因为存在目标和为 22 的根节点到叶子节点的路径 5->4->11->2。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/path-sum
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 思路： 这道题目一样就能瞅出题解，一开始我的思路是用自顶而下的思路，将遍历节点的val进行累加，
// 然后进行一个边界判断(!root.left&&!root.right)当前累加的值跟目标和是否一致然后返回结果。

// 这是第一遍的代码
function hasPathSum(root: TreeNode | null, sum: number) {
  let flag = false;
  function loop(root: TreeNode | null, num: number) {
    if (!root) return;
    if (!root.left && !root.right) {
      sum === num + root.val && (flag = true);
    }
    loop(root.left, num + root.val);
    loop(root.right, num + root.val);
  }
  loop(root, 0);
  return flag;
}



// 看到大神写的代码，真是简洁明了啊 
// function hasPathSum(root: TreeNode | null, sum: number): boolean {
//   if (!root) return false;
//   if (!root.left && !root.right) {
//     return sum === root.val;
//   }
//   return (
//     hasPathSum(root.left, sum - root.val) ||
//     hasPathSum(root.right, sum - root.val)
//   );
// }
// 时间复杂度：O(N) 其中N是树的节点数，每个节点都会进行访问
// 空间复杂度：O(H) 其中H是树的高度，在啰嗦一遍进行DFS分析复杂度的时候一定不能忘掉栈的开销最坏的情况下树呈链状，空间复杂度为O(N)，
// 但是平均情况下，空间复杂度为O(logN)
