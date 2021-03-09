// 剑指 Offer 24. 反转链表
// 定义一个函数，输入一个链表的头节点，反转该链表并输出反转后链表的头节点。

// 示例:

// 输入: 1->2->3->4->5->NULL
// 输出: 5->4->3->2->1->NULL

// 限制：

// 0 <= 节点个数 <= 5000

// 注意：本题与主站 206 题相同：https://leetcode-cn.com/problems/reverse-linked-list/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

class ListNode {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}
/**
 * 数组生成链表
 * @param {array} array
 */
export function generateLinkedList(array) {
  let index = 1;
  const length = array.length;
  const result = new ListNode(array[0]);
  let current = result;
  while (index < length) {
    const currentVal = array[index];
    current.next = new ListNode(currentVal);
    current = current.next;
    index++;
  }
  return result;
}

// console.log(generateLinkedList([1, 2, 3, 4, 5, 6]));

const input = generateLinkedList([1, 2, 3, 4, 5]);
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const reverseList = function(head) {
  //   let prev = null;
  //   let curr = head;
  //   // 1->2->3->null
  //   // 使用双指针进行反转，保存上一份的地址，然后将当前的node指向prev的node
  //   while (curr) {
  //     // 反转链表
  //     // 保存下一次的地址
  //     const next = curr.next;
  //     // 进行反转
  //     curr.next = prev;
  //     // 为下一次的链表反转做准备
  //     // 重置prev
  //     prev = curr;
  //     // 重置curr
  //     curr = next;
  //   }
  //   return prev;

  // let prev = null;
  // let curr = head;

  // while (curr) {
  //   const nextCurr = curr.next;
  //   curr.next = prev;
  //   // 一定是进行prev地址的保存
  //   prev = curr;
  //   curr = nextCurr;
  //   console.log(prev);
  // }
  // // 为什莫最后返回的是prev
  // //
  // return prev;

  /* 递归 */
  if (head === null || head.next === null) {
    return head;
  }
  const newNode = reverseList(head.next);
  newNode.next = head;
  console.log(head, "head");
  head.next = null;
  console.log(JSON.stringify(newNode), "newNode");
  return newNode;
};

// const result = reverseList(input);

// console.log(result);
