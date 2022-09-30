import {questions} from './index.js'
import inquirer from 'inquirer';
import {writeFile, readFileSync} from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB = __dirname+"/DB.txt";
async function AddUsers(){
    let flag = 0
    while(flag == 0){
     await inquirer.prompt(questions).then((answers) => {
        if (answers.name != ''){
        writeFile(DB, JSON.stringify(answers) + '\n', {flag: 'a'}, function(err){
        if(err){
            return console.log(err)
        }
        }
        )}
        else{
            flag += 1
        }
    })
}}

function GetUsers(){
    let usersArray
    try{
    usersArray = readFileSync(DB, "utf8").split("\n")}
    catch (err){
        console.error(err);
    }
    usersArray.pop()
    for (let i = 0; i < usersArray.length; i++){
        usersArray[i] = JSON.parse(usersArray[i])
    }
    return usersArray
}

async function SearchUser(usersArray){
await inquirer.prompt([{
type: 'input',
message: 'Write a name of user',
name: 'name'
}]).then((answers) => {
    let count = 0
for (let i = 0; i < usersArray.length; i++){
    if (answers.name == usersArray[i].name){
        console.log(usersArray[i])
        count += 1
    }
}
if (count == 0){
    console.log("No such users")
}
})
}

export {
    GetUsers,
    SearchUser,
    AddUsers
}
