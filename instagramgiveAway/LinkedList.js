export class Node{
constructor(word, count = 1){
this.word = word
this.count = count
this.next = null
}

countIncrease(){
    this.count += 1
}
}

export class LinkedList{
constructor(node){
    this.head = node
    this.tail = node
}

print(){
    let temp = head 
    while (temp){
     console.log(temp.word)
     console.log(temp.count)
     temp = temp.next
    }
 }

isNode(word){
    let temp = this.head
    while (temp != null){
       if (temp.word == word){
        return temp
       }
       temp = temp.next
    }
    return undefined
}

push(word, count = 1){
   let node_ = this.isNode(word)
    if (node_ == undefined){
        this.tail.next = new Node(word, count)
        this.tail = this.tail.next
        return true 
    } 
    else{
    node_.countIncrease()
    return false
    }
}
}
