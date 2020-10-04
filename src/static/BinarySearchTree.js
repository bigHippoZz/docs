// const Compare = {
//     LESS_THAN: -1,
//     BIGGER_THAN: 1,
// };

// function defaultCompare(a, b) {
//     if (a === b) return 0;
//     return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
// }

// class Node {
//     constructor(key) {
//         this.key = key;
//         this.left = null;
//         this.right = null;
//     }
// }
// class BinarySearchTree {
//     constructor(compareFn = defaultCompare) {
//         this.root = null;
//         this.compareFn = compareFn;
//     }
//     insert(key) {
//         if (this.root === null) return (this.root = new Node(key));
//         this.insertNode(this.root, key);
//     }
//     insertNode(node, key) {
//         // if (node === null) {
//         //     node = new Node(key);
//         // } else if (node.key > key) {
//         //     this.insertNode(node.left, key);
//         // } else {
//         //     this.insertNode(node.right, key);
//         // }
//         if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
//             if (node.left === null) {
//                 node.left = new Node(key);
//             } else {
//                 this.insertNode(node.left, key);
//             }
//         } else {
//             if (node.right === null) {
//                 node.right = new Node(key);
//             } else {
//                 this.insertNode(node.right, key);
//             }
//         }
//     }
//     preOrderTraversal(callback) {
//         this.preOrderTraversalNode(this.root, callback);
//     }
//     preOrderTraversalNode(node, callback) {
//         if (node !== null) {
//             this.preOrderTraversalNode(node.left, callback);
//             callback(node.key);
//             this.preOrderTraversalNode(node.right, callback);
//         }
//     }
//     search(key) {
//         return this.searchNode(this.root, key);
//     }
//     /**
//      * 比较node节点中key与参数key的大小 然后进行递归，一定要返回递归的结果
//      * 当递归到最末端的时候 就会返回false
//      * 当递归满足node.key = key的时候返回true
//      * @param {Object} node
//      * @param {Number} key
//      */
//     searchNode(node, key) {
//         if (node === null) {
//             return false;
//         } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
//             return this.searchNode(node.left, key);
//         } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
//             return this.searchNode(node.right, key);
//         } else if (node.key === key) {
//             return true;
//         }
//     }
//     remove(key) {
//         this.root = this.removeNode(this.root, key);
//     }
//     min() {
//         return this.minNode(this.root);
//     }
//     minNode(node) {
//         let result = node;
//         while (result.left !== null && result !== null) {
//             result = result.left;
//         }
//         return result;
//     }
//     removeNode(node, key) {
//         if (node === null) {
//             return null;
//         } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
//             node.left = this.removeNode(node.left, key);
//             return node;
//         } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
//             node.right = this.removeNode(node.right, key);
//             return node;
//         } else {
//             if (node.left === null && node.right === null) {
//                 node = null;
//                 return node;
//             } else if (node.left === null) {
//                 node = node.right;
//                 return node;
//             } else if (node.right === null) {
//                 node = node.left;
//                 return node;
//             }
//             let aux = this.minNode(node.right);
//             node.key = aux.key;
//             node.right = this.removeNode(node.right, aux.key);
//             return node;
//         }
//     }
// }

// const printNode = value => console.log(value);
// const tree = new BinarySearchTree();
// tree.insert(3);
// tree.insert(2);
// tree.insert(6);
// tree.insert(5);
// tree.insert(7);
// tree.insert(4);
// // tree.preOrderTraversal(printNode);
// const BalanceFactor = {
//     UNBALANCED_RIGHT: 1,
//     SLIGHTLY_UNBALANCED_RIGHT: 2,
//     BALANCED: 3,
//     SLIGHTLY_UNBALANCED_LEFT: 4,
//     UNBALANCED_LEFT: 5,
// };
// class AVLTree extends BinarySearchTree {
//     constructor(compareFn = defaultCompare) {
//         super(compareFn);
//         this.compareFn = compareFn;
//         this.root = null;
//     }
//     getNodeHeight(node) {
//         if (node === null) {
//             return -1;
//         }
//         let result = this.getNodeHeight(node.left);
//         let count = Math.max(result, this.getNodeHeight(node.right)) + 1;
//         return count;
//     }
//     getBalanceFactor(node) {
//         const heightDifference =
//             this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
//         switch (heightDifference) {
//             case -2:
//                 return BalanceFactor.UNBALANCED_RIGHT;
//             case -1:
//                 return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
//             case 1:
//                 return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
//             case 2:
//                 return BalanceFactor.UNBALANCED_LEFT;
//             default:
//                 return BalanceFactor.BALANCED;
//         }
//     }
// }

