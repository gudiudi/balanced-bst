import Node from "./Node.js";

export default class Tree {
	#root;

	constructor(array) {
		this.#root = this.#build(array);
	}

	get root() {
		return this.#root;
	}

	#build(array) {
		const values = [...new Set(array)].sort((a, b) => a - b);
		const start = 0;
		const end = values.length - 1;

		return this.#split(values, start, end);
	}

	#split(values, start, end) {
		if (start > end) return null;

		const mid = start + Math.floor((end - start) / 2);
		const node = new Node(values[mid]);

		node.left = this.#split(values, start, mid - 1);
		node.right = this.#split(values, mid + 1, end);

		return node;
	}
}
