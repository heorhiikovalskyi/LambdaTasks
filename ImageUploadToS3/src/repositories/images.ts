import { AttributeValue } from "../../opt/nodejs/node16/node_modules/@aws-sdk/client-dynamodb";
import {
  DynamoDBClient,
  UpdateItemCommand,
  UpdateItemCommandOutput,
  GetItemCommand,
  GetItemCommandOutput,
} from "../../opt/nodejs/node16/node_modules/@aws-sdk/client-dynamodb";
import {
  PutCommand,
  DynamoDBDocumentClient,
  PutCommandOutput,
} from "../../opt/nodejs/node16/node_modules/@aws-sdk/lib-dynamodb";

const { TABLE, REGION } = process.env;

const client = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(client);

export class ImagesRepo {
  private constructor() {}
  private static instance: ImagesRepo;
  public static getInstance(): ImagesRepo {
    if (!ImagesRepo.instance) {
      ImagesRepo.instance = new ImagesRepo();
    }
    return ImagesRepo.instance;
  }

  addUser = async (email: string): Promise<PutCommandOutput> => {
    const toInsert = { email, images: [] };
    const input = { TableName: TABLE, Item: toInsert };
    const command = new PutCommand(input);
    return await docClient.send(command);
  };

  addImage = async (image: string, email: string): Promise<UpdateItemCommandOutput> => {
    const input = {
      TableName: TABLE,
      Key: { email: { S: email } },
      UpdateExpression: "SET images = list_append(if_not_exists(images, :empty_list), :image)",
      ExpressionAttributeValues: {
        ":empty_list": { L: [] },
        ":image": { L: [{ S: image }] },
      },
    };
    const command = new UpdateItemCommand(input);
    return await docClient.send(command);
  };

  overwriteImages = async (images: string[], email: string): Promise<UpdateItemCommandOutput> => {
    const imagesToInsert = { L: images.map((image) => ({ S: image })) };
    const input = {
      TableName: TABLE,
      Key: { email: { S: email } },
      UpdateExpression: "SET images = :newImages",
      ExpressionAttributeValues: {
        ":newImages": imagesToInsert,
      },
    };
    const command = new UpdateItemCommand(input);
    return await docClient.send(command);
  };

  deleteImage = async (image: string, email: string): Promise<void> => {
    try {
      const images = await this.getImages(email);
      const imageIndex = images.indexOf(image);
      if (imageIndex !== -1) {
        images.splice(imageIndex, 1);
        await this.overwriteImages(images, email);
      }
    } catch (err) {
      throw err;
    }
  };

  getImages = async (email: string): Promise<string[]> => {
    const input = {
      TableName: TABLE,
      Key: {
        email: { S: email },
      },
      ProjectionExpression: "images",
    };
    const command = new GetItemCommand(input);
    const response = await docClient.send(command);
    const images = response.Item!.images.L!.map((element) => element.S) as string[];
    return images;
  };
}
