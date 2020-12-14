// 109. 有序链表转换二叉搜索树
// 给定一个单链表，其中的元素按升序排序，将其转换为高度平衡的二叉搜索树。

// 本题中，一个高度平衡二叉树是指一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过 1。

// 示例:

// 给定的有序链表： [-10, -3, 0, 5, 9],

// 一个可能的答案是：[0, -3, 9, -10, null, 5], 它可以表示下面这个高度平衡二叉搜索树：

//       0
//      / \
//    -3   9
//    /   /
//  -10  5

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/convert-sorted-list-to-binary-search-tree
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var _sortedListToBST = function(head) {
  // 跟108差不多 就是将链表进行遍历获取一个新的数组然后进行生成新的二叉树
  //   const array = [];
  //   while (head) {
  //     array.push(head.val);
  //     head = head.next;
  //   }
  //   function forEach(left, right) {
  //     // 注意这里left === right的时候也不会停止递归
  //     if (left > right) return null;
  //     const minIndex = (left + right) >>> 1;
  //     const root = new TreeNode(array[minIndex]);
  //     root.left = forEach(left, minIndex - 1);
  //     root.right = forEach(minIndex + 1, right);
  //     return root;
  //   }
  //   return forEach(0, array.length - 1);
  // 中序遍历构建二叉树
};

const sortedListToBST = (head) => {
  if (head == null) return null;
  let len = 0;
  let h = head; // h初始指向头结点
  while (head) {
    // 计算链表节点个数
    len++;
    head = head.next;
  }
  const buildBST = (start, end) => {
    if (start > end) return null; // 递归出口，返回null节点
    const mid = (start + end) >>> 1; // 求mid，只是为了分治，不会用它断开链表
    const left = buildBST(start, mid - 1); // 先递归构建左子树
    const root = new TreeNode(h.val); // 根据 h.val 构建节点
    h = h.next; // h指针步进
    root.left = left; // root接上左子树
    root.right = buildBST(mid + 1, end); // 构建当前root的右子树
    return root;
  };
  return buildBST(0, len - 1);
};
