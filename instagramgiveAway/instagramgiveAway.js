import { HashTable } from "./HashTable.js";
import { readFileSync, readdirSync, statSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
let hashTable = new HashTable();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const files = readdirSync(__dirname + "/files");
files.forEach((element, index) => {
  files[index] = __dirname + "/files/" + element;
});

let setOfWordsInOneFile;
for (let file of files) {
  try {
    setOfWordsInOneFile = new Set(readFileSync(file, "utf8").split("\n"));
  } catch (err) {
    console.error(err);
  }
  for (let word of setOfWordsInOneFile) {
    hashTable.insert(word);
  }
}

console.log(hashTable.existInAllFiles()); //441
console.log(hashTable.existInAtLeastTen()); //73245
console.log(hashTable.uniqueValues());
