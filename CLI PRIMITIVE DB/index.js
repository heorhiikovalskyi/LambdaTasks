import inquirer from 'inquirer';
import {GetUsers,
    SearchUser,
    AddUsers} from './DBfunctions.js'
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
