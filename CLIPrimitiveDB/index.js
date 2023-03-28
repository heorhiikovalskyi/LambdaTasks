import inquirer from "inquirer";
import { GetUsers, SearchUser, AddUsers } from "./DBfunctions.js";
//if we upload file without enter in the end:
/*  try{
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
    type: "input",
    name: "name",
    message: "What`s your name? Press ENTER to cancel",
  },
  {
    type: "list",
    name: "gender",
    message: "Choose your gender",
    choices: ["male", "female"],
    when: (answers) => answers.name != "",
  },
  {
    type: "number",
    name: "age",
    message: "How old are you?",
    when: (answers) => answers.name != "",
  },
];

await AddUsers();
await inquirer
  .prompt([
    {
      type: "confirm",
      name: "search",
      message: "Do you want to search user?",
    },
  ])
  .then(async function (answers) {
    if (answers.search == true) {
      let usersArray;
      try {
        usersArray = GetUsers();
      } catch (err) {
        return console.log("Smth wrong with DB. Sorry and try later");
      }
      console.log(usersArray);
      await SearchUser(usersArray);
    }
  });
console.log("Exit");
export { questions };
