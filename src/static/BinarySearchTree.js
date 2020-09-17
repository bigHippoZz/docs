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
    // 先序遍历
    preOrderTraversal(callback) {
        this._preOrderTraversal(this.root, callback);
    }
    _preOrderTraversal(node, callback) {
        if (node !== null) {
            this._preOrderTraversal(node.left, callback);
            callback(node.key);
            this._preOrderTraversal(node.right, callback);
        }
    }
    searchNode(key) {
        return this._searchNode(this.root, key);
    }
    _searchNode(node, key) {
        if (node === null) {
            console.log(node);
            return false;
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            this._searchNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            console.log(this.root, key);
            this._searchNode(node.right, key);
        } else {
            return true;
        }
    }
}
let tree = new BinarySearchTree();
tree.insert(11);
tree.insert(10);
tree.insert(1);
tree.insert(15);
tree.insert(19);

const Print = value => console.log(value);
tree.preOrderTraversal(Print);
console.log(tree, "tree");
console.log(tree.searchNode(11));
