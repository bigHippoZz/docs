import { fetchData } from "@/utils";

class Graph {
	private _V: number; // Vertex 顶点
	private _E: number; // Edge   边
	public adj: Map<number, number[]> = new Map();
	constructor(V: number) {
		this._V = V; // 顶点
		this._E = 0; // 边
		for (let i = 0; i < V; i++) {
			this.adj.set(i, []);
		}
	}
	/**
	 * 返回顶点的数量
	 * @returns Number
	 */
	public V() {
		return this._V;
	}
	/**
	 * 返回边的数量
	 * @returns Number
	 */
	public E() {
		return this._E;
	}
	public addEdge(v: number, w: number) {
		// 将v添加到w中
		// 将w添加到v中
		this.adj.get(v)?.push(w);
		this.adj.get(w)?.push(v);
		// 边的数量增加
		this._E++;
	}
	public toString(): string {
		let result = "";
		for (const [K, V] of this.adj) {
			result += K;
			result += ": ";
			result += V;
			result += "\n";
		}
		return result;
	}
}

// fetchData("tinyG.txt").then((data) => {
//   const pattern = /(\d+)/g;
//   const matches = data.match(pattern) as string[];
//   const graph = new Graph(matches!.length >>> 1);
//   for (let i = 0; i < matches!.length; i += 2) {
//     graph.addEdge(Number(matches[i]), Number(matches[i + 1]));
//   }
//   // console.log(graph.toString());
// });
