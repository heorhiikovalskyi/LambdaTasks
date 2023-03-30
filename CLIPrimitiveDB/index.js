import inquirer from "inquirer";
import { getUsers, searchUser, addUsers } from "./DBfunctions.js";
import { questions } from "./questions.js";

await addUsers();

const answers = await inquirer.prompt(questions.q3);
const { search } = answers;
if (search) {
  let usersArray;
  try {
    usersArray = getUsers();
    console.log(usersArray);
    await searchUser(usersArray);
  } catch (err) {
    console.log("Smth wrong with DB. Sorry and try later");
  }
}
console.log("Exit");
