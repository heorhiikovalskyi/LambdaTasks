import { S3Client, ListObjectsV2Command, GetObjectCommand } from "../opt/nodejs/node16/node_modules/@aws-sdk/client-s3";
import { getSignedUrl } from "../opt/nodejs/node16/node_modules/@aws-sdk/s3-request-presigner";
import { ImagesRepo } from "./repositories/images.js";

const imagesRepo = ImagesRepo.getInstance();
const { BUCKET, REGION } = process.env;
const s3Client = new S3Client({ region: REGION });

exports.getImages = async (event: any, context: any, callback: any) => {
  const email = event.requestContext?.authorizer?.claims?.email;
  try {
    const imagesNames = await imagesRepo.getImages(email);
    const images = await Promise.all(
      imagesNames.map(async (image) => {
        const command = new GetObjectCommand({ Bucket: BUCKET, Key: `${email}_${image}` });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { image, url };
      })
    );
    return {
      statusCode: 200,
      body: JSON.stringify({ images }),
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
