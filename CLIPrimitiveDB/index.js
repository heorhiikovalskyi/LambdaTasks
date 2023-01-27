import inquirer from 'inquirer';
import {GetUsers,
    SearchUser,
    AddUsers} from './DBfunctions.js'
//if we upload file without enter in the end: 
/*   import path from 'path';
  import {writeFile, readFileSync} from 'fs';
    import { fileURLToPath } from 'url';
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const DB = __dirname+"/DB.txt";
    try{
        const file = readFileSync(DB, "utf8")
        if (file[file.length - 1] != '\n'){
            writeFile(DB, '\n', {flag: 'a'})
        }}
        catch (err){
            console.error(err);
        }
*/
const questions = [
{
    type: 'input',
    name: 'name',
    message: 'What`s your name? Press ENTER to cancel' 

},
{
    type: 'list',
    name: 'gender',
    message: 'Choose your gender',
    choices: ['male', 'female'],
    when: (answers) => answers.name != ''
},
{
    type: 'number',
    name: 'age',
    message: 'How old are you?',
    when: (answers) => answers.name != ''
}
]

await AddUsers()
await inquirer.prompt([{
    type: 'confirm',
    name: 'search',
    message: "Do you want to search user?"
}]).then(async function (answers)  { 
    if (answers.search == true){
        const usersArray = GetUsers()
        console.log(usersArray)
        await SearchUser(usersArray);
    }
})
console.log('Exit')

export {
    questions
}
