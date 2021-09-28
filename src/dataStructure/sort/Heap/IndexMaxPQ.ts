import { shuffle } from "../../../utils/shuffle";
interface Comparator<K> {
  (a: K, b: K): number;
}
class IndexMaxPQ<T> {
  private pq: number[] = [];
  private qp: number[] = [];
  private n = 0;
  private keys: (T | null)[] = [];

  constructor(
    private readonly comparatorFunc: Comparator<T>,
    private readonly maxN: number = 2 ** 16
  ) {
    for (let i = 0; i <= this.maxN; i++) {
      this.qp[i] = -1;
    }
  }

  public insert(index: number, key: T) {
    this.validateIndex(index);
    if (this.contains(index))
      throw new Error(`${index} is not in the priority queue`);
    this.n++;
    // 通过index寻找二叉堆中的索引
    this.qp[index] = this.n;
    // 二叉堆中存放实际元素的下表进而快速的定位
    this.pq[this.n] = index;
    // 通过index寻找元素数据中元素
    this.keys[index] = key;
    // 进行上浮
    this.swim(this.n);
  }

  public delMax() {
    if (this.isEmpty()) {
      throw new Error("Priority queue underflow");
    }
    const maxIndex = this.pq[1];
    this.swap(1, this.n--);
    this.sink(1);
    this.pq[this.n + 1] = -1;
    this.qp[maxIndex] = -1;
    const max = this.keys[maxIndex];
    this.keys[maxIndex] = null;
    return max;
  }

  public maxKey(): T {
    if (this.isEmpty()) {
      throw new Error("Priority queue underflow");
    }
    return this.keys[this.pq[1]] as T;
  }

  public maxIndex() {
    if (this.isEmpty()) {
      throw new Error("Priority queue underflow");
    }
    return this.pq[1];
  }

  public keyOf(index: number): T {
    this.validateIndex(index);
    if (!this.contains(index))
      throw new Error("index is not in the priority queue");
    return this.keys[index] as T;
  }

  public changeKey(index: number, key: T) {
    this.validateIndex(index);
    if (!this.contains(index))
      throw new Error("index is not in the priority queue");
    // 更改keys中的元素
    this.keys[index] = key;
    // 找到二叉堆中的位置然后进行上浮下沉
    this.swim(this.qp[index]);
    this.sink(this.qp[index]);
  }
  public delete(index: number) {
    this.validateIndex(index);
    if (!this.contains(index))
      throw new Error("index is not in the priority queue");
    const currentIndex = this.qp[index];
    this.swap(currentIndex, this.n--);
    this.swim(currentIndex);
    this.sink(currentIndex);

    this.keys[index] = null;
    this.qp[index] = -1;
  }

  public contains(index: number): boolean {
    this.validateIndex(index);
    return this.qp[index] !== -1;
  }

  public isEmpty() {
    return this.n === 0;
  }

  public size() {
    return this.n;
  }

  private swim(index: number) {
    while (index > 1 && this.less(index >>> 1, index)) {
      this.swap(index >>> 1, index);
      index = index >>> 1;
    }
  }

  private sink(index: number) {
    while (index * 2 <= this.n) {
      let j = index * 2;
      if (j < this.n && this.less(j, j + 1)) {
        j++;
      }

      if (!this.less(index, j)) {
        break;
      }

      this.swap(index, j);
      index = j;
    }
  }

  private less(a: number, b: number) {
    return (
      this.comparatorFunc(this.keys[this.pq[a]]!, this.keys[this.pq[b]]!) < 0
    );
  }

  private validateIndex(i: number) {
    if (i < 0) {
      throw new Error("index is negative:" + i);
    }
    if (this.maxN <= i) {
      throw new Error("index >= capacity:" + i);
    }
  }

  private swap(a: number, b: number) {
    const tmp = this.pq[a];
    this.pq[a] = this.pq[b];
    this.pq[b] = tmp;
    this.qp[this.pq[a]] = a;
    this.qp[this.pq[b]] = b;
  }
}

function main() {
  const indexMaxPQ = new IndexMaxPQ((a: number, b: number) => a - b);

  const result = Array(1000)
    .fill(0)
    .map((_, index) => index);

  shuffle(result);
  result.forEach((item, index) => indexMaxPQ.insert(index, item));
  for (let i = 0; i < 1000; i++) {
    console.log(indexMaxPQ.delMax());
  }
}
// main();
