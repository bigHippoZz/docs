// 深度优先搜索模板
import { onMounted } from "vue";
import { querySelector } from "./BSF";
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

export interface Tree {
  val: string | number;
  left?: Tree | undefined;
  right?: Tree | undefined;
}
// 树状结构中序遍历
export function inorderTraversal_stack(root: Tree | undefined) {
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
    root = stack.pop() as Tree;
    nodes.push({ context: root, value: root.val });
    // 出栈那一刻就会进入right的分支
    root = root.right;
  }
  return nodes;
}
export const tree: Tree = {
  val: 1,
  left: {
    val: 2,
    left: { val: 23 },
    right: { val: 89 },
  },
  right: {
    val: 101,
    left: { val: 46 },
    right: { val: 100 },
  },
};

// const result = inorderTraversal(tree);
// console.log(result);

// 递归版本的遍历
export const inorderTraversal = (root: Tree) => {
  const result: Array<string | number> = [];
  function forEach(root: Tree | undefined) {
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
var findTargetSumWays = function(nums: number[], S: number) {
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

