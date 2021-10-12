export class Node<K, V> {
  public left: Node<K, V> | null = null;
  public right: Node<K, V> | null = null;
  constructor(public key: K, public value: V, public size: number) {}
}

function isNode<K, V>(node: unknown): node is Node<K, V> {
  return node instanceof Node;
}

interface Comparable<V> {
  (a: V, b: V): number;
}

export class BST<K, V> {
  public root: Node<K, V> | null = null;
  constructor(private compareFunc: Comparable<K>) {}

  public size(): number;
  public size(node: Node<K, V> | null): number;
  public size(node?: Node<K, V> | null): number {
    if (node === void 0) {
      return this.size(this.root);
    } else if (node === null) {
      return 0;
    } else {
      return node.size;
    }
  }

  public get(key: K): V | null;
  public get(node: Node<K, V> | null, key: K): V | null;
  public get(node: Node<K, V> | null | K, key?: K): V | null {
    if (node === null) {
      return null;
    } else if (isNode<K, V>(node)) {
      const compare = this.compareFunc(key!, node.key);
      if (compare < 0) {
        return this.get(node.left, key!);
      } else if (compare > 0) {
        return this.get(node.right, key!);
      } else {
        return node.value;
      }
    } else {
      return this.get(this.root, node);
    }
  }

  public put(key: K, value: V): Node<K, V>;
  public put(node: Node<K, V> | null, key: K, value: V): Node<K, V>;
  public put(node: Node<K, V> | K | null, key: K | V, value?: V): Node<K, V> {
    if (node === null) {
      return new Node(key as K, value as V, 1);
    } else if (isNode<K, V>(node)) {
      const compare = this.compareFunc(key as K, (node as Node<K, V>).key);
      if (compare < 0) {
        node.left = this.put(node.left, key as K, value!);
      } else if (compare > 0) {
        node.right = this.put(node.right, key as K, value!);
      } else {
        node.value = value!;
      }
      node.size = this.size(node.left) + this.size(node.right) + 1;
      return node;
    } else {
      return (this.root = this.put(this.root, node, key as V));
    }
  }

  public min(): K;
  public min(node: Node<K, V> | null): K;
  public min(node?: Node<K, V> | null): K {
    if (node === void 0) {
      if (this.isEmpty()) {
        throw new Error("calls min() with empty symbol table");
      }
      return this.min(this.root);
    } else if (node?.left === null) {
      return node.key;
    } else {
      return this.min(node!.left);
    }
  }

  public max(): K;
  public max(node: Node<K, V> | null): K;
  public max(node?: Node<K, V> | null): K {
    if (node === void 0) {
      if (this.isEmpty()) {
        throw new Error("calls max() with empty symbol table");
      }
      return this.max(this.root);
    } else if (node?.right === null) {
      return node.key;
    } else {
      return this.max(node!.right);
    }
  }

  public isEmpty() {
    return this.size() === 0;
  }

  /**
   * 获取小于等于该key的最大值
   * @param key
   */
  public floor(key: K): K {
    if (this.isEmpty()) {
      throw new Error("calls floor() with empty symbol table");
    }
    if (key == null) {
      throw new Error("argument to floor() is null");
    }
    const node = this._floor(this.root, key);
    if (node === null) {
      throw new Error("argument to floor() is too small");
    }
    return node.key;
  }
  private _floor(node: Node<K, V> | null, key: K): Node<K, V> | null {
    if (!node) return null;
    const compare = this.compareFunc(key, node.key);
    if (compare === 0) return node;
    if (compare < 0) return this._floor(node.left, key);
    const r = this._floor(node.right, key);
    if (r !== null) {
      return r;
    } else return node;
  }

  /**
   * 找到大于等于key的最小值
   * @param key
   */
  public ceiling(key: K): K {
    if (this.isEmpty()) {
      throw new Error("calls ceiling() with empty symbol table");
    }
    if (key == null) {
      throw new Error("argument to ceiling() is null");
    }
    const node = this._ceiling(this.root, key);
    if (node === null) {
      throw new Error("argument to ceiling() is too small");
    }
    return node.key;
  }

