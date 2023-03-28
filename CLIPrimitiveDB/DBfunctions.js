import { questions } from "./index.js";
import inquirer from "inquirer";
import { writeFile, readFileSync } from "fs";
const DB = "./DB.txt";
async function AddUsers() {
  let flag = 0;
  while (flag == 0) {
    await inquirer.prompt(questions).then((answers) => {
      if (answers.name === "") {
        flag += 1;
        return;
      }
      writeFile(
        "./DB.txt",
        JSON.stringify(answers) + "\n",
        { flag: "a" }, //new data will be added to file
        function (err) {
          if (err) return console.log(err);
        }
      );
    });
  }
}

function GetUsers() {
  let usersArray;
  try {
    usersArray = readFileSync(DB, "utf8").split("\n");
  } catch (err) {
    throw new Error();
  }
  usersArray.pop();
  for (let i = 0; i < usersArray.length; i++) {
    usersArray[i] = JSON.parse(usersArray[i]);
  }
  return usersArray;
}

async function SearchUser(usersArray) {
  await inquirer
    .prompt([
      {
        type: "input",
        message: "Write a name of user",
        name: "name",
      },
    ])
    .then((answers) => {
      let count = 0;
      for (let i = 0; i < usersArray.length; i++) {
        if (answers.name === usersArray[i].name) {
          console.log(usersArray[i]);
          count += 1;
        }
      }
      if (count == 0) console.log("No such users");
    });
}

export { GetUsers, SearchUser, AddUsers };
