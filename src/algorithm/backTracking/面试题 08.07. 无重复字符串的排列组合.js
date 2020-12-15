// 面试题 08.07. 无重复字符串的排列组合
// 无重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合，字符串每个字符均不相同。

// 示例1:

//  输入：S = "qwe"
//  输出：["qwe", "qew", "wqe", "weq", "ewq", "eqw"]
// 示例2:

//  输入：S = "ab"
//  输出：["ab", "ba"]
// 提示:

// 字符都是英文字母。
// 字符串长度在[1, 9]之间。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutation-i-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} S
 * @return {string[]}
 */
const permutation = function(S) {
  const target = S.split("");
  const len = target.length;
  const result = [];

  function dfs(index) {
    if (index === len) {
      result.push(target.join(""));
    }
    for (let i = index; i < len; i++) {
      [target[i], target[index]] = [target[index], target[i]];
      dfs(index + 1);
      [target[i], target[index]] = [target[index], target[i]];
    }
  }
  dfs(0);
  return result;
};