// const avlTree = new AVLTree();
// avlTree.insert(3);
// avlTree.insert(2);
// avlTree.insert(6);
// // avlTree.insert(5);
// // avlTree.insert(7);
// // avlTree.insert(4);
// console.log(avlTree);
// console.log(avlTree.getNodeHeight(avlTree.root));
// // 清空矩阵 先找到所在的位置然后进行行清零 最后是列清零
// var setZeroes = function (matrix) {
//     const rows = new Set();
//     const cols = new Set();
//     for (let i = 0; i < matrix.length; i++) {
//         for (let j = 0; j < matrix[i].length; j++) {
//             if (matrix[i][j] === 0) {
//                 rows.add(i);
//                 cols.add(j);
//             }
//         }
//     }
//     console.log(rows);
//     console.log(cols);
//     for (const row of rows) {
//         for (let col = 0; col < matrix[row].length; col++) {
//             console.log(matrix[row][col]);
//             matrix[row][col] = 0;
//         }
//     }
//     for (const col of cols) {
//         for (let row = 0; row < matrix.length; row++) {
//             matrix[row][col] = 0;
//         }
//     }
// };

// function getFront(target, source) {
//     const len = Math.min(target.length, source.length);
//     let result = "";
//     for (let index = 0; index < len; index++) {
//         if (target[index] !== source[index]) {
//             break;
//         }
//         result += target[index];
//     }
//     return result;
// }
// console.log(getFront("hello world", "hello"));

// var longestPalindrome = function (s) {
//     if (!s.length) return "";
//     const stack = s.split("");
//     let start = 0;
//     let end = stack.length - 1;
//     while (start < end) {
//         let startString = stack[start];
//         let endString = stack[end];
//         if (startString !== endString) {
//             stack.splice(start, 1);
//             end = stack.length - 1;
//             stack.splice(end, 1);
//             end--;
//             console.log(stack);
//         } else {
//             start++;
//             end--;
//         }
//     }
//     return stack.join("");
// };

// const object = {
//     id: Math.random(),
// };
// const result = Reflect.get(object, "id");
// console.log(result);

export class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
const node = new Node("string");
// console.log(node, "node");
export const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
    EQUAlS: 0,
};
/**
 * 默认比较函数
 * @param {any} a
 * @param {any} b
 */
export function defaultCompare(a, b) {
    if (a === b) return 0;
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

export class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        //当前的根节点
        this.root = null;
        this.compareFn = compareFn;
    }
    // 插入方法 首先判断是不是根节点为null 然后进行判断node.key的值与要插入的key大小
    // 比较出来之后 判断node.left 或者node.right 是不是为 null
    // 如果是的话将将node.left 设置为Node 不是的继续递归
    insert(key) {
        if (this.root === null) return (this.root = new Node(key));
        this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        if (node == null) {
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
            return node;
        } else {
            return node;
        }
        // if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
        //     if (node.left === null) {
        //         node.left = new Node(key);
        //     } else {
        //         this.insertNode(node.left, key);
        //     }
        // } else {
        //     if (node.right === null) {
        //         node.right = new Node(key);
        //     } else {
        //         this.insertNode(node.right, key);
        //     }
        // }
    }

    search(key) {
        if (this.root === null) return false;
        return this.searchNode(this.root, key);
    }
    searchNode(node, key) {
        if (node === null) return false;
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else {
            return true;
        }
    }

    min() {
        return this.minNode(this.root);
    }

    minNode(node) {
        let result = node;
        while (result.left !== null) {
            result = result.left;
        }
        return result;
    }

    remove(key) {
        console.log(key);
        this.root = this.removeNode(this.root, key);
    }

    // 移除某个节点
    removeNode(node, key) {
        if (node === null) {
            return null;
        }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            // 当前是key等于node.key
            if (node.left === null && node.right === null) {
                node = null;
                return null;
            }
            if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            const anx = this.minNode(node.right);
            node.key = anx.key;
            node.right = this.removeNode(node.right, anx.key);
            return node;
        }
    }
}

const tree = new BinarySearchTree();
// tree.insert(10);
// tree.insert(11);
// tree.insert(13);
// tree.insert(9);
// tree.insert(8);
// tree.insert(6);

// tree.remove(10);
// console.log(tree);
// console.log(tree.search(13));
// console.log(tree.min());