  private _ceiling(node: Node<K, V> | null, key: K): Node<K, V> | null {
    if (!node) return null;
    const compare = this.compareFunc(key, node.key);
    if (compare === 0) return node;
    if (compare < 0) {
      const l = this._ceiling(node.left, key);
      if (l !== null) {
        return l;
      } else {
        return node;
      }
    } else {
      return this._ceiling(node.right, key);
    }
  }

  /**
   * 获取node节点的排名
   */
  public rank(key: K): number {
    if (key == null) throw new Error("argument to rank() is null");
    return this._rank(this.root, key);
  }
  private _rank(node: Node<K, V> | null, key: K): number {
    if (node == null) return 0;
    const compare = this.compareFunc(key, node.key);
    if (compare === 0) {
      return this.size(node.left);
    } else if (compare > 0) {
      return 1 + this.size(node.left) + this._rank(node.right, key);
    } else {
      return this._rank(node.left, key);
    }
  }
  /**
   * 获取排名为k的节点
   * @param rank
   * @returns
   */
  public select(rank: number) {
    if (rank < 0 || rank > this.size(this.root)) {
      throw new Error("argument to select() is invalid: " + rank);
    }
    return this._select(this.root, rank);
  }
  private _select(node: Node<K, V> | null, k: number) {
    if (!node) return null;
    const compare = this.size(node.left);
    if (compare > k) {
      return this._select(node.left, k);
    } else if (compare < k) {
      return this._select(node.right, k - compare - 1);
    } else return node;
  }
  /**
   * 删除最大值
   */
  public deleteMax() {
    if (!this.root) return;
    this._deleteMax(this.root);
  }
  private _deleteMax(node: Node<K, V>) {
    if (node.right == null) return node.left;
    node.right = this._deleteMax(node.right);
    node.size = 1 + this.size(node.left) + this.size(node.right);
    return node;
  }
  /**
   * 删除最小值
   */
  public deleteMin() {
    if (!this.root) return;
    return this._deleteMin(this.root);
  }
  private _deleteMin(node: Node<K, V>): Node<K, V> | null {
    if (node.left == null) return node.right;
    node.left = this._deleteMin(node.left);
    node.size = 1 + this.size(node.left) + this.size(node.right);
    return node;
  }
  /**
   * 删除指定的节点
   */
  public delete(key: K) {
    if (key == null) throw new Error("calls delete() with a null key");
    this.root = this._delete(this.root, key);
  }

  public _delete(node: Node<K, V> | null, key: K) {
    if (node === null) return null;
    const compare = this.compareFunc(key, node.key);
    if (compare < 0) {
      node.left = this._delete(node.left, key);
    } else if (compare > 0) {
      node.right = this._delete(node.right, key);
    } else {
      if (node.right == null) return node.left;
      if (node.left == null) return node.right;
      const tmp = node;
      node = this._floor(tmp.right, this.min(tmp.right))!;
      node.right = this._deleteMin(tmp.right!);
      node.left = tmp.left;
    }
    node.size = this.size(node.left) + this.size(node.right) + 1;
    return node;
  }
  /**
   * 获取执行范围的数据
   * @param lo
   * @param hi
   */
  public keys(lo: K, hi: K) {
    console.log(lo, hi);
  }

  private _keys() {}
}

const bst = new BST((a: number, b: number) => a - b);

// const data = Array(100)
//   .fill(0)
//   .map((_, index) => index + 1);
// shuffle(data)

// bst.put(1,1)
// bst.put(0,0)
// bst.put(2,2)
// bst.delete(2)
// console.log(bst);

async function getLargeData() {
  function chunk(array: string[]) {
    return new Promise<string[]>((resolve) => {
      const result: string[] = [];
      function helper(index = 0) {
        if (index >= array.length) return resolve(result);
        let i = index;
        for (; i < Math.min(index + 10000, array.length); i++) {
          result.push(...array[i].split(/\s+/));
        }
        requestAnimationFrame(() => helper(i));
      }
      helper(0);
    });
  }
  const data = await fetch("./src/test/leipzig1M.txt");
  const text = await data.text();
  const blob = text.split("\n");
  return chunk(blob);
}
