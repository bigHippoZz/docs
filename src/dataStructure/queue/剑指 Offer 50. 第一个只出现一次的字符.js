// 剑指 Offer 50. 第一个只出现一次的字符
// 在字符串 s 中找出第一个只出现一次的字符。如果没有，返回一个单空格。 s 只包含小写字母。

// 示例:

// s = "abaccdeff"
// 返回 "b"

// s = ""
// 返回 " "

/**
 * @param {string} s
 * @return {character}
 */
const firstUniqChar = function(s) {
  const frequency = _.countBy(s);
  for (const [_i, ch] of Array.from(s).entries()) {
    if (frequency[ch] === 1) {
      return ch;
    }
  }
  return " ";
};

// firstUniqChar("abaccdeff");
