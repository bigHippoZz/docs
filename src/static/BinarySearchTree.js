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
        this.compareFn = compareFn;
        this.root = null;
    }

    insert(key) {
        if (this.root === null) {
            this.root = new Node(key);
        } else {
            this.insertNode(this.root, key);
        }
    }
    insertNode(node, key) {
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

    inorderTraverseNode(node, callback) {
        if (node !== null) {
            this.inorderTraverseNode(node.left, callback);
            callback(node.key);
            this.inorderTraverseNode(node.right, callback);
        }
    }

    inorderTraverse(callback) {
        this.inorderTraverseNode(this.root, callback);
    }
}

const tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(10);
// tree.insert(9);
// tree.insert(8);
// tree.insert(10);
// tree.insert(13);

const printNode = value => console.log(value);
tree.inorderTraverse(printNode);
console.log(tree);
