// 剑指 Offer 07. 重建二叉树
// 输入某二叉树的前序遍历和中序遍历的结果，请重建该二叉树。假设输入的前序遍历和中序遍历的结果中都不含重复的数字。

//

// 例如，给出

// 前序遍历 preorder = [3,9,20,15,7]
// 中序遍历 inorder = [9,3,15,20,7]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7
//

// 限制：

// 0 <= 节点个数 <= 5000

//

// 注意：本题与主站 105 题重复：https://leetcode-cn.com

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zhong-jian-er-cha-shu-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = this.right = null;
  }
}
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
const buildTree = function(preorder, inorder) {
  // 前序遍历 preorder = [3,9,20,15,7]
  // 中序遍历 inorder = [9,3,15,20,7]

  const map = Object.create(null);

  for (let i = 0; i < inorder.length; i++) {
    map[inorder[i]] = i;
  }

  function helper(root, left, right) {
    if (left > right) {
      return null;
    }
    const index = map[preorder[root]];
    const currentNode = new TreeNode(preorder[root]);
    currentNode.left = helper(root + 1, left, index - 1);
    currentNode.right = helper(root + index - left + 1, index + 1, right);
    return currentNode;
  }
  const result = helper(0, 0, inorder.length - 1);
  return result;
};

