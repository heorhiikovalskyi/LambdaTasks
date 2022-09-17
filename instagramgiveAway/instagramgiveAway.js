import {Node,LinkedList} from './LinkedList.js'
import {GetHash,HashTable} from './HashTable.js'
import {readFileSync} from 'fs'
let hashTable = new HashTable()
function runFile(file){
  let data
    try {
      data = readFileSync(file, "utf8")
    } catch (err) {
      console.error(err);
    }
    let array = data.split("\n")
    array = new Set(array)
    for (let i of array){
      hashTable.insert(i)
    }
}

  let file_ = './files\\out'
  
 for (let i = 0; i < 20; i++){
let file = file_ + i + ".txt"
console.log(file)
runFile(file)
}

//console.log(hashTable.existInAllFiles())//441
//console.log(hashTable.existInAtLeastTen())//73245

