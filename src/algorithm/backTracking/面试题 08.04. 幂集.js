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
const subsets = function(nums) {
  const len = nums.length
  const result  = []

  // path可以理解为当前递归树的路径
  // index是终结递归的条件
  function dfs(path,index){
    result.push(path.slice())
    for(let i = index; i < len ; i++){
      // 添加路径，类似前序遍历处理地方
      path.push(nums[i])
      dfs(path,i+1)
      path.pop()
      // 删除路径，类似后序遍历处理的地方
    }
  }
  dfs([],0)  
  return result
};

// const result = subsets([1, 2, 3]);

// console.log(result);



//思路：这道题算是回溯算法的入门题目，我的理解是DFS，进一一步说的话就是栈的理解，在特定的时机进行出栈入栈操作，这才是精髓所在.
