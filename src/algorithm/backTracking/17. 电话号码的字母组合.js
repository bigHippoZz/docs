// 17. 电话号码的字母组合
// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。

// 示例:

// 输入："23"
// 输出：["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
// 说明:
// 尽管上面的答案是按字典序排列的，但是你可以任意选择答案输出的顺序。

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/letter-combinations-of-a-phone-number
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {string} digits
 * @return {string[]}
 */
const letterCombinations = function(digits) {
  const result = [];
  const { length } = digits;
  const hashTable = {
    "2": ["a", "b", "c"],
    "3": ["d", "e", "f"],
    "4": ["g", "h", "i"],
    "5": ["j", "k", "l"],
    "6": ["m", "n", "o"],
    "7": ["p", "q", "r", "s"],
    "8": ["t", "u", "v"],
    "9": ["w", "x", "y", "z"],
  };
  function backTracking(str, index) {
    if (index === length) {
      result.push(str);
      return;
    }
    const letter = hashTable[digits[index]];
    for (const char of letter) {
      backTracking(str + char, index + 1);
    }
  }
  backTracking("", 0);
  return result;
};

const result = letterCombinations("23");
console.log(result);
// 时间复杂度 O(4n)
// 空间复杂度 O(n)
// 思路 我多次怀疑自己的思路有问题，我的想法是利用栈的结构来进行不断的尝试，基本上差不多，然后抽象成树结构
// 利用参数来传递递归中的变量