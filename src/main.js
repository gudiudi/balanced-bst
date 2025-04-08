import Tree from "./Tree.js";

/*
function getRandomNumbers(count) {
	const numbers = [];
	for (let i = 0; i < count; i++) {
		numbers.push(Math.floor(Math.random() * 100));
	}
	return numbers;
}

const numbers = getRandomNumbers(100);
const tree = new Tree([numbers]);
console.log(tree.isBalanced());

const unbalancers = [150, 160, 170, 180, 190, 200];
for (const num of unbalancers) {
	tree.insert(num);
}
console.log(tree.isBalanced());

tree.rebalance();
console.log(tree.isBalanced());

console.log(tree.find(200));
console.log(tree.depth(200));
*/

const numbers = [7, 6, 5, 4, 3, 2, 1];
const tree = new Tree(numbers);
tree.prettyPrint();
tree.preOrder((node) => console.log(node.value));
