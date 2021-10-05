enum Color {
  RED = 1,
  BLACK = 0,
}

export class RedBlackTreeNode<K, V> {
  public readonly [Symbol.toStringTag] = "RedBlackTreeNode";
  public size: number;
  constructor(
    public readonly key: K,
    public value: V,
    public color: Color = Color.RED,
    public left: RedBlackTreeNode<K, V> | null = null,
    public right: RedBlackTreeNode<K, V> | null = null
  ) {
    this.size = 1;
  }
}

function isRedBlackTreeNode(node: unknown): node is RedBlackTreeNode<any, any> {
  return node instanceof RedBlackTreeNode;
}

interface Comparable<V> {
  (a: V, b: V): number;
}

export class RedBlackTree<K, V> {
  public root: RedBlackTreeNode<K, V> | null;
  constructor(private comparerFunc: Comparable<K>) {
    this.root = null;
  }
  /**
   * get相应的节点
   * @param key
   * @returns
   */
  public get(key: K): V | null {
    return this._get(this.root, key);
  }

  public _get(node: RedBlackTreeNode<K, V> | null, key: K): V | null {
    while (node !== null) {
      const compare = this.comparerFunc(key, node.key);
      if (compare < 0) {
        node = node.left;
      } else if (compare > 0) {
        node = node.right;
      } else {
        return node.value;
      }
    }
    return null;
  }

  public put(key: K, value: V) {
    this.root = this._put(this.root, key, value);
    this.root.color = Color.BLACK;
  }

  private _put(
    node: RedBlackTreeNode<K, V> | null,
    key: K,
    value: V
  ): RedBlackTreeNode<K, V> {
    if (node === null) return new RedBlackTreeNode(key, value, Color.RED);
    const compare = this.comparerFunc(key, node.key);
    if (compare < 0) node.left = this._put(node.left, key, value);
    else if (compare > 0) node.right = this._put(node.right, key, value);
    else node.value = value;
    // 左旋
    if (this.isRed(node.right) && !this.isRed(node.left))
      node = this.rotateLeft(node);
    // 右旋
    if (this.isRed(node.left) && this.isRed(node.left!.left))
      node = this.rotateRight(node);
    // 变色
    if (this.isRed(node.left) && this.isRed(node.right)) this.flipColors(node);
    return node;
  }

  private isRed(node: RedBlackTreeNode<K, V> | null): boolean {
    if (node === null) return false;
    return node.color === Color.RED;
  }

  /**
   * 左旋转
   * 当前的根节点小于右节点的时候,进行左旋转将右节点变更为根节点
   * 注意添加的时机太重要了
   *
   *   node                   tmp
   *  /   \     左旋转         /  \
   * T1   tmp   --------->   node   T3
   *      / \                /  \
   *     T2 T3              T1  T2
   * @param node
   */
  public rotateLeft(node: RedBlackTreeNode<K, V>): RedBlackTreeNode<K, V> {
    // 保存右节点
    const tmp = node.right as RedBlackTreeNode<K, V>;
    // 将node的右节点保存为tmp的左节点
    node.right = tmp.left;
    // 将tmp的left设置为node
    tmp.left = node;
    // 将tmp的color设置为node的color (正常来讲不是根节点的话,一般为red)
    tmp.color = tmp.left.color;
    // 将node节点的color设置red
    tmp.left.color = Color.RED;
    // 重置tmp的size,因为当前的tmp已经为某种意义上的根节点
    tmp.size = node.size;
    // 但是node的节点size需要重新进行计算
    node.size = 1 + this.size(node.left) + this.size(node.right);
    return tmp;
  }

  /**
   * 右旋转
   *
   *      node                           tmp
   *      / \                           /   \
   *   tmp   T2     向右旋转 (y)        T3   node
   *    / \       - - - - - - - ->          / \
   *   T3  T1                              T1  T2
   *
   * @param node
   */
  public rotateRight(node: RedBlackTreeNode<K, V>): RedBlackTreeNode<K, V> {
    const tmp = node.left as RedBlackTreeNode<K, V>;
    node.left = tmp.right;
    tmp.right = node;
    tmp.color = tmp.right.color;
    // 统一进行变色
    tmp.right.color = Color.RED;
    tmp.size = node.size;
    node.size = 1 + this.size(node.left) + this.size(node.right);
    return tmp;
  }

  public size(): number;
  public size(node: RedBlackTreeNode<K, V> | null): number;
  public size(node?: RedBlackTreeNode<K, V> | null): number {
    if (node === void 0) {
      return this.size(this.root);
    } else if (node === null) {
      return 0;
    } else {
      return node.size;
    }
  }

  /**
   * 变色
   * 规则:将当前节点的所有根节点,左子树,右子树变成相反的颜色,红色变成黑色,黑色变成红色
   * @param node
   */
  private flipColors(node: RedBlackTreeNode<K, V>) {
    node.color = node.color === Color.RED ? Color.BLACK : Color.RED;
    node.left!.color = node.left!.color === Color.RED ? Color.BLACK : Color.RED;
    node.right!.color =
      node.right!.color === Color.RED ? Color.BLACK : Color.RED;
  }

  /**
   * 删除最小值
   */
  public deleteMin() {
    if (this.isEmpty()) {
      throw new Error("BST underflow");
    }
    // 进行变色
    if (!this.isRed(this.root!.left) && !this.isRed(this.root!.right)) {
      this.root!.color = Color.RED;
    }
  }

  public _deleteMin(node: RedBlackTreeNode<K, V>) {}

  /**
   * 判断是不是为空
   * @returns
   */
  public isEmpty(): boolean {
    return this.root === null;
  }
}
