import { Sort } from "./Sort";

class InsertX extends Sort {
  public sort<T extends any[]>(array: T): T {
    const len = array.length;
    let exchanges = 0;
    for (let i = len - 1; i > 0; i--) {
      if (this.less(array[i], array[i - 1])) {
        this.swap(array, i, i - 1);
        exchanges++;
      }
    }

    if (exchanges === 0) return array;

    for (let i = 2; i < len; i++) {
      const v = array[i];
      let j = i;
      while (this.less(v, array[j - 1])) {
        array[j] = array[j - 1];
        j--;
      }
      array[j] = v;
    }
    return array;
  }
  [Symbol.toStringTag]: string = "InsertX Sort";
}
const insertX = new InsertX();

// insertX.run(100000);
