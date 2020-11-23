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

interface RoutesMap {
  [props: string]: Set<number>;
}
function numBusesToDestination(
  routes: number[][],
  S: number,
  T: number
): number {
  function swip(a: unknown, b: unknown) {
    const temp = a;
    a = b;
    b = temp;
  }
  const routesMap: RoutesMap = {};
  for (let row = 0; row < routes.length; row++) {
    for (let col = 0; col < routes[row].length; col++) {
      if (!routesMap[routes[row][col]]) {
        routesMap[routes[row][col]] = new Set<number>();
      }
      for (let i = 0; i < routes[row].length; i++) {
        if (i === col) continue;
        routesMap[routes[row][col]].add(routes[row][i]);
      }
    }
  }

  const routesSet = new Set();
  routesSet.add(S);
  const startingQueue = [[S, 0]];
  const endQueue = [[T, 0]];
  while (startingQueue.length && endQueue.length) {
    if (startingQueue.length > endQueue.length) {
      swip(startingQueue, endQueue);
    }
    const len = startingQueue.length;
    for (let i = 0; i < len; i++) {
      const [cur, count] = startingQueue.shift() as Array<number>;
      const index = endQueue.findIndex(([target]) => target === cur);
      if (index !== -1) return count;
      const nextRoutes = routesMap[cur];
      if (nextRoutes instanceof Set) {
        for (const route of nextRoutes) {
          if (routesSet.has(route)) continue;
          routesSet.add(route);
          startingQueue.push([route, count + 1]);
        }
      }
    }
  }
  return -1;
}

