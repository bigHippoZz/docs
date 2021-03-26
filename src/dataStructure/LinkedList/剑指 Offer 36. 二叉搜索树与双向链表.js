// 剑指 Offer 36. 二叉搜索树与双向链表
// 输入一棵二叉搜索树，将该二叉搜索树转换成一个排序的循环双向链表。要求不能创建任何新的节点，只能调整树中节点指针的指向。

import { generateLinkedList } from "./剑指 Offer 24. 反转链表";

//

// 为了让您更好地理解问题，以下面的二叉搜索树为例：

//

//

// 我们希望将这个二叉搜索树转化为双向循环链表。链表中的每个节点都有一个前驱和后继指针。对于双向循环链表，第一个节点的前驱是最后一个节点，最后一个节点的后继是第一个节点。

// 下图展示了上面的二叉搜索树转化成的链表。“head” 表示指向链表中有最小元素的节点。

//

//

// 特别地，我们希望可以就地完成转换操作。当转化完成以后，树中节点的左指针需要指向前驱，树中节点的右指针需要指向后继。还需要返回链表中的第一个节点的指针。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/er-cha-sou-suo-shu-yu-shuang-xiang-lian-biao-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * // Definition for a Node.
 * function Node(val,left,right) {
 *    this.val = val;
 *    this.left = left;
 *    this.right = right;
 * };
 */
/**
 * @param {Node} root
 * @return {Node}
 */
const treeToDoublyList = function(root) {

// 暂时没写完
//   if (!root) {
//     return;
//   }
//   let head = null;
//   let pre = head;
//   inorder(root);
//   // 完成中序遍历后，pre指向了最后一个节点
//   // 将其闭合成环状结构
//   head.left = pre;
//   pre.right = head;
//   console.log(head);
//   return head;

//   /**
//    * @param {Node} node
//    */
//   function inorder(node) {
//     if (!node) return;
//     // 遍历左子树
//     inorder(node.left, pre);

//     // 处理当前节点
//     if (!pre) {
//       // 遍历到最左边节点，此时节点就是双向链表的head
//       head = node;
//     } else {
//       pre.right = node;
//     }
//     node.left = pre;
//     pre = node;

//     // 遍历右子树
//     inorder(node.right, pre);
//   }
};

const linked = generateLinkedList([1, 2, 3, 4, 5]);
treeToDoublyList({
  val: 2,
  left: { val: 1 },
  right: { val: 3 },
});
// console.log(linked);
