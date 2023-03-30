export const questions = {
  q1: [
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
  ],
  q2: [
    {
      type: "input",
      message: "Write a name of user",
      name: "name",
    },
  ],
  q3: [
    {
      type: "confirm",
      name: "search",
      message: "Do you want to search user?",
    },
  ],
};
