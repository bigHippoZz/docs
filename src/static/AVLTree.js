import { BinarySearchTree } from "./BinarySearchTree";

const BalanceFactor = {
    UNBALANCED_RIGHT: 1,
    SLIGHTLY_UNBALANCED_RIGHT: 2,
    BALANCED: 3,
    SLIGHTLY_UNBALANCED_LEFT: 4,
    UNBALANCED_LEFT: 5,
};
class AVLTree extends BinarySearchTree {
    getNodeHeight(node) {
        if (node === null) {
            return -1;
        }
        const left = this.getNodeHeight(node.left);
        const right = this.getNodeHeight(node.right);
        return Math.max(left, right) + 1;
    }
    getBalanceFactor(node) {
        const heightDifference =
            this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
        switch (heightDifference) {
            case value:
                break;
            default:
                break;
        }
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

const tree = new AVLTree();

tree.insert(3);
tree.insert(2);
tree.insert(1);
console.log(tree);

console.log(tree.getNodeHeight(tree.root));
