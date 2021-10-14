export function swap(arr: Array<any>, i: number, j: number) {
  [arr[i], arr[j]] = [arr[j], arr[i]];
}
export function isSorted(arr: Array<any>): boolean;
export function isSorted(arr: Array<any>, i?: number, j?: number): boolean {
  const isScoped = i != null && j != null;
  if (!isScoped) {
    (i = 0), (j = arr.length);
  }
  if (arr.length === 1) return true;
  for (let k = i! + 1; k < j!; k++) {
    if (arr[k - 1] < arr[k]) {
      return false;
    }
  }
  return true;
}

/**
 * 返回测试数据
 * @param fileName string
 * @returns
 */
export const fetchData = async (fileName: string) => {
  const response = await fetch(`./data/${fileName}`);
  return await response.text();
};

/**
 * 生成随机字符串
 */
export const randomString = (num: number) => {
  num = num || 32;
  const string = "abcdefhijkmnprstwxyz12345678";
  const len = string.length;
  let result = "";
  for (let i = 0; i < num; i++) {
    result += string.charAt((Math.random() * len) >>> 0);
  }
  return result;
};
/**
 * 生成随机数
 * @param min
 * @param max
 * @returns
 */
export function generateRandom(min: number, max: number) {
  return Math.round(Math.random() * (max - min)) + min;
}
