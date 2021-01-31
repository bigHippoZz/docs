// 1079. 活字印刷
// 你有一套活字字模 tiles，其中每个字模上都刻有一个字母 tiles[i]。返回你可以印出的非空字母序列的数目。

// 注意：本题中，每个活字字模只能使用一次。

//

// 示例 1：

// 输入："AAB"
// 输出：8
// 解释：可能的序列为 "A", "B", "AA", "AB", "BA", "AAB", "ABA", "BAA"。
// 示例 2：

// 输入："AAABBC"
// 输出：188

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/letter-tile-possibilities
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {string} tiles
 * @return {number}
 */
const numTilePossibilities = function(tiles) {
  let nums = 0;
  const target = tiles.split("");
  target.sort();
  const { length } = target;
  const used = [];
  function helper() {
    nums++;
    for (let i = 0; i < length; i++) {
      if (i > 0 && target[i] === target[i - 1] && !used[i - 1]) {
        continue;
      }
      if (used[i]) {
        continue;
      }
      used[i] = true;
      helper();
      used[i] = false;
    }
  }
  helper(0, []);
  return nums - 1;
};

// const result = numTilePossibilities("AAABBC");
// console.log(result);
