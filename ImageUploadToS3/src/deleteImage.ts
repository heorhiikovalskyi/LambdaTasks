import { S3Client, DeleteObjectCommand } from "../opt/nodejs/node16/node_modules/@aws-sdk/client-s3";
import { ImagesRepo } from "./repositories/images.js";

const imagesRepo = ImagesRepo.getInstance();
const { BUCKET, REGION } = process.env;
const s3Client = new S3Client({ region: REGION });

exports.deleteImage = async (event: any, context: any, callback: any) => {
  const { email } = event.requestContext?.authorizer?.claims;
  try {
    const { image } = JSON.parse(event.body);
    if (!image) {
      throw new Error("image name should be passed");
    }
    const command = new DeleteObjectCommand({ Bucket: BUCKET, Key: `${email}_${image}` });
    await s3Client.send(command);
    await imagesRepo.deleteImage(image, email);
    return {
      statusCode: 200,
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
