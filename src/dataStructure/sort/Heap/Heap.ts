import { Sort } from "../Sort";

class HeapSort extends Sort {
  public sort<T extends any[]>(array: T): T {
    let len = array.length;
    for (let i = len >> 1; i >= 1; i--) {
      this.sink(array, i, len);
    }
    let k = len;
    while (k > 1) {
      this.exch(array, 1, k--);
      this.sink(array, 1, k);
    }
    return array;
  }
  private sink(list: number[], k: number, n: number) {
    while (2 * k <= n) {
      let j = 2 * k;
      if (j < n && this.compare(list, j, j + 1)) {
        j++;
      }
      if (!this.compare(list, k, j)) {
        break;
      }
      this.exch(list, k, j);
      k = j;
    }
  }

  private compare(list: number[], a: number, b: number) {
    return list[a - 1] - list[b - 1] < 0;
  }

  private exch(list: number[], a: number, b: number) {
    [list[a - 1], list[b - 1]] = [list[b - 1], list[a - 1]];
  }

  [Symbol.toStringTag]: string = "Heap Sort";
}

const heap = new HeapSort();

heap.run(1000000);
