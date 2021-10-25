import { shuffle } from "@/utils/shuffle";

interface IPriorityQueue<T> {
	enqueue(element: T): void;
	dequeue(): T | null;
	size(): number;
	isEmpty(): boolean;
	front(): T;
	toArray(): T[];
	clear(): void;
}

interface Comparator<K> {
	(a: K, b: K): number;
}

export class PriorityQueue<T> implements IPriorityQueue<T> {
	private n = 0;
	private queue: (T | null)[] = [];
	constructor(private readonly compareFunction: Comparator<T>) {}
	enqueue(element: T): void {
		this.queue[++this.n] = element;
		this.swim(this.n);
	}

	dequeue(): T | null {
		if (this.isEmpty()) {
			return null;
		}
		const element = this.queue[1];
		this.swap(1, this.n--);
		this.queue[this.n + 1] = null;
		this.sink(1);
		return element;
	}
	size(): number {
		return this.n;
	}
	isEmpty(): boolean {
		return this.n === 0;
	}
	front(): T {
		if (this.isEmpty()) {
			throw new Error("pq is empty");
		}
		return this.queue[1] as T;
	}
	toArray(): T[] {
		if (this.isEmpty()) {
			throw new Error("pq is empty");
		}
		return this.queue.slice(1) as T[];
	}

	clear(): void {
		this.n = 0;
		this.queue.length = 0;
	}

	private swim(index: number) {
		while (index > 1 && this.comparer(index >> 1, index)) {
			this.swap(index, index >> 1);
			index = index >> 1;
		}
	}

	private sink(index: number) {
		while (2 * index <= this.n) {
			let j = 2 * index;
			if (j < this.n && this.comparer(j, j + 1)) {
				j++;
			}
			if (this.comparer(j, index)) {
				break;
			}
			this.swap(index, j);
			index = j;
		}
	}

	private swap(a: number, b: number) {
		[this.queue[a], this.queue[b]] = [this.queue[b], this.queue[a]];
	}

	private comparer(a: number, b: number) {
		return this.compareFunction(this.queue[a]!, this.queue[b]!) < 0;
	}
}

function main() {
	const mockData = Array(10)
		.fill(0)
		.map((_, index) => index);

	const maxPQ = new PriorityQueue((a: number, b: number) => -a + b);
	const result: (number | undefined | null)[] = [];
	shuffle(mockData);
	mockData.forEach((item) => maxPQ.enqueue(item));
	// console.log(maxPQ);
	mockData.forEach(() => {
		result.push(maxPQ.dequeue());
	});
	// console.log(result);
}
main();
