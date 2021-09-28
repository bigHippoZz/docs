import { Sort } from "./Sort";

export class Quick extends Sort {
  public static INSERTION_SORT_CUTOFF = 15;

  public sort<T extends any[]>(array: T): T {
    array = this.shuffle(array);

    // const helper = (array: T, lo: number, hi: number) => {};
    // helper(array, 0, array.length);

    return array;
  }
  [Symbol.toStringTag]: string = "Quick Sort";

  public insertSort(array: any[], lo: number, hi: number) {
    for (let i = lo + 1; i <= hi; i++) {
      for (let j = i; j > lo && this.less(j, j - 1); j--) {
        this.swap(array, j, j - 1);
      }
    }
  }
}
const quick = new Quick();
quick.run(1000000);
