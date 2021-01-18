// 22. 括号生成
// 数字 n 代表生成括号的对数，请你设计一个函数，用于能够生成所有可能的并且 有效的 括号组合。

//

// 示例：

// 输入：n = 3
// 输出：[
//        "((()))",
//        "(()())",
//        "(())()",
//        "()(())",
//        "()()()"
//      ]
// 通过次数217,880提交次数284,076

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/generate-parentheses
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number} n
 * @return {string[]}
 */
const generateParenthesis = function(n) {
  const result = [];
  function backTracking(left, right, str) {
    if (str.length === n * 2) {
      result.push(str);
      return;
    }
    
    if (left) {
      backTracking(left - 1, right, str + "(");
    }
    if (right && left < right) {
      backTracking(left, right - 1, str + ")");
    }
  }

  backTracking(n, n, "");

  return result;
};


// 思路：本质是一种DFS的二叉树。分别是 （ ） 两种选择，但是左括号不能无限的选择下去，只能选择当前传入的参数n次，
// 右括号的选择必须是当前的左括号小于右括号才能进行选择右括号 
// 一定要理解递归 有来有回，也就是先到达最深层，然后慢慢的回来，回溯就是在到达最深的地方然后进行回溯撤销
const result = generateParenthesis(3);
console.log(result);
