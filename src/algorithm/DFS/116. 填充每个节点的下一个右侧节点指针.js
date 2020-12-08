// 给定一个 完美二叉树 ，其所有叶子节点都在同一层，每个父节点都有两个子节点。二叉树定义如下：

// struct Node {
//   int val;
//   Node *left;
//   Node *right;
//   Node *next;
// }
// 填充它的每个 next 指针，让这个指针指向其下一个右侧节点。如果找不到下一个右侧节点，则将 next 指针设置为 NULL。

// 初始状态下，所有 next 指针都被设置为 NULL。

//

// 进阶：

// 你只能使用常量级额外空间。
// 使用递归解题也符合要求，本题中递归程序占用的栈空间不算做额外的空间复杂度。
//

// 示例：

// 输入：root = [1,2,3,4,5,6,7]
// 输出：[1,#,2,3,#,4,5,6,7,#]
// 解释：给定二叉树如图 A 所示，你的函数应该填充它的每个 next 指针，以指向其下一个右侧节点，如图 B 所示。序列化的输出按层序遍历排列，同一层节点由 next 指针连接，'#' 标志着每一层的结束。
//

// 提示：

// 树中节点的数量少于 4096
// -1000 <= node.val <= 1000

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/populating-next-right-pointers-in-each-node
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  // 第一遍代码
  //   if (!root) return null;
  //   const queue = [root];
  //   while (queue.length) {
  //     const len = queue.length;
  //     let currentList = null;
  //     for (let i = 0; i < len; i++) {
  //       const currentItem = queue.shift();
  //       if (currentList) currentList.next = currentItem;
  //       currentList = currentItem;
  //       currentItem.left && queue.push(currentItem.left);
  //       currentItem.right && queue.push(currentItem.right);
  //     }
  //   }
  //   return root;
  // 利用BFS来进行遍历，但是效率太低，时间复杂度 O(n) 空间复杂度 O(n)
  // 玩指针
  //   let currentLeft = root;
  //   while (currentLeft.left !== null) {
  //     let head = currentLeft;
  //     while (head !== null) {
  //       head.left.next = head.right;
  //       if (head.next) {
  //         head.right.next = head.next.left;
  //       }
  //       head = head.next;
  //     }
  //     currentLeft = currentLeft.left;
  //   }
  //   return root;

  // 递归
  // 最重要的一点就是我们着重处理树的下一层节点
  if (!root || !root.left) {
    return root;
  }
  root.left.next = root.right;
  if (root.next) {
    root.right.next = root.next.left;
  }
  connect(root.left);
  connect(root.right);
  return root;
  // 时间复杂度 O(n) // 空间复杂度 O(n)
};
