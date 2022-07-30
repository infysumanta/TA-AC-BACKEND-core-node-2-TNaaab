// get relative path of index.js
// get absolute path of index.js

const path = require("path");

const relativePath = path.relative(__dirname, "./../client/index.js");
console.log(relativePath);
const absolutePath = path.join(__dirname, "./../client/index.js");
console.log(absolutePath);
