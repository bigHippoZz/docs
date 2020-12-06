import { TreeNode } from "../BinaryTreeForEach";

// 113. 路径总和 II
// 给定一个二叉树和一个目标和，找到所有从根节点到叶子节点路径总和等于给定目标和的路径。

// 说明: 叶子节点是指没有子节点的节点。

// 示例:
// 给定如下二叉树，以及目标和 sum = 22，

//               5
//              / \
//             4   8
//            /   / \
//           11  13  4
//          /  \    / \
//         7    2  5   1
// 返回:

// [
//    [5,4,11,2],
//    [5,8,4,5]
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/path-sum-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// 思路

/**
 * 根据自顶而下的顺讯进行遍历，添加参数进行数组的累加 这是我自己的思路,难点主要在于自顶向下的数组参数进行复用
 */

// 题解

/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 */
var pathSum = function(root, sum) {
  if (!root) return [];
  const result = [];
  function loop(root, total, path) {
    if (!root) return;
    // 首先进行数值的累加
    total += root.val;
    // 将当前的val放入路径之中 类似一种栈的模拟
    path.push(root.val);
    if (total === sum && !root.left && !root.right) {
      // 如果满足条件则进行浅拷贝 放入最后的结果之中
      result.push([...path]);
      // 将当前的路径进行删除 类似栈的弹出
      path.pop();
      return;
    }
    loop(root.left, total, path);
    loop(root.right, total, path);
    // 类似一种栈的模拟
    path.pop();
  }
  // 这样就到达复用数组的方式 空间复杂度为O(2h)
  loop(root, 0, []);
  return result
};
