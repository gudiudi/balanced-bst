import Tree from "./Tree.js";

function getRandomNumbers(count) {
	const numbers = [];
	for (let i = 0; i < count; i++) {
		numbers.push(Math.floor(Math.random() * 100));
	}
	return numbers;
}

const numbers = getRandomNumbers(100);
const tree = new Tree(numbers);
console.log(tree.isBalanced());

const unbalancers = [150, 160, 170, 180, 190, 200];
for (const num of unbalancers) {
	tree.insert(num);
}
console.log(tree.isBalanced());

tree.rebalance();
console.log(tree.isBalanced());
