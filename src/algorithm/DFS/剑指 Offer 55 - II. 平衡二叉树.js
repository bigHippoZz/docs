// 剑指 Offer 55 - II. 平衡二叉树
// 输入一棵二叉树的根节点，判断该树是不是平衡二叉树。如果某二叉树中任意节点的左右子树的深度相差不超过1，那么它就是一棵平衡二叉树。

//

// 示例 1:

// 给定二叉树 [3,9,20,null,null,15,7]

//     3
//    / \
//   9  20
//     /  \
//    15   7
// 返回 true 。

// 示例 2:

// 给定二叉树 [1,2,2,3,3,null,null,4,4]

//        1
//       / \
//      2   2
//     / \
//    3   3
//   / \
//  4   4
// 返回 false 。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/ping-heng-er-cha-shu-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isBalanced = function(root) {
  // 自底向上
  if (!root) return true;
  function loop(root) {
    if (!root) return 0;
    const left = loop(root.left);
    if (left === -1) return -1;
    const right = loop(root.right);
    if (right === -1) return -1;
    return Math.abs(left - right) >= 2 ? -1 : Math.max(left, right) + 1;
  }
  return loop(root) !== -1;
  //   时间复杂度 O(n)  最差的情况下会遍历整个树的所有的节点
  //   空间复杂度为 O(n) 当树的结构退化为链表的情况
};

// 基本思路
// 如果刷过二叉树的最大深度的话，这道题就容易理解了，用左侧的树的高度与右侧树的高度的绝对值进行比较，如果返回的值小于2的话 说明树是平衡的
// 具体的细节就是进行剪枝
