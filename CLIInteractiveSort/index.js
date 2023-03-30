import { messages } from "./messages";
process.stdout.write(
  "Hello. Write a few words and numbers separated by a space or write exit to finish: "
);
let flag1 = 1;
let flag2 = 0;
let inputArray;
let standartInput = process.stdin;
standartInput.setEncoding("utf-8");
standartInput.on("data", (data) => {
  data = data.trim();
  if (data === "exit") {
    console.log("program exit");
    process.exit();
  }
  switch (flag1) {
    case 0:
      process.stdout.write(messages.m1);
      flag1 += 1;
      break;
    case 1:
      if (flag2 !== 1) {
        inputArray = data.split(" ");
      } else {
        flag2 = 0;
      }
      console.log(messages.baseList);
      flag1 += 1;
      break;
    case 2:
      flag1 = 0;
      let result;
      switch (data) {
        case "1":
          result = inputArray.filter((element) => isNaN(element)).sort();
          console.log(result);
          break;
        case "2":
          result = inputArray
            .filter((element) => !isNaN(element))
            .sort((a, b) => a - b);
          console.log(result);
          break;
        case "3":
          result = inputArray
            .filter((element) => !isNaN(element))
            .sort((a, b) => a - b)
            .reverse();
          console.log(result);
          break;
        case "4":
          result = inputArray
            .filter((element) => isNaN(element))
            .sort((a, b) => a.length - b.length);
          console.log(result);
          break;
        case "5":
          result = Array.from(
            new Set(inputArray.filter((element) => isNaN(element)))
          );
          console.log(result);
          break;
        case "6":
          result = Array.from(new Set(inputArray));
          console.log(result);
          break;
        default:
          flag1 = 1;
          flag2 = 1;
          process.stdout.write(messages.m2);
      }
      process.stdout.write(messages.m3);
  }
});
