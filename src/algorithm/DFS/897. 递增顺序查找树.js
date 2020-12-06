// 给你一个树，请你 按中序遍历 重新排列树，使树中最左边的结点现在是树的根，并且每个结点没有左子结点，只有一个右子结点。

//

// 示例 ：

// 输入：[5,3,6,2,4,null,8,1,null,null,null,7,9]

//        5
//       / \
//     3    6
//    / \    \
//   2   4    8
//  /        / \
// 1        7   9

// 输出：[1,null,2,null,3,null,4,null,5,null,6,null,7,null,8,null,9]

//  1
//   \
//    2
//     \
//      3
//       \
//        4
//         \
//          5
//           \
//            6
//             \
//              7
//               \
//                8
//                 \
//                  9
//

// 提示：

// 给定树中的结点数介于 1 和 100 之间。
// 每个结点都有一个从 0 到 1000 范围内的唯一整数值。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/increasing-order-search-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST = function(root) {
  let result = [];
  function loop(root) {
    if (!root) return;
    loop(root.left);
    result.push(root.val);
    loop(root.right);
  }

  loop(root);

  let nextRootRes = new TreeNode(result.shift());
  let currentRoot = nextRootRes;
  while (result.length) {
    currentRoot.right = new TreeNode(result.shift());
    currentRoot = currentRoot.right;
  }

  // 时间复杂度 O(2n)
  // 空间复杂度 O(H+n)

  return nextRootRes;
};

/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var increasingBST2 = function(root) {
  const result = new TreeNode(root.val);
  let current = result;
  function loop(root) {
    if (!root) return;
    loop(root.left);
    current.right = new TreeNode(root.val);
    current = current.right;
    loop(root.right);
  }
  loop(root);
  return result.right;

  // 时间复杂度 O(N) 遍历节点的次数
  // 空间复杂度 O(H) 调用栈最大层数
};


思路 

/**
 * 这道题总体的思路就是先遍历整个树，然后生成新的树 刚开始我的想法是先保存一份树遍历的结果然后进行生成 
 * 但是这样的话时间复杂度就是升高
 * 所以后来看了大神的解答 这道题有点类似链表的思想，声明两个变量然后，一个进行保存当前链表的地址，另一个进行保存当前链表的指针 
 * 逐一进行生成
 */