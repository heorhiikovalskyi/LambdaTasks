export const messages = {
  m1: [
    {
      type: "input",
      name: "path",
      message: "Drag an image",
    },
    {
      type: "confirm",
      name: "change",
      message: (answers) => `Do you want to change the name: ${answers.path.split("\\").pop().trim("'")}?`,
    },
    {
      type: "input",
      name: "fileName",
      message: "Write a name without extension",
      when: (answer) => answer.change,
    },
  ],
  m2: [
    {
      type: "confirm",
      name: "changeUrl",
      message: `Do you want to short URL?`,
    },
  ],
};
