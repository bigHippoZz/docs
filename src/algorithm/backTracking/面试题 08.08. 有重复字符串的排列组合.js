// 面试题 08.08. 有重复字符串的排列组合
// 有重复字符串的排列组合。编写一种方法，计算某字符串的所有排列组合。

// 示例1:

//  输入：S = "qqe"
//  输出：["eqq","qeq","qqe"]
// 示例2:

//  输入：S = "ab"
//  输出：["ab", "ba"]
// 提示:

// 字符都是英文字母。
// 字符串长度在[1, 9]之间。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutation-ii-lcci
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} S
 * @return {string[]}
 */
const permutation = function(S) {
  const { length } = S;
  if (!length) return [];
  const result = [];
  S = S.split("").sort();

  function backTracking(index) {
    if (index === length) {
      result.push(S.join(""));
    }
    for (let i = index; i < length; i++) {
      if (S[i - 1] && S[i - 1] === S[i]) continue;
      [S[i], S[index]] = [S[index], S[i]];
      backTracking(index + 1);
      [S[i], S[index]] = [S[index], S[i]];
    }
  }

  backTracking(0);
  return result;
};

const result = permutation("qqe");
console.log(result);
