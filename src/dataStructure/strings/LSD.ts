import { randomString } from "../../utils/index";

const data = Array(100)
  .fill(-1)
  .map(() => randomString(10));

const _data = Array(100)
  .fill(-1)
  .map((_item, index) => ({
    keys: (index % 4) + 1,
    value: randomString(10),
  }));

/**
 * 低位字符串排序
 */
export class LSD {
  public static BITS_PER_BYTE = 8;
  constructor() {}
  public sort(stringArray: string[], w: number) {
    const len = stringArray.length;
    const R = 256;
    const aux = Array(len).fill(0);
    const count = Array(R).fill(0);
    for (let i = 0; i < len; i++) {
      count[stringArray[i].charCodeAt(1) + 1]++;
    }
    // console.log(count);
    // for (let i = w - 1; i >= 0; i--) {
    //   const count = Array(R).fill(0);
    //   for (let n = 0; n < len; n++) {
    //     count[stringArray[n].charAt(w) + 1]++;
    //   }
    //   console.log(count);
    // }
  }
}

const lsd = new LSD();
// console.log(data);
lsd.sort(data, 10);
