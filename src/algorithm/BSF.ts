/**
 * BSF
 * 广度优先搜索主要用于遍历或者找出最短路径，常常用于树，图。但是并不是死的，主要核心还是广度搜素。
 * 外层while主要是判断queue队列执行次数，来获取当前结构层级
 */

import { onMounted } from "vue";
function isHTMLElement(val: unknown): val is HTMLElement {
  return val instanceof HTMLElement;
}

// 广度优先搜索模板
const BreadthFirstSearchTemplate = (node: Element) => {
  // 最终的结果
  const result = [];
  // 队列
  const queue = [node];
  // 层级
  let level = 0;
  // 判断进行几轮队列
  while (queue.length) {
    // 根据几轮队列来判断层级
    level++;
    // 判断当前这轮的次数，当这轮遍历结束之后，这轮所有的节点都会出队列，新的队列已经产生 在根据while进行新的一轮遍历
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      // 进行出队
      const current = queue.shift();
      result.push(current);
      if (!isHTMLElement(current)) continue;
      // 然后进行出队之后的节点进行后续的入队
      for (let j = 0; j < current.children.length; j++) {
        queue.push(current.children[j]);
      }
    }
  }
  return {
    nodeList: result,
    level,
  };
};

function BreadthFirstSearch(node: Element) {
  const queue = [node];
  const nodes = [];
  let level = 0;
  while (queue.length) {
    // 进行每一轮层级判断
    level++;
    // 获取每一轮的队列长度len
    const len = queue.length;
    for (let i = 0; i < len; i++) {
      const current = queue.shift();
      if (!current) return;
      nodes.push(current);
      if (isHTMLElement(current)) {
        for (let j = 0; j < current.children.length; j++) {
          queue.push(current.children[j]);
        }
      }
    }
  }
  return {
    nodes,
    level,
  };
}

export function useForEachNode(el: string) {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const node = document.querySelector(el);
      if (!node) return reject(new Error("Node not found"));
      resolve(BreadthFirstSearchTemplate(node));
    });
  });
}
