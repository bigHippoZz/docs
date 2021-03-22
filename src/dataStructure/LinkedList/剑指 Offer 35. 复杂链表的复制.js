// 剑指 Offer 35. 复杂链表的复制
// 请实现 copyRandomList 函数，复制一个复杂链表。在复杂链表中，每个节点除了有一个 next 指针指向下一个节点，还有一个 random 指针指向链表中的任意节点或者 null。

//

// 示例 1：

// 输入：head = [[7,null],[13,0],[11,4],[10,2],[1,0]]
// 输出：[[7,null],[13,0],[11,4],[10,2],[1,0]]
// 示例 2：

// 输入：head = [[1,1],[2,1]]
// 输出：[[1,1],[2,1]]
// 示例 3：

// 输入：head = [[3,null],[3,0],[3,null]]
// 输出：[[3,null],[3,0],[3,null]]
// 示例 4：

// 输入：head = []
// 输出：[]
// 解释：给定的链表为空（空指针），因此返回 null。
//

// 提示：

// -10000 <= Node.val <= 10000
// Node.random 为空（null）或指向链表中的节点。
// 节点数目不超过 1000 。
//

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/fu-za-lian-biao-de-fu-zhi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * // Definition for a Node.
 * function Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {Node} head
 * @return {Node}
 */
const copyRandomList = function(head) {
  const visitor = new Map();
  /**
   * @param {Node} head
   * @return {Node}
   */
  function helper(head) {
    if (!head) return null;
    if (visitor.has(head)) {
      return visitor.get(head);
    }
    const currentNode = new Node(head.val);
    // 注意一个细节 就是visitor的数据存储要放在递归之前
    // 如果不放在之前就会出现重复复制的情况
    // visitor.has(head) 的判断就是失效
    visitor.set(head, currentNode);
    currentNode.next = helper(head.next);
    currentNode.random = helper(head.random);
    return currentNode;
  }
  return helper(head);
};
