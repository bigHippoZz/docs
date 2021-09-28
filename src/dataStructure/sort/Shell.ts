import { Sort } from "./Sort";

class Shell extends Sort {
  [Symbol.toStringTag] = "ShellSort";
  constructor() {
    super();
  }
  sort<T extends number[]>(array: T): T {
    const length = array.length;
    let h = 1;
    while (h < length / 3) {
      h = 3 * h + 1;
    }
    while (h >= 1) {
      for (let i = h; i < length; i++) {
        for (let j = i; j >= h && this.less(array[j], array[j - h]); j -= h) {
          this.swap(array, j, j - h);
        }
      }
      // javaScript并不能进行int取整
      h = (h / 3) >>> 0;
    }
    return array;
  }
}

const shell = new Shell();
shell.run(1000000);
