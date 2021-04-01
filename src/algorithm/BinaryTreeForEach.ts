/**
 * 二叉树所有的搜索方法
 */

import { tree } from "./DFS";

// 二叉树结构
export class TreeNode<T = any> {
  val: T;
  left: TreeNode<T> | null;
  right: TreeNode<T> | null;
  constructor(val: T, left?: TreeNode<T>, right?: TreeNode<T>) {
    this.val = val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}
/**
 * 打印node
 * @param val treeNode
 */
function logger(val: TreeNode) {
  console.log(val);
}

type Logger = typeof logger;

/**
 * 层次遍历
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function LevelOrder({
  tree,
  callback = logger,
}: {
  tree: TreeNode;
  callback?: Logger;
}) {
  const queue = [tree];
  while (queue.length) {
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const current = queue.shift() as TreeNode;
      callback(current);
      current?.left && queue.push(current.left);
      current?.right && queue.push(current.right);
    }
  }
}

/**
 * 先序遍历 递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function PreOrder(tree: TreeNode | null, callback: Function = logger) {
  if (!tree) {
    return;
  }
  callback(tree);
  PreOrder(tree.left, callback);
  PreOrder(tree.right, callback);
}

/**
 * 中序遍历 递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function InOrder(tree: TreeNode | null, callback: Function = logger) {
  if (!tree) {
    return;
  }
  InOrder(tree.left, callback);
  callback(tree);
  InOrder(tree.right, callback);
}

/**
 * 后序遍历 递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function PostOrder(tree: TreeNode | null, callback: Function = logger) {
  if (tree === null) return;
  PostOrder(tree.left, callback);
  PostOrder(tree.right, callback);
  callback(tree);
}
// console.log(tree);
// PostOrder(tree);

type TreeNodeValue<T> = T extends TreeNode ? T["val"] : never;

/**
 * 先序遍历 非递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function PreOrder2(
  tree: TreeNode | null,
  callback: (val: TreeNodeValue<TreeNode>) => void
) {
  const stack = [];
  while (tree || stack.length) {
    while (tree) {
      // 入栈的那一刻进行处理
      callback(tree);
      stack.push(tree);
      tree = tree.left;
    }
    tree = stack.pop() as TreeNode;
    tree = tree.right;
  }
}
/**
 * 中序遍历 非递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function InOrder2(
  tree: TreeNode | null,
  callback: (val: TreeNodeValue<TreeNode>) => void
) {
  const stack = [];
  while (tree || stack.length) {
    // 进行入栈操作
    while (tree) {
      stack.push(tree);
      tree = tree.left;
    }
    tree = stack.pop() as TreeNode;
    callback(tree);
    tree = tree.right;
  }
}

/**
 * 后序遍历 非递归
 * @param {TreeNode} tree
 * @param {Function} callback
 */
export function PostOrder2(tree: TreeNode | null, callback: Function = logger) {
  const stack = [];
  let pre = null;
  while (stack.length || tree !== null) {
    while (tree) {
      stack.push(tree);
      tree = tree.left;
    }
    tree = stack.pop() as TreeNode;
    if (tree.right === null || tree.right === pre) {
      callback(tree);
      pre = tree;
      tree = null;
    } else {
      stack.push(tree);
      stack.push(tree.right);
      tree = tree.right.left;
    }
  }
}


// PostOrder2(tree)
/**
 * 利用语法糖
 * 先序、中序以此类推
 * @param {TreeNode} tree
 * @return {number[]}
 */
export const postorderTraversal = function(tree: TreeNode | null): number[] {
  return tree === null
    ? []
    : [
        ...postorderTraversal(tree.left),
        ...postorderTraversal(tree.right),
        tree.val,
      ];
};
