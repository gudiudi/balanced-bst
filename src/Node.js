export default class Node {
	#value;
	#left;
	#right;

	constructor(value = null, left = null, right = null) {
		this.#value = value;
		this.#left = left;
		this.#right = right;
	}

	get value() {
		return this.#value;
	}

	set value(newValue) {
		this.#value = newValue;
	}

	get left() {
		return this.#left;
	}

	set left(newLeft) {
		this.#left = newLeft;
	}

	get right() {
		return this.#right;
	}

	set right(newright) {
		this.#right = newright;
	}
}
