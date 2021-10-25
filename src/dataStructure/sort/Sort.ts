import { StopWatch } from "@/utils/stopWatch";

type Options = "PositiveOrder" | "OutOfOrder" | "ReverseOrder";

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

export abstract class Sort {
	abstract [Symbol.toStringTag]: string;
	public generateShuffleArray(
		length: number,
		options: Options = "PositiveOrder",
	): Array<number> {
		const result = Array(length)
			.fill(0)
			.map((_, i) => i);
		switch (options) {
			case "ReverseOrder":
				return result.reverse();
			case "OutOfOrder":
				return this.shuffle(result);
			case "PositiveOrder":
				return result;
		}
	}

	public shuffle<T extends any[]>(target: T) {
		for (let i = 0; i < target.length; i++) {
			const random = (Math.random() * i) >>> 0;
			this.swap(target, i, random);
		}
		return target;
	}

	public less(a: any, b: any): boolean {
		return a - b < 0;
	}

	public isSorted(target: number[]): boolean {
		for (let i = 1; i < target.length; i++) {
			if (this.less(target[i], target[i - 1])) {
				return false;
			}
		}
		return true;
	}

	public swap<T extends any[]>(target: T, a: number, b: number) {
		const tmp = target[a];
		target[a] = target[b];
		target[b] = tmp;
	}

	public abstract sort<T extends any[]>(array: T): T;

	public run(length: number) {
		const stopWatch = new StopWatch();
		// 正序
		const arrayA = this.generateShuffleArray(length);
		stopWatch.stop();
		const a = this.sort(arrayA);
		stopWatch.elapsed();
		if (!this.isSorted(a)) {
			console.log(a);
		}
		console.log(
			`[${
				this[Symbol.toStringTag]
			}] the current sort method running time is ${stopWatch.runTime} ms`,
		);
		// 倒序
		const arrayB = this.generateShuffleArray(length, "ReverseOrder");
		stopWatch.stop();
		const b = this.sort(arrayB);
		stopWatch.elapsed();
		if (!this.isSorted(b)) {
			console.log(b);
		}

		console.log(
			`[${
				this[Symbol.toStringTag]
			}] the current sort method running time is ${stopWatch.runTime} ms`,
		);

		// 乱序
		const arrayC = this.generateShuffleArray(length, "OutOfOrder");
		stopWatch.stop();
		const c = this.sort(arrayC);
		stopWatch.elapsed();
		if (!this.isSorted(c)) {
			console.log(c);
		}

		console.log(
			`[${
				this[Symbol.toStringTag]
			}] the current sort method running time is ${stopWatch.runTime} ms`,
		);
	}
}
