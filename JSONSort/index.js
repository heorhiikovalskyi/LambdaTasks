import axios from 'axios'
import {readFileSync} from 'fs'
const truefalseCount = {trues: 0, falses: 0}
const endpoints = readFileSync('./endpoints.txt', 'utf8').split("\n")

function JSONParse(objectToParse){
const keys = Object.keys(objectToParse)
for (let key of keys){
    const value = objectToParse[key]
    if(typeof(value) === 'object'){
        const isDone = JSONParse(value)
        if (isDone === true || isDone === false){
            return isDone
        }
   }
    if(key === 'isDone'){
        return value
    }
    }
    return undefined
}


let counter = 0//для умови з трьома звертаннями на endpoint
for (let i = 0; i < endpoints.length; i++){
    let JSON
    try{
        JSON = (await axios.get(endpoints[i])).data
    }
    catch(error){
        counter += 1
        if (counter === 3){
            console.log(error.message)
            counter = 0
        }
        else{
            i -= 1
        }
        continue   
    }
    console.log(endpoints[i])
    const isDone = JSONParse(JSON)
    console.log(isDone)
    if (isDone === false){
        truefalseCount['falses'] += 1
} 
    else {
        truefalseCount['trues'] += 1
}
    counter = 0
}
console.log(`Trues: ${truefalseCount['trues']}`)
console.log(`Falses: ${truefalseCount['falses']}`)
