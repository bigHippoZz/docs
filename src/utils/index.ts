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

export function split(arr: Array<any>, i: number, j: number) {}
