import { Sort } from "./Sort";

export class Insert extends Sort {
	public sort<T extends any[]>(array: T): T {
		const length = array.length;
		for (let i = 1; i < length; i++) {
			for (let j = i; j > 0 && this.less(array[j], array[j - 1]); j--) {
				this.swap(array, j, j - 1);
			}
		}
		return array;
	}
	[Symbol.toStringTag]: string = "Insert Sort";
}

const insert = new Insert();

// insert.run(1000);
