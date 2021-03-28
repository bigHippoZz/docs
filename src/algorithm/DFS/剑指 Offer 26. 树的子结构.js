// 剑指 Offer 26. 树的子结构
// 输入两棵二叉树A和B，判断B是不是A的子结构。(约定空树不是任意一个树的子结构)



// B是A的子结构， 即 A中有出现和B相同的结构和节点值。

// 例如:
// 给定的树 A:

//      3
//     / \
//    4   5
//   / \
//  1   2
// 给定的树 B：

//    4 
//   /
//  1
// 返回 true，因为 B 与 A 的一个子树拥有相同的结构和节点值。

// 示例 1：

// 输入：A = [1,2,3], B = [3,1]
// 输出：false
// 示例 2：

// 输入：A = [3,4,5,1,2], B = [4,1]
// 输出：true
// 限制：

// 0 <= 节点个数 <= 10000

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/shu-de-zi-jie-gou-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} A
 * @param {TreeNode} B
 * @return {boolean}
 */
var isSubStructure = function (A, B) {
    if (A === null || B === null) {
        return false
    }
    function dfs(root) {
        if (!root) {
            return false
        }
        function helper(A, B) {
            // 这里的细节 先判断 B成立的条件 然后判断 A 不成立的条件
            if (B === null) {
                return true
            }
            if (A === null || A.val !== B.val) {
                return false
            }
            return helper(A.left, B.left) && helper(A.right, B.right)
        }
        if (root.val === B.val && helper(root.left, B.left) && helper(root.right, B.right)) {
            return true
        }
        const left = dfs(root.left)
        const right = dfs(root.right)

        return left || right
    }
    return dfs(A)
};