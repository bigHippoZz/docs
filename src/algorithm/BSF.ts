/**
 * BSF
 * 广度优先搜索主要用于遍历或者找出最短路径，常常用于树，图。但是并不是死的，主要核心还是广度搜素。
 */

import { onMounted } from "vue";
function isHTMLElement(val: unknown): val is HTMLElement {
  return val instanceof HTMLElement;
}
function BreadthFirstSearch(node: Element) {
  const queue = [node];
  const nodes = [];
  let level = 0;
  while (queue.length) {
    level++;
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
      resolve(BreadthFirstSearch(node));
    });
  });
}

