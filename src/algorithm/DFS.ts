// 深度优先搜索模板
import { onMounted } from "vue";
import { querySelector } from "./BSF";
// 非递归版本
function DepthFirstSearchTemplate(node: Element) {
  const nodes = [];
  const stack = [node];
  const visited = new Set();
  while (stack.length) {
    const currentNode = stack.pop();
    if (visited.has(currentNode)) continue;
    visited.add(currentNode);
    nodes.push(currentNode);
    if (currentNode) {
      for (const children of currentNode?.children) {
        stack.push(children);
      }
    }
  }
  return nodes;
}

// 递归版本
function DepthFirstSearchTemplateRecursion(
  node: Element,
  nodeList: Array<Element> = []
) {
  if (node) {
    nodeList.push(node);
    for (const children of node.children) {
      DepthFirstSearchTemplateRecursion(children, nodeList);
    }
  }
  return nodeList;
}

export function useDFSforEachNode(el: string) {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const node = querySelector(el);
      if (!node) return reject(new Error("Could not find node"));
      setTimeout(() => {
        resolve(DepthFirstSearchTemplateRecursion(node));
      }, 1000);
    });
  });
}
