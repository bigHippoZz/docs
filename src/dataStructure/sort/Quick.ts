import { Sort } from "./Sort";
import { shuffle } from "@/utils/shuffle";
import { StopWatch } from "@/utils/stopWatch";
export class Quick extends Sort {
  public sort<T extends any[]>(array: T): T {
    array = this.shuffle(array);
    const helper = (array: T, lo: number, hi: number) => {
      if (hi <= lo) {
        return;
      }
      const j = this.partition(array, lo, hi);
      helper(array, lo, j - 1);
      helper(array, j + 1, hi);
    };
    helper(array, 0, array.length);
    return array;
  }
  [Symbol.toStringTag]: string = "Quick Sort";

  public partition<T extends any[]>(
    array: T,
    lo: number = 0,
    hi: number = array.length - 1
  ) {
    let i = lo;
    let j = hi + 1;
    const reference = array[lo];
    // 进行比对
    while (true) {
      // 从左侧进行查找,查找比参照物大的数字,注意这里while进行取反的思想
      while (this.less(array[++i], reference)) {
        if (i === hi) break;
      }
      // 从右侧进行查找,查找比参照物小的数字
      while (this.less(reference, array[--j])) {
        if (j === lo) break;
      }
      if (i >= j) break;
      this.swap(array, i, j);
    }
    this.swap(array, lo, j);
    return j;
  }

  public select(array: number[], k: number) {
    let lo = 0;
    let hi = array.length - 1;
    k = array.length - k;
    while (lo < hi) {
      let j = this.partition(array, lo, hi);
      if (j < k) {
        lo = j + 1;
      } else if (j > k) {
        hi = j - 1;
      } else {
        return array[k];
      }
    }
    return array[k];
  }
}
// const quick = new Quick();
// quick.run(1000000);

function findTop(array: number[]) {
  let lo = 0;
  let hi = array.length - 1;
  let k = array.length - 1;
  while (lo <= hi) {
    let j = partition(array, lo, hi);
    if (k > j) {
      lo = j + 1;
    } else if (j > k) {
      hi = j - 1;
    } else {
      return array[k];
    }
  }
  return array[k];
}

function partition(array: number[], lo: number, hi: number) {
  let i = lo;
  let j = hi + 1;
  let v = array[lo];
  while (true) {
    while (array[++i] < v) {
      if (i === hi) {
        break;
      }
    }
    while (array[--j] > v) {
      if (j === lo) break;
    }
    if (i >= j) {
      break;
    }
    swap(array, i, j);
  }
  swap(array, lo, j);
  return j;
}

function swap(array: number[], lo: number, hi: number) {
  const tmp = array[lo];
  array[lo] = array[hi];
  array[hi] = tmp;
}

function findMax(array: number[]) {
  let max = Number.MIN_SAFE_INTEGER;
  for (let i = 0; i < array.length; i++) {
    max = Math.max(max, array[i]);
  }
  return max;
}

function main() {
  const data = Array(100000)
    .fill(0)
    .map((_, index) => index);
  shuffle(data);

  const stopwatch = new StopWatch();

  stopwatch.stop();
  console.log(findTop(data));
  console.log(stopwatch.elapsed());
  shuffle(data);
  stopwatch.stop();
  console.log(findMax(data));
  console.log(stopwatch.elapsed());
}
