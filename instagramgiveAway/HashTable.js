import {Node, LinkedList} from './LinkedList.js'

function GetHash(word, size){
    let hash = 0
    let n = word.length - 1
    for (let symbol of word){
        hash += symbol.codePointAt(0) * Math.pow(31,n)
        n -= 1
    }
    return hash % size
}

class HashTable {
constructor(){
this.array = new Array(100)
this.realSize = 0
}

uniqueValues(){
    return this.realSize
}

existInAllFiles(){
    let count = 0
    for (let i = 0; i < this.array.length; i++){
        if (this.array[i]){
let temp = this.array[i].head
while (temp){
if (temp.count == 20){
    count += 1
}
temp = temp.next
}
        }
    }
    return count
}
existInAtLeastTen(){
    let count = 0
    for (let i = 0; i < this.array.length; i++){
        if (this.array[i]){
let temp = this.array[i].head
while (temp){
if (temp.count >= 10){
    count += 1
}
temp = temp.next
}
        }
    }
    return count
}


resize(){
if (this.realSize/this.array.length >= 3/4){
   let newArray =  new Array(Math.round(this.array.length * 1.6))
for (let i = 0; i < this.array.length; i++){
    if (this.array[i]){
        let temp = this.array[i].head 
while (temp){
    let hash = GetHash(temp.word, newArray.length)
if (newArray[hash] == undefined){
    newArray[hash] = new LinkedList(new Node(temp.word, temp.count))
}
else{
    newArray[hash].push(temp.word, temp.count)
}
   temp = temp.next
}
    }
    }
this.array = newArray
}
}

insert(word){
    let index = GetHash(word, this.array.length)
    if (this.array[index] == undefined) {
        this.array[index] = new LinkedList(new Node(word))
        this.realSize += 1
        this.resize()
    }
    else{
        if (this.array[index].push(word) == true){
            this.realSize += 1
            this.resize()
        }
    }

    }
}

export {
    GetHash,
HashTable
}