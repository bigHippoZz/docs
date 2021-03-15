// 剑指 Offer 59 - I. 滑动窗口的最大值
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

class ListNode {
  constructor(val) {
    this.next = this.prev = null;
    this.val = val;
  }
}

class Deque {
  constructor(max) {
    this.head = this.createNode("head");
    this.last = this.createNode("last");
    this.head.next = this.last;
    this.last.prev = this.head;
    this.length = 0;
    this.max = max;
  }

  createNode(val) {
    return new ListNode(val);
  }

  insertFront(val) {
    if (this.isFull) {
      return false;
    }
    const currentNode = this.createNode(val);
    const nextNode = this.head.next;
    this.head.next = currentNode;
    currentNode.prev = this.head;
    currentNode.next = nextNode;
    nextNode.prev = currentNode;
    this.length++;
    return true;
  }
  insertLast(val) {
    if (this.isFull) {
      return false;
    }
    const currentNode = this.createNode(val);
    const prevNode = this.last.prev;
    this.last.prev = currentNode;
    currentNode.next = this.last;
    currentNode.prev = prevNode;
    prevNode.next = currentNode;

    this.length++;
    return true;
  }
  deleteFront() {
    if (this.isEmpty) {
      return false;
    }
    const currentNode = this.head.next?.next;
    this.head.next = currentNode;
    currentNode.prev = this.head;
    this.length--;
    return true;
  }
  deleteLast() {
    if (this.isEmpty) {
      return false;
    }
    const currentNode = this.last.prev?.prev;
    this.last.prev = currentNode;
    currentNode.next = this.last;
    this.length--;
    return true;
  }
  getFront() {
    if (this.isEmpty) {
      return -1;
    }
    return this.head.next.val;
  }
  getRear() {
    if (this.isEmpty) {
      return -1;
    }
    return this.last.prev.val;
  }
  get isFull() {
    return this.length >= this.max;
  }
  get isEmpty() {
    return this.length === 0;
  }
}
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSlidingWindow = function(nums, k) {
    const { length } = nums;
    const result = [];
    let index = 0;
    if (!length) return result;
    if (!k) return nums;
    const queue = new Deque(k);
    for (let i = 0; i < k; i++) {
      const ele = nums[i];
      while (!queue.isEmpty && queue.getRear() < ele) {
        queue.deleteLast();
      }
      queue.insertLast(ele);
    }
    result[index++] = queue.getFront();
    for (let i = k; i < length; i++) {
      if (nums[i - k] === queue.getFront()) {
        queue.deleteFront();
      }
  	while(!queue.isEmpty&&queue.getRear() < nums[i]) {
  		queue.deleteLast();
  	}
  	queue.insertLast(nums[i]);
  	result[index++] = queue.getFront();
    }
    return result;
};

// maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3);
