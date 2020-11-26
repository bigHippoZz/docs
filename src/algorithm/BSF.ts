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

export function querySelector(el: string) {
  return document.querySelector(el);
}
export function useForEachNode(el: string) {
  return new Promise((resolve, reject) => {
    onMounted(() => {
      const node = querySelector(el);
      if (!node) return reject(new Error("Node not found"));
      setTimeout(
        () => {
          resolve(BreadthFirstSearchTemplate(node));
        },
        1000
      );
    });
  });
}

// const dirs = [
//   [1, 0],
//   [0, 1],
//   [-1, 0],
//   [0, -1],
// ];
// function helper(queue: number[][], matrix: number[][]): number {
//   let count = 0;
//   while (queue.length) {
//     const len = queue.length;
//     count++;
//     for (let i = 0; i < len; i++) {
//       const current = queue.shift();
//       if (!current) continue;
//       for (const dir of dirs) {
//         const x = current[0] + dir[0];
//         const y = current[1] + dir[1];
//         if (x < 0 || x >= matrix.length || y < 0 || y >= matrix[0].length) {
//           continue;
//         }
//         if (matrix[x][y] === 0) {
//           return count;
//         }
//         queue.push([x, y]);
//       }
//     }
//   }
//   return count;
// }
// function updateMatrix(matrix: number[][]): number[][] {
//   if (!matrix.length) return [];
//   const target = JSON.parse(JSON.stringify(matrix));
//   const queue = [];
//   for (let row = 0; row < matrix.length; row++) {
//     for (let col = 0; col < matrix[0].length; col++) {
//       if (!matrix[row][col]) continue;
//       queue.push([row, col]);
//       target[row][col] = helper(queue, matrix);
//       queue.length = 0;
//     }
//   }
//   return target;
// }

// bfs 理解
// 类似一种藤曼的衍生 最重要的是怎样添加下一轮的队列搜索 然后处理边界问题
// 在每一轮的搜索，或者是出队列的时候做一些事情

function numBusesToDestination(
  routes: number[][],
  S: number,
  T: number
): number {
  if (S === T) return 0;
  const routesMap = new Map<number, Set<number>>();
  for (let row = 0; row < routes.length; row++) {
    for (const stop of routes[row]) {
      if (!routesMap.has(stop)) {
        routesMap.set(stop, new Set<number>());
      }
      routesMap.get(stop)?.add(row);
    }
  }
  const queue = [S];
  let count = 0;
  const routesSet = new Set<number>();
  while (queue.length) {
    const len = queue.length;
    count++;
    for (let i = 0; i < len; i++) {
      const cur = queue.shift();
      if (cur === undefined) continue;
      const nextRoute = routesMap.get(cur);
      if (nextRoute === undefined) continue;
      for (const bus of nextRoute) {
        if (routesSet.has(bus)) continue;
        routesSet.add(bus);
        for (const stop of routes[bus]) {
          if (stop === T) return count;
          queue.push(stop);
        }
      }
    }
  }
  return -1;
}

const result = numBusesToDestination(
  [[7, 12], [4, 5, 15], [6], [15, 19], [9, 12, 13]],
  15,
  12
);

// console.log(result);
