import { Sort } from "./Sort";

export class Merge extends Sort {
  private static INSERT_SORT_CUTOFF: number = 15;
  public sort<T extends any[]>(array: T): T {
    // 自顶而下
    const helper = (lo: number, hi: number) => {
      if (hi - lo + 1 <= Merge.INSERT_SORT_CUTOFF) {
        this.insertSort(array, lo, hi);
        return;
      }
      const mid = (lo + hi) >>> 1;
      helper(lo, mid);
      helper(mid + 1, hi);
      if (array[mid] < array[mid + 1]) {
        return;
      }
      this.merge(array, lo, mid, hi);
    };
    helper(0, array.length - 1);

    // 自底而上
    // const len = array.length;
    // for (let size = 1; size < len; size = size + size) {
    //   for (let lo = 0; lo < len - size; lo += size + size) {
    //     this.merge(
    //       array,
    //       lo,
    //       lo + size - 1,
    //       Math.min(lo + size + size - 1, len - 1)
    //     );
    //   }
    // }

    // const length = array.length;
    // // 进行翻倍
    // for (let size = 1; size < length; size = size + size) {
    //   // lo < length 为什么不是 lo <= length
    //   for (let lo = 0; lo < length - size; lo += size + size) {
    //     this.merge(
    //       array,
    //       lo,
    //       lo + size - 1,
    //       Math.min(lo + size + size - 1, length - 1)
    //     );
    //   }
    // }

    return array;
  }
  [Symbol.toStringTag]: string = "Merge Sort";

  public merge<T extends any[]>(array: T, lo: number, min: number, hi: number) {
    let i = lo;
    let j = min + 1;

    for (let i = lo; i <= hi; i++) {
      Merge.aux[i] = array[i];
    }

    for (let k = lo; k <= hi; k++) {
      if (i > min) {
        array[k] = Merge.aux[j++];
      } else if (j > hi) {
        array[k] = Merge.aux[i++];
      } else if (this.less(Merge.aux[i], Merge.aux[j])) {
        array[k] = Merge.aux[i++];
      } else {
        array[k] = Merge.aux[j++];
      }
    }
  }
  private static aux: number[] = [];
  private insertSort(array, lo, hi) {
    for (let i = lo; i <= hi; i++) {
      for (let j = i; j > lo && this.less(array[j], array[j - 1]); j--) {
        this.swap(array, j, j - 1);
      }
    }
  }
}

const merge = new Merge();

merge.run(1000000);
