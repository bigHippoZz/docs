// 幂集。编写一种方法，返回某集合的所有子集。集合中不包含重复的元素。

// 说明：解集不能包含重复的子集。

// 示例:

//  输入： nums = [1,2,3]
//  输出：
// [
//   [3],
//   [1],
//   [2],
//   [1,2,3],
//   [1,3],
//   [2,3],
//   [1,2],
//   []
// ]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/power-set-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  const res = [];
  const dfs = (path, index) => {
    res.push(path.slice());
    for (let i = index; i < nums.length; i++) {
      path.push(nums[i]);
      dfs(path, i + 1);
      path.pop();
    }
  };

  dfs([], 0);
  return res;
};

const result = subsets([1, 2, 3]);

console.log(result);
