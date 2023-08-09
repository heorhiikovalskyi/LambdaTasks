import { ImagesRepo } from "./repositories/images.js";
const imagesRepo = ImagesRepo.getInstance();

exports.uploadToDb = async (event: any, context: any, callback: any) => {
  const s3Key = decodeURIComponent(event.Records[0].s3.object.key);
  const underscoreIndex = s3Key.indexOf("_");
  const email = s3Key.substring(0, underscoreIndex);
  const image = s3Key.substring(underscoreIndex + 1);
  try {
    const response = await imagesRepo.addImage(image, email);
    return {
      statusCode: 200,
      body: JSON.stringify({ response: response }),
    };
  } catch (err: any) {
    callback(null, {
      body: JSON.stringify({ "Error Message:": JSON.stringify(err.message) }),
    });
  }
};
