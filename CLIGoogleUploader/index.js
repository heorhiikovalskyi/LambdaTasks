import "dotenv/config.js";
import inquirer from "inquirer";
import axios from "axios";
import { google } from "googleapis";
import fs from "fs";
import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URL = process.env.REDIRECT_URL;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const SHORT_URL_API_TOKEN = process.env.SHORT_URL_API_TOKEN;
const FOLDER = process.env.FOLDER;

let imageLink;

const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

async function ShortURL(URL) {
  return (
    await axios({
      method: "post",
      url: process.env.SHORT_URL_ENDPOINT + `${URL}`,
      data: {
        url: URL,
        tags: "____",
        expires_at: null,
      },
      api_token: SHORT_URL_API_TOKEN,
    })
  ).data;
}

async function UploadFile(name, extension, path) {
  return await drive.files.create({
    requestBody: {
      name: name,
      mimetype: "image/" + extension,
      parents: [FOLDER],
    },
    media: {
      mimetype: "image/" + extension,
      body: fs.createReadStream(path),
    },
  });
}

function GetExtension(file) {
  let extension = "";
  for (let i = file.length - 1; file[i] != "."; i--) {
    extension += file[i];
  }
  extension += ".";
  extension = extension.split("").reverse().join("");
  return extension;
}

const questions = [
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
    name: "name",
    message: "Write a name without extension",
    when: (answer) => answer.change == true,
  },
];

await inquirer.prompt(questions).then(async (answers) => {
  const fileName = answers.path.split("\\").pop().trim("'");
  answers.extension = GetExtension(fileName);
  if (answers.change == true) answers.name += answers.extension;
  else answers.name = fileName;
  try {
    let imageID = (await UploadFile(answers.name, answers.extension, answers.path)).data.id;

    imageLink = (
      await drive.files.get({
        fileId: imageID,
        fields: "webViewLink",
        parents: [FOLDER],
      })
    ).data.webViewLink;
  } catch (err) {
    return console.log(err);
  }
  console.log(`Your image URL: ${imageLink}`);

  await inquirer
    .prompt([
      {
        type: "confirm",
        name: "changeURL",
        message: `Do you want to short URL?`,
      },
    ])
    .then(async (answers) => {
      if (answers.changeURL == true) {
        try {
          console.log(`New URL ${await ShortURL(imageLink)}`);
        } catch (error) {
          console.log(error.message);
        }
      }
    });
});
