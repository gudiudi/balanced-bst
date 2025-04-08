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

	// A single node (leaf) has height 0, An empty tree has height -1
	height(value) {
		const node = this.find(value);
		if (!node) return -1;
		if (!node.left && !node.right) return 0;

		const queue = [node];
		let front = 0;
		let height = 0;

		while (front < queue.length) {
			const levelSize = queue.length - front;

			for (let i = 0; i < levelSize; i++) {
				const currentNode = queue[front++];
				if (!currentNode) continue;

				if (currentNode.left) queue.push(currentNode.left);
				if (currentNode.right) queue.push(currentNode.right);
			}
			height++;
		}

		return height - 1;
	}

	depth(value) {
		let currentNode = this.#root;
		let count = 0;
		while (currentNode) {
			if (value === currentNode.value) return count;

			if (value < currentNode.value) {
				currentNode = currentNode.left;
			} else {
				currentNode = currentNode.right;
			}

			count++;
		}

		return null;
	}

	isBalanced() {
		return this.#checkBalance(this.#root) >= 0;
	}

	#checkBalance(node) {
		if (!node) return 0;

		const leftHeight = this.#checkBalance(node.left);
		if (leftHeight === -1) {
			return -1;
		}

		const rightHeight = this.#checkBalance(node.right);
		if (rightHeight === -1) {
			return -1;
		}

		const heightDifference = Math.abs(leftHeight - rightHeight);
		if (heightDifference > 1) {
			return -1;
		}

		return Math.max(leftHeight, rightHeight) + 1;
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
		if (!node) return;
		callback(node);
		this.#preOrderRec(callback, node.left);
		this.#preOrderRec(callback, node.right);
	}

	#inOrderRec(callback, node) {
		if (!node) return;
		this.#inOrderRec(callback, node.left);
		callback(node);
		this.#inOrderRec(callback, node.right);
	}

	#postOrderRec(callback, node) {
		if (!node) return;
		this.#postOrderRec(callback, node.left);
		this.#postOrderRec(callback, node.right);
		callback(node);
	}
}
