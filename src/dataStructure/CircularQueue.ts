/**
 * 循环队列
 *
 * 思路：
 * 1.队尾不能与队头重叠，队尾永远追不上队头
 * 2.队头可以与队尾重叠，这种情况下队列中只剩一个元素
 * 3.利用求余数来进行指针的移动
 */
class Queue<T> {
  len: number;
  head: number;
  tail: number;
  queue: Array<T>;

  constructor(len: number) {
    this.len = len;
    this.head = -1;
    this.tail = -1;
    this.queue = [];
  }
  /**
   * 入队列
   * @param value T
   */
  enQueue(value: T) {
    if (this.isFull()) {
      return false;
    }
    if (this.isEmpty()) {
      this.head = 0;
    }
    this.tail = (this.tail + 1) % this.len;
    this.queue[this.tail] = value;
    return true;
  }
  /**
   * 出队列
   */
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    if (this.head === this.tail) {
      this.head = this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.len;
    }
    return true;
  }
  isEmpty() {
    return this.head === -1;
  }
  isFull() {
    return this.head === (this.tail + 1) % this.len;
  }
}

const queue = new Queue(3);

queue.enQueue(10);
queue.enQueue(10);
queue.enQueue(10);
queue.deQueue();
queue.deQueue();
// queue.deQueue();
// console.log(queue.isEmpty());

class ListNode<T> {
  val: T;
  prev: ListNode<T> | null;
  next: ListNode<T> | null;
  constructor(val: T) {
    this.val = val;
    this.prev = this.next = null;
  }
}
// 双向循环队列 使用链表 // 等学完链表在看！
class TwoWayCircularQueue {
  private length: number;
  private head: ListNode<number>;
  private tail: ListNode<number>;
  constructor(private capacity: number /** 储存队列的容量 */) {
    const node = this.createNode(-1);
    this.length = 0; // 储存队列的长度
    this.head = node;
    this.tail = node;
  }
  createNode(val = -1) {
    return new ListNode(val);
  }

  insertFront(val: number) {
    // 判断是不是满了
    if (this.isFull()) {
      return false;
    }
    // 创建链表
    const node = new ListNode(val);
    // 头部的next与node链接
    this.head.next = node;
    // node.prev = this.head
    node.prev = this.head;
    this.length++;
    return true;
  }

  insertLast(val: number) {
    if (this.isFull()) {
      return false;
    }
    // 将新值存储到尾指针的节点上
    this.tail.val = val;
    // 创建节点
    const node = new ListNode(-1);
    // 将节点与尾指针的节点相连接
    this.tail.prev = node;
    node.next = this.tail;
    this.tail = node;
    this.length++;
    return true;
  }

  isEmpty() {
    return !this.length;
  }
  isFull(): boolean {
    return this.length === this.capacity;
  }
}

const twoWayCircularQueue = new TwoWayCircularQueue(10);
// 给定一个数组 nums 和滑动窗口的大小 k，请找出所有滑动窗口里的最大值。

// 示例:

// 输入: nums = [1,3,-1,-3,5,3,6,7], 和 k = 3
// 输出: [3,3,5,5,6,7]
// 解释:

//   滑动窗口的位置                最大值
// ---------------               -----
// [1  3  -1] -3  5  3  6  7       3
//  1 [3  -1  -3] 5  3  6  7       3
//  1  3 [-1  -3  5] 3  6  7       5
//  1  3  -1 [-3  5  3] 6  7       5
//  1  3  -1  -3 [5  3  6] 7       6
//  1  3  -1  -3  5 [3  6  7]      7

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

// function maxSlidingWindow(nums: number[], k: number): number[] {
//   if (k === 1) return nums;
//   if (!nums.length) return [];

//   // 最终结果为 n- k + 1

//   const result: number[] = new Array(nums.length - k + 1).fill(0);

//   const queue = new Queue(k);
//   // const queue : number[] = []
//   const len = nums.length;
//   for (let j = 0, i = 1 - k; j < len; i++, j++) {
//     if (i > 0 && queue.peekFist() === nums[i - 1]) {
//       queue.deQueue();
//     }
//     while (!queue.isEmpty() && queue.peekLast() < nums[j]) {
//       queue.deQueue();
//     }
//   }
// }

