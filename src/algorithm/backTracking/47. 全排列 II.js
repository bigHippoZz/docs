// 47. 全排列 II

// 给定一个可包含重复数字的序列 nums ，按任意顺序 返回所有不重复的全排列。

//

// 示例 1：

// 输入：nums = [1,1,2]
// 输出：
// [[1,1,2],
//  [1,2,1],
//  [2,1,1]]
// 示例 2：

// 输入：nums = [1,2,3]
// 输出：[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutations-ii
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
const permuteUnique = function(nums) {
  // const result = [];
  // const len = nums.length;
  // const used = new Array(len);
  // nums.sort((a, b) => a - b);

  // function helper(paths) {
  //   if (paths.length === len) {
  //     result.push(paths.slice());
  //     return;
  //   }

  //   for (let i = 0; i < len; i++) {

  //     // 进行剪枝
  //     // console.log(!used[i - 1]);

  //     if (!used[i - 1] && i !== 0) {
  //       console.log(`used[i - 1]->${i} ->${nums[i]}`);
  //     }
  //     if (nums[i - 1] === nums[i] && i && !used[i - 1]) {
  //       continue;
  //     }

  //     if (used[i]) {
  //       continue;
  //     }

  //     paths.push(nums[i]);

  //     used[i] = true;

  //     helper(paths);

  //     paths.pop();

  //     used[i] = false;

  //   }
  // }

  // helper([]);

  // return result;
  nums.sort();
  console.log(`sort -> ${nums}`);
  const result = [];
  const used = [];
  const { length } = nums;

  function helper(paths, index) {

    if (index === length) {
      result.push(paths.slice());
      return;
    }

    for (let i = 0; i < length; i++) {

      const preNums = nums[i - 1];
      const currentNums = nums[i];
      const preUsed = used[i - 1];

      // if (i && nums[i - 1] === nums[i] && !used[i - 1]) {
      //   continue;
      // }

      // 利用used进行判断当前的index索引指针是否被使用过
      if (i && nums[i - 1] === nums[i]) {
        continue;
      }
      if (used[i]) {
        continue;
      }
      used[i] = true;
      paths.push(nums[i]);
      helper(paths, index + 1);
      used[i] = false;
      paths.pop();
      
    }
  }

  helper([], 0);

  return result;
};

// const result = permuteUnique([1, 3, 1]);
// console.log(result);
