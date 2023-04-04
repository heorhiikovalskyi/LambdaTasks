import "dotenv/config.js";
import inquirer from "inquirer";
import { uploadFile } from "./apis/googleDrive.js";
import { messages } from "./messages.js";
import { getImageUrl } from "./apis/googleDrive.js";
import { shortUrl } from "./apis/tinyUrl.js";

const getExtension = (filePath) => {
  const fileName = filePath.split("\\").pop().trim("'");
  const extension = `.${fileName.split(".").pop()}`;
  return extension;
};

let answers = await inquirer.prompt(messages.m1);
const { path, change } = answers;
answers.extension = getExtension(path);
if (change) {
  answers.fileName += answers.extension;
} else {
  answers.fileName = path.split("\\").pop().trim("'");
}
const { fileName, extension } = answers;
try {
  const {
    data: { id: imageId },
  } = await uploadFile(fileName, extension, path);
  const imageLink = await getImageUrl(imageId);
  console.log(`Your image URL: ${imageLink}`);
  answers = await inquirer.prompt(messages.m2);
  const { changeUrl } = answers;
  if (changeUrl) {
    const shortLink = await shortUrl(imageLink);
    console.log(`New URL ${shortLink}`);
  }
} catch (err) {
  console.log(err);
}
