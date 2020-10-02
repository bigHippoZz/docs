import {
    BinarySearchTree,
    Compare,
    Node,
    defaultCompare,
} from "./BinarySearchTree";
import _ from "lodash";
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

    // 向右的单旋转
    rotationLL(node) {
        // 缓存最新的根节点
        const tmp = node.left;
        // 处理以前根节点的左侧树节点
        node.left = tmp.right;
        // 处理根节点的右侧树
        tmp.right = node;
        return tmp;
    }
    // 向左的单旋转
    rotationRR(node) {
        // 缓存最新的根节点
        const tmp = node.right;
        // 处理上一次的根节点的右侧树
        node.right = tmp.left;
        // 处理根节点的左侧树
        tmp.left = node;
        return tmp;
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    insert(key) {
        if (this.root === null) return (this.root = new Node(key));
        this.root = this.insertNode(this.root, key);
    }

    insertNode(node, key) {
        // debugger;
        if (node == null) {
            // console.log("null");
            return new Node(key);
        } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
            node.left = this.insertNode(node.left, key);
        } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
            node.right = this.insertNode(node.right, key);
        } else {
            return node;
        }
        const balanceFactor = this.getBalanceFactor(node);
        // 判断当前是不是左侧树偏重
        if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
            // 2
            if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
                node = this.rotationLL(node);
            } else {
                return this.rotationLR(node);
            }
        }
        // 判断当前是不是右侧树偏重
        if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
            // -2
            if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
                node = this.rotationRR(node);
            } else {
                return this.rotationRL(node);
            }
        }

        // 一定要进行返回node
        return node;
    }

    removeNode(node, key) {
        // node = super.removeNode(node, key);
        // if (node === null) {
        //     return node;
        // }
        // const balanceFactor = this.getBalanceFactor(node);
        // if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
        //     const balanceFactorLeft = this.getBalanceFactor(node.left);
        // }
    }
}

const tree = new AVLTree();

tree.insert(10);
tree.insert(11);
tree.insert(13);
tree.insert(9);
tree.insert(8);
tree.insert(6);
// console.log(tree);
// console.log(tree.getNodeHeight(tree.root));
