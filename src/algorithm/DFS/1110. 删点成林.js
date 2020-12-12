// 1110. 删点成林
// 给出二叉树的根节点 root，树上每个节点都有一个不同的值。

// 如果节点值在 to_delete 中出现，我们就把该节点从树上删去，最后得到一个森林（一些不相交的树构成的集合）。

// 返回森林中的每棵树。你可以按任意顺序组织答案。

// 示例：
// 输入：root = [1,2,3,4,5,6,7], to_delete = [3,5]
// 输出：[[1,2,null,4],[6],[7]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/delete-nodes-and-return-forest
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
 * @param {number[]} to_delete
 * @return {TreeNode[]}
 */
var delNodes = function(root, to_delete) {
  const needDelete = new Set(to_delete);
  const result = [];
  // 对根节点进行判断
  if (!needDelete.has(root.val)) {
    result.push(root);
  }
  function helper(node, parent, direction) {
    if (!node) return;
    // 最开始的一个错误就是，就是将parent没有变更，一直传的是parent
    helper(node.left, node, "left");
    helper(node.right, node, "right");
    if (needDelete.has(node.val)) {
      node.left && !needDelete.has(node.left.val) && result.push(node.left);
      node.right && !needDelete.has(node.right.val) && result.push(node.right);
      if (direction === "left") {
        parent.left = null;
      }

      if (direction === "right") {
        parent.right = null;
      }
    }
  }
  helper(root, root);
  return result;
};

// 基本思路 当时看到这题的时候毫无头绪，没办法只能看答案了，首先我们进行遍历，判断当前的val是否在数组中，在的话将
// 当前的左子树和右子树添加到当前的result中,然后就是进行移除节点，如果删除的数组中没有根节点直接将根节点放入最终的result中

// 主要的难点：
// 怎样移除节点，首选传入parent，和当前的节点，还有方向，然后继续判断是否符合移除节点的条件然后进行一处节点
// 如果没有根节点的话就需要将其放入result，由于存放的是内存地址，所以起结果也会跟着递归移除节点的效果一致
