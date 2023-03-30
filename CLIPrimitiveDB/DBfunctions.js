import { questions } from "./questions.js";
import inquirer from "inquirer";
import { writeFile, readFileSync } from "fs";
const DB = "./DB.txt";
const addUsers = async () => {
  let flag = 0;
  while (flag === 0) {
    const answers = await inquirer.prompt(questions.q1);
    const { name } = answers;
    if (!name) {
      flag += 1;
      return;
    }
    writeFile(
      "./DB.txt",
      JSON.stringify(answers) + "\n",
      { flag: "a" },
      function (err) {
        if (err) return console.log(err);
      }
    );
  }
};

const getUsers = () => {
  let usersArray;
  try {
    usersArray = readFileSync(DB, "utf8").split("\n");
  } catch (err) {
    throw new Error("error in reading file");
  }
  usersArray.pop();
  usersArray.forEach((user, index) => (usersArray[index] = JSON.parse(user)));
  return usersArray;
};

const searchUser = async (usersArray) => {
  const answers = await inquirer.prompt(questions.q2);
  const { name } = answers;
  let count = 0;
  usersArray.forEach((user) => {
    if (user.name === name) {
      console.log(user);
      count += 1;
    }
  });
  if (count === 0) {
    console.log("No such users");
  }
};

export { getUsers, searchUser, addUsers };
