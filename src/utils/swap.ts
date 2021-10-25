export function swap(arr: Array<any>, i: number, j: number) {
	[arr[i], arr[j]] = [arr[j], arr[i]];
}
