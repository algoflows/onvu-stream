import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
import type { Handler } from 'aws-lambda';
import { marshall } from '@aws-sdk/util-dynamodb';
import { VideoMeta } from '../../libs/shared/types/src';
import { DynamoDB, PutItemInput } from '@aws-sdk/client-dynamodb';

AWS.config.update({ region: process.env.AWS_REGION || 'eu-west-1' });
const db = new DynamoDB({ region: process.env.AWS_REGION || 'eu-west-1' });

export const handler: Handler = async (event, _context): Promise<any> => {
  console.log('[Save video metadata lambda started]');
  if (!event.body) return sendFail('invalid request');
  const { meta } = JSON.parse(event.body) as { meta: VideoMeta };

  console.log('[Video metadata payload]', meta);

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
  } = meta;

  // setup params for dynamodb
  const now = new Date().toISOString();
  const uid = id || uuidv4();
  const PK = `VIDEO#${uid}`;
  const SK = `VIDEO#${uid}#UPLOADEDDATE#${now}#DURATION#${duration}`;

  const newVideo = {
    PK,
    SK,
    id: uid,
    name,
    size,
    type,
    lastModifiedDate,
    uploadedDate,
    duration,
    videoWidth,
    videoHeight,
  };

  const params: PutItemInput = {
    Item: marshall(newVideo),
    TableName: process.env.VIDEO_TABLE_NAME,
    ReturnValues: 'ALL_OLD',
  };
  console.log('[Dynamodb save params]', params);

  try {
    console.log('[Dynamodb save started]');
    const result = await db.putItem(params);
    console.log('[Dynamodb save result]', result);

    return sendSuccess(result);
  } catch (error) {
    console.error(error);
    return sendFail(error.message);
  }
};

function sendSuccess(result) {
  console.log('[Dynamodb save success]', result);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization, *',
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({ result }),
  };
}

function sendFail(message: string) {
  return {
    statusCode: 400,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization, *',
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN || '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET',
    },
    body: JSON.stringify({ message }),
  };
}
