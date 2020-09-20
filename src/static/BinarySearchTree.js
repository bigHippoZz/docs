const Compare = {
    LESS_THAN: -1,
    BIGGER_THAN: 1,
};

function defaultCompare(a, b) {
    if (a === b) return 0;
    return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

class Node {
    constructor(key) {
        this.key = key;
        this.left = null;
        this.right = null;
    }
}
class BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        this.root = null;
        this.compareFn = compareFn;
    }
    insert(key) {
        if (this.root === null) return (this.root = new Node(key));
        this.insertNode(this.root, key);
    }
    insertNode(node, key) {
        // if (node === null) {
        //     node = new Node(key);
        // } else if (node.key > key) {
        //     this.insertNode(node.left, key);
        // } else {
        //     this.insertNode(node.right, key);
        // }
        if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            if (node.left === null) {
                node.left = new Node(key);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right === null) {
                node.right = new Node(key);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }
    preOrderTraversal(callback) {
        this.preOrderTraversalNode(this.root, callback);
    }
    preOrderTraversalNode(node, callback) {
        if (node !== null) {
            this.preOrderTraversalNode(node.left, callback);
            callback(node.key);
            this.preOrderTraversalNode(node.right, callback);
        }
    }
    search(key) {
        return this.searchNode(this.root, key);
    }
    /**
     * 比较node节点中key与参数key的大小 然后进行递归，一定要返回递归的结果
     * 当递归到最末端的时候 就会返回false
     * 当递归满足node.key = key的时候返回true
     * @param {Object} node
     * @param {Number} key
     */
    searchNode(node, key) {
        if (node === null) {
            return false;
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            return this.searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            return this.searchNode(node.right, key);
        } else if (node.key === key) {
            return true;
        }
    }
    remove(key) {
        this.root = this.removeNode(this.root, key);
    }
    min() {
        return this.minNode(this.root);
    }
    minNode(node) {
        let result = node;
        while (result.left !== null && result !== null) {
            result = result.left;
        }
        return result;
    }
    removeNode(node, key) {
        if (node === null) {
            return null;
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.removeNode(node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.removeNode(node.right, key);
            return node;
        } else {
            if (node.left === null && node.right === null) {
                node = null;
                return node;
            } else if (node.left === null) {
                node = node.right;
                return node;
            } else if (node.right === null) {
                node = node.left;
                return node;
            }
            let aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = this.removeNode(node.right, aux.key);
            return node;
        }
    }
}

const printNode = value => console.log(value);
const tree = new BinarySearchTree();
tree.insert(3);
tree.insert(2);
tree.insert(6);
tree.insert(5);
tree.insert(7);
tree.insert(4);
// tree.preOrderTraversal(printNode);
const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5,
};
class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }
    getNodeHeight(node) {
        if (node === null) {
            return -1;
        }
        let result = this.getNodeHeight(node.left);
        // console.log(result);
        // console.log(this.getNodeHeight(node.left));
        let count = Math.max(result, this.getNodeHeight(node.right)) + 1;
        console.log(count);
        return count;
    }

    getBalanceFactor(node) {
        const heightDifference =
            this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case -2:
                return BalanceFactor.UNBALANCED_RIGHT;
            case -1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
            case 1:
                return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
            case 2:
                return BalanceFactor.UNBALANCED_LEFT;
            default:
                return BalanceFactor.BALANCED;
        }
    }
}

const avlTree = new AVLTree();
avlTree.insert(3);
avlTree.insert(2);
avlTree.insert(6);
// avlTree.insert(5);
// avlTree.insert(7);
// avlTree.insert(4);
console.log(avlTree);
console.log(avlTree.getNodeHeight(avlTree.root));
