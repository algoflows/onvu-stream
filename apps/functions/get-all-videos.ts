import AWS from 'aws-sdk';
import type { Handler } from 'aws-lambda';
import { DynamoDB, ScanCommand } from '@aws-sdk/client-dynamodb';

AWS.config.update({ region: process.env.AWS_REGION || 'eu-west-1' });
const db = new DynamoDB({ region: process.env.AWS_REGION || 'eu-west-1' });

export const handler: Handler = async (_event, _context): Promise<any> => {
  console.log('[Save video metadata lambda started]');

  const params = { TableName: process.env.VIDEO_TABLE_NAME };
  console.log('[Dynamodb save params]', params);

  try {
    console.log('[Dynamodb scan started]');
    const result = await db.send(new ScanCommand(params));
    console.log('[Dynamodb scan result & count]', result, result.Count);
    if (result.Items && result.Items.length > 0) {
      result.Items.forEach((item) => {
        console.log('[Dynamodb scan result item]', item);
      });
    }

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
    body: JSON.stringify(result),
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
