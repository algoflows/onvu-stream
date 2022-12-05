import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import type { Handler } from 'aws-lambda';
import { marshall } from '@aws-sdk/util-dynamodb';
import { VideoMeta } from '../../libs/shared/types/src';
import { DynamoDB, PutItemInput } from '@aws-sdk/client-dynamodb';

AWS.config.update({ region: process.env.AWS_REGION || 'eu-west-1' });
const db = new DynamoDB({ region: 'us-east-1' });

export const handler: Handler = async (event, _context): Promise<any> => {
  const { body } = event;
  if (!body) return sendFail('invalid request');

  const {
    id,
    name,
    size,
    type,
    lastModifiedDate,
    uploadedDate,
    duration,
    videoWidth,
    videoHeight,
  } = JSON.parse(body) as VideoMeta;

  const newVideo = {
    id: id || uuidv4(),
    name,
    size,
    type,
    lastModifiedDate,
    uploadedDate,
    duration,
    videoWidth,
    videoHeight,
  };

  const videoParams: PutItemInput = {
    Item: marshall(newVideo),
    TableName: process.env.TODO_TABLE_NAME,
  };

  try {
    const result = await db.putItem(videoParams);
    return sendSuccess(result);
  } catch (error) {
    console.error(error);
    return sendFail(error);
  }
};

function sendSuccess(result) {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ result }),
  };
}

function sendFail(message: string) {
  return {
    statusCode: 400,
    body: JSON.stringify({ message }),
  };
}
