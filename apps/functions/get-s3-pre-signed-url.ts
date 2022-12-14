import AWS from 'aws-sdk';
import mime from 'mime-types';

AWS.config.update({ region: process.env.AWS_REGION });
const s3 = new AWS.S3();

export const handler = async (event, context): Promise<any> => {
  const uploadURL = await getUploadURL(event, context);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Headers': 'Authorization, *',
      'Access-Control-Allow-Origin': process.env.ALLOWED_ORIGIN,
      'Access-Control-Allow-Methods': 'OPTIONS,GET',
    },
    body: JSON.stringify(uploadURL),
  };
};

const getUploadURL = async function (event, context) {
  const apiRequestId = context.awsRequestId;
  const contentType = 'video/mp4';
  const extension = mime.extension(contentType);
  const s3Key = `${apiRequestId}.${extension}`;

  // Get signed URL from S3
  const s3Params = {
    Bucket: process.env.UPLOAD_BUCKET,
    Key: s3Key,
    Expires: parseInt(process.env.URL_EXPIRATION_SECONDS || '3600'),
    ContentType: contentType,
  };

  const signedUrl = await s3.getSignedUrlPromise('putObject', s3Params);

  return {
    uploadURL: signedUrl,
    key: s3Key,
  };
};
