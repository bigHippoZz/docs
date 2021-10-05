import { Sort } from "./Sort";

class Quick3way extends Sort {
  public sort<T extends any[]>(array: T): T {
    array = this.shuffle(array);
    const helper = <T extends any[]>(array: T, lo: number, hi: number) => {
      if (lo >= hi) {
        return;
      }
      let lt = lo;
      let gt = hi;
      let i = lo + 1;
      const v = array[lo];
      while (i <= gt) {
        const tmp = array[i] - v;
        if (tmp > 0) {
          this.swap(array, i, gt--);
        } else if (tmp < 0) {
          this.swap(array, i++, lt++);
        } else {
          i++;
        }
      }
      helper(array, lo, lt - 1);
      helper(array, gt + 1, hi);
    };
    helper(array, 0, array.length - 1);
    return array;
  }
  [Symbol.toStringTag]: string = "Quick3way";
}
// const quick3way = new Quick3way();

// quick3way.run(1000000);
