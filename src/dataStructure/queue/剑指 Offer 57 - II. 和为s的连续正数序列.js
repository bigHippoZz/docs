// 剑指 Offer 57 - II. 和为s的连续正数序列
// 输入一个正整数 target ，输出所有和为 target 的连续正整数序列（至少含有两个数）。

// 序列内的数字由小到大排列，不同序列按照首个数字从小到大排列。

//

// 示例 1：

// 输入：target = 9
// 输出：[[2,3,4],[4,5]]
// 示例 2：

// 输入：target = 15
// 输出：[[1,2,3,4,5],[4,5,6],[7,8]]
//

// 限制：

// 1 <= target <= 10^5

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/he-wei-sde-lian-xu-zheng-shu-xu-lie-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} target
 * @return {number[][]}
 */
const findContinuousSequence = function(target) {
  /* 牛逼 */
  const max = (target >> 1) + 1, // 可选的最大正数范围 [1, max]
    queue = [], // 单调递增队列
    res = []; // 结果集
  let sum = 0;
  for (let v = 1; v <= max; v++) {
    // 一次将范围值入队
    sum += v;
    queue.push(v);
    // 当大于期望值target 时 出队且更新sum
    while (sum > target) {
      sum -= queue.shift();
    }
    // 当满足条件 存入结果集
    if (sum === target && queue.length >= 2) res.push([...queue]);
  }
  return res;
};