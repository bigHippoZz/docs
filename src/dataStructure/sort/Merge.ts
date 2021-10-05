import { Sort } from "./Sort";

export class Merge extends Sort {
  public sort<T extends any[]>(array: T): T {
    // 自顶而下
    const helper = (lo: number, hi: number) => {
      if (lo >= hi) {
        return;
      }
      const mid = (lo + hi) >>> 1;
      helper(lo, mid);
      helper(mid + 1, hi);
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
}
const merge = new Merge();

// merge.run(1000000);
