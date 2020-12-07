// 106. 从中序与后序遍历序列构造二叉树
// 根据一棵树的中序遍历与后序遍历构造二叉树。

// 注意:
// 你可以假设树中没有重复的元素。

// 例如，给出

// 中序遍历 inorder = [9,3,15,20,7]
// 后序遍历 postorder = [9,15,7,20,3]
// 返回如下的二叉树：

//     3
//    / \
//   9  20
//     /  \
//    15   7

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
var buildTree = function(inorder, postorder) {
  let postIdx;
  const postMap = new Map();
  const helper = (left, right) => {
    console.log(left, right);
    if (left > right) return null;
    // 获取当前的根节点值
    const rootVal = postorder[postIdx];
    // 生成根节点
    const root = new TreeNode(rootVal);
    // 获取根节点的下标
    const index = postMap.get(rootVal);
    // 后序遍历的下标移动
    postIdx--;
    // 进行生成右子树
    root.right = helper(index + 1, right);
    // 进行生成左子树
    root.left = helper(left, index - 1);
    // 最后返回树
    return root;
  };
  postIdx = postorder.length - 1;
  let index = 0;

  // 中序遍历生成哈希表 保存中序遍历的结果
  inorder.forEach((val, index) => {
    postMap.set(val, index);
  });

  console.log(postMap);
  console.log(index);

  return helper(0, inorder.length - 1);
};

function Test(inorder, postorder) {
  const treeMap = new Map();
  inorder.forEach((value, index) => {
    treeMap.set(value, index);
  });

  let index = postorder.length - 1; //对于后序遍历的指针
  function helper(left, right) {
    console.log(left, right);
    // left > right 这样理解 left 大于 right 的时候才会执行，所以 0 > 0 会返回false 不会执行return
    // 这是很多地方容易进行犯错的地方 记住一点就是我们使用 left > right 的时候注意判断 两个数字都相同的时候他会返回false 
    // 在if()条件中他并不会进行执行，而在while循环中left > right 的时候就会终止循环 这是一定要进行区分
    if (left > right) return null;
    const rootVal = postorder[index];
    const currentIndex = treeMap.get(rootVal);
    const root = new TreeNode(rootVal);
    index--;
    root.right = helper(currentIndex + 1, right);
    root.left = helper(left, currentIndex - 1);
    return root;
  }
  return helper(0, inorder.length - 1);
}



// 思路
// 注意一个规律 后序遍历最后的一个元素正好是根元素，而中序遍历根据根元素可将中序遍历的数组分成两部分，然后依次进行递归
// 注意if() 和 while中 left > right 的区别