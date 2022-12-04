import type {
  APIGatewayProxyEventV2,
  APIGatewayProxyResultV2,
} from 'aws-lambda';

type Handler = (
  event: APIGatewayProxyEventV2,
  context: any
) => Promise<APIGatewayProxyResultV2>;

export const handler: Handler = async (event, _context) => {
  console.log('event: ', event);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'Hello from Lambda!',
      event,
    }),
  };
};
