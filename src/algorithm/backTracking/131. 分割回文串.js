// 131. 分割回文串
// 给定一个字符串 s，将 s 分割成一些子串，使每个子串都是回文串。

// 返回 s 所有可能的分割方案。

// 示例:

// 输入: "aab"
// 输出:
// [
//   ["aa","b"],
//   ["a","a","b"]
// ]
// 通过次数61,118提交次数87,074

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/palindrome-partitioning
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * 
 * @param {string} str 
 * @param {number} left 
 * @param {number} right 
 */
function isPal(str, left, right) {
  while (left < right) {
    if (str.charAt(left)!== str.charAt(right)) {
      return false;
    }
    left++;
    right--;
  }
  return true;
}



/**
 * @param {string} s
 * @return {string[][]}
 */
const partition = function(s) {
  
  const result = [];
  const { length } = s;
  let nums = 0

  function helper(index, paths, length, result) {
    
    nums++;

    // 利用一开始的思路 这里是不行的 他会频繁执行好多次
    if (index === length) {
      result.push(paths.slice());
    }

    
    for (let i = index; i < length; i++) {

      if (!isPal(s, index, i )) {
        continue;
      
      }

      paths.push(s.substring(index, i + 1));

      // 这里是利用 i 而不是index
      helper(i + 1, paths, length, result);

      paths.pop();

    }
  }



  helper(0, [], length, result);
  console.log(nums)
  return result;
};

// const result = partition("aab");

// console.log(result);



