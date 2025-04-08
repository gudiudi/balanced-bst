import Tree from "./Tree.js";

const array = [2, 3, 4, 5, 6, 7];
const tree = new Tree(array);

tree.prettyPrint();

//tree.levelOrder((node) => console.log(node.value));
//tree.preOrder((node) => console.log(node.value));
//tree.inOrder((node) => console.log(node.value));
//tree.postOrder((node) => console.log(node.value));

console.log(tree.height(4));
//console.log(tree.depth(7));
