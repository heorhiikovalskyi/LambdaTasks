import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import "dotenv/config.js";
import fs from "fs";
const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URL, REFRESH_TOKEN, FOLDER } = process.env;
const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const drive = google.drive({
  version: "v3",
  auth: oauth2Client,
});

export const getImageUrl = async (imageId) => {
  const {
    data: { webViewLink: imageLink },
  } = await drive.files.get({
    fileId: imageId,
    fields: "webViewLink",
    parents: [FOLDER],
  });
  return imageLink;
};

export const uploadFile = async (name, extension, path) => {
  return await drive.files.create({
    requestBody: {
      name: name,
      mimetype: `image/${extension}`,
      parents: [FOLDER],
    },
    media: {
      mimetype: `image/${extension}`,
      body: fs.createReadStream(path),
    },
  });
};
