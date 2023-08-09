import { createPresignedPost, PresignedPost } from "../opt/nodejs/node16/node_modules/@aws-sdk/s3-presigned-post";
import { S3Client } from "../opt/nodejs/node16/node_modules/@aws-sdk/client-s3";

const { BUCKET, REGION } = process.env;
const client = new S3Client({ region: REGION });

exports.presignedPost = async (event: any, context: any, callback: any) => {
  try {
    const { queryStringParameters: queryParams } = event;
    if (!queryParams) {
      throw new Error("query parameters should be passed");
    }
    const { fileName } = queryParams;
    if (!fileName) {
      throw new Error("fileName should be passed");
    }
    const email = event.requestContext?.authorizer?.claims?.email;
    const options = {
      Bucket: BUCKET!,
      Key: `${email}_${fileName}`,
      Expires: 3600,
    };
    const post = await createPresignedPost(client, options);
    return { statusCode: 200, body: JSON.stringify({ post: post }) };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
