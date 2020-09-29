import { BinarySearchTree } from "./BinarySearchTree";

class AVLTree extends BinarySearchTree {
    getNodeHeight(node) {
        if (node === null) {
            return -1;
        }
        const left = this.getNodeHeight(node.left);
        const right = this.getNodeHeight(node.right);
        return Math.max(left, right) + 1;
    }
}

const tree = new AVLTree();

tree.insert(10);
tree.insert(8);
console.log(tree);
console.log(tree.getNodeHeight(tree.root));