// class Solution {
//   public int[] maxSlidingWindow(int[] nums, int k) {
//       if(nums.length == 0 || k == 0) return new int[0];
//       Deque<Integer> deque = new LinkedList<>();
//       int[] res = new int[nums.length - k + 1];
//       for(int j = 0, i = 1 - k; j < nums.length; i++, j++) {
//           if(i > 0 && deque.peekFirst() == nums[i - 1])
//               deque.removeFirst(); // 删除 deque 中对应的 nums[i-1]
//           while(!deque.isEmpty() && deque.peekLast() < nums[j])
//               deque.removeLast(); // 保持 deque 递减
//           deque.addLast(nums[j]);
//           if(i >= 0)
//               res[i] = deque.peekFirst();  // 记录窗口最大值
//       }
//       return res;
//   }
// }

// 作者：jyd
// 链接：https://leetcode-cn.com/problems/hua-dong-chuang-kou-de-zui-da-zhi-lcof/solution/mian-shi-ti-59-i-hua-dong-chuang-kou-de-zui-da-1-6/
// 来源：力扣（LeetCode）
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

// /**
//  * Initialize your data structure here. Set the size of the deque to be k.
//  * @param {number} k
//  */
// function ListNode (prev, value, next) {
//   this.prev = prev ? prev : null;
//   this.value = value ? value : 0;
//   this.next = next ? next : null;
// }

// var MyCircularDeque = function(k) {
//   this._maxLength = k;
//   this.length = 0;
//   this.head = new ListNode();
//   this.head.prev = this.head;
//   this.head.next = this.head;
// };

// /**
// * Adds an item at the front of Deque. Return true if the operation is successful.
// * @param {number} value
// * @return {boolean}
// */
// MyCircularDeque.prototype.insertFront = function(value) {
//   if (this.length < this._maxLength) {
//       const tempNext = this.head.next;
//       this.head.next = new ListNode(this.head, value, tempNext);
//       tempNext.prev = this.head.next;
//       this.length++;
//       return true;
//   }
//   return false;
// };

// /**
// * Adds an item at the rear of Deque. Return true if the operation is successful.
// * @param {number} value
// * @return {boolean}
// */
// MyCircularDeque.prototype.insertLast = function(value) {
//   if (this.length < this._maxLength) {
//       const tempPrev = this.head.prev;
//       this.head.prev = new ListNode(tempPrev, value, this.head);
//       tempPrev.next = this.head.prev;
//       this.length++;
//       return true;
//   }
//   return false;
// };

// /**
// * Deletes an item from the front of Deque. Return true if the operation is successful.
// * @return {boolean}
// */
// MyCircularDeque.prototype.deleteFront = function() {
//   if (this.length > 0) {
//       const tempNode = this.head.next;
//       this.head.next = tempNode.next;
//       tempNode.next.prev = this.head;
//       this.length--;
//       return true;
//   }
//   return false;
// };

// /**
// * Deletes an item from the rear of Deque. Return true if the operation is successful.
// * @return {boolean}
// */
// MyCircularDeque.prototype.deleteLast = function() {
//   if (this.length > 0) {
//       const tempNode = this.head.prev;
//       this.head.prev = tempNode.prev;
//       tempNode.prev.next = this.head;
//       this.length--;
//       return true;
//   }
//   return false;
// };

// /**
// * Get the front item from the deque.
// * @return {number}
// */
// MyCircularDeque.prototype.getFront = function() {
//   if (this.length > 0) {
//       return this.head.next.value;
//   }
//   return -1;
// };

// /**
// * Get the last item from the deque.
// * @return {number}
// */
// MyCircularDeque.prototype.getRear = function() {
//   if (this.length > 0) {
//       return this.head.prev.value;
//   }
//   return -1;
// };

// /**
// * Checks whether the circular deque is empty or not.
// * @return {boolean}
// */
// MyCircularDeque.prototype.isEmpty = function() {
//   return this.length === 0;
// };

// /**
// * Checks whether the circular deque is full or not.
// * @return {boolean}
// */
// MyCircularDeque.prototype.isFull = function() {
//   return this.length === this._maxLength;
// };

// /**
// * Your MyCircularDeque object will be instantiated and called as such:
// * var obj = new MyCircularDeque(k)
// * var param_1 = obj.insertFront(value)
// * var param_2 = obj.insertLast(value)
// * var param_3 = obj.deleteFront()
// * var param_4 = obj.deleteLast()
// * var param_5 = obj.getFront()
// * var param_6 = obj.getRear()
// * var param_7 = obj.isEmpty()
// * var param_8 = obj.isFull()
// */
