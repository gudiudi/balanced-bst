import Tree from "./Tree.js";

const array = [1, 2, 3, 4, 5, 6, 7];
const tree = new Tree(array);

tree.insert(8);
tree.prettyPrint();
tree.delete(8);
tree.prettyPrint();
