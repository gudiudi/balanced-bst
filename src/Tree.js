import Node from "./Node.js";

export default class Tree {
	#root;

	constructor(array) {
		this.#root = this.#build(array);
	}

	insert(value, node = this.#root) {
		if (!node) {
			const newNode = new Node(value);

			if (!this.#root) this.#root = newNode;

			return newNode;
		}

		if (node.value === value) return node;

		if (value < node.value) {
			node.left = this.insert(value, node.left);
		} else {
			node.right = this.insert(value, node.right);
		}

		return node;
	}

	delete(value, node = this.#root) {
		if (!node) return node;

		if (value < node.value) {
			node.left = this.delete(value, node.left);
			return node;
		}

		if (value > node.value) {
			node.right = this.delete(value, node.right);
			return node;
		}

		if (!node.left && !node.right) return null;

		if (!node.left) return node.right;

		if (!node.right) return node.left;

		const successor = this.#findMin(node);
		node.value = successor.value;
		node.right = this.delete(successor.value, node.right);

		return node;
	}

	find(value) {
		let currentNode = this.#root;
		while (currentNode) {
			if (value === currentNode.value) return currentNode;

			if (value < currentNode.value) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}
		}

		return null;
	}

	levelOrder(callback) {
		return this.#traverse(callback, "levelOrder");
	}

	preOrder(callback) {
		return this.#traverse(callback, "preOrder");
	}

	inOrder(callback) {
		return this.#traverse(callback, "inOrder");
	}

	postOrder(callback) {
		return this.#traverse(callback, "postOrder");
	}

	prettyPrint(node = this.#root, prefix = "", isLeft = true) {
		if (node === null) return;

		if (node.right !== null) {
			this.prettyPrint(
				node.right,
				`${prefix}${isLeft ? "│   " : "    "}`,
				false,
			);
		}

		console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);

		if (node.left !== null) {
			this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
		}
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

	#findMin(node) {
		let currentNode = node.right;
		while (currentNode?.left) {
			currentNode = currentNode.left;
		}
		return currentNode;
	}

	#traverse(callback, method) {
		if (typeof callback !== "function") {
			throw new TypeError("Expected a function as callback");
		}

		const methods = {
			levelOrder: this.#levelOrderIterative,
			preOrder: this.#preOrderRec,
			inOrder: this.#inOrderRec,
			postOrder: this.#postOrderRec,
		};

		if (!methods[method]) {
			throw new Error(`Unknown traversal method: ${method}`);
		}

		return methods[method].call(this, callback, this.#root);
	}

	#levelOrderIterative(callback, node) {
		const queue = [node];
		let front = 0;

		while (front < queue.length) {
			const currentNode = queue[front++];
			if (!currentNode) continue;

			callback(currentNode);

			if (currentNode.left) queue.push(currentNode.left);
			if (currentNode.right) queue.push(currentNode.right);
		}

		return null;
	}

	#preOrderRec(callback, node) {
		if (node === null) return;
		callback(node);
		if (node.left) this.#preOrderRec(callback, node.left);
		if (node.right) this.#preOrderRec(callback, node.right);
	}

	#inOrderRec(callback, node) {
		if (node === null) return;
		if (node.left) this.#inOrderRec(callback, node.left);
		callback(node);
		if (node.right) this.#inOrderRec(callback, node.right);
	}

	#postOrderRec(callback, node) {
		if (node === null) return;
		if (node.left) this.#postOrderRec(callback, node.left);
		if (node.right) this.#postOrderRec(callback, node.right);
		callback(node);
	}
}
