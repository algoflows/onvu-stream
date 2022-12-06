import {
  App,
  CfnOutput,
  Duration,
  Stack,
  StackProps,
  RemovalPolicy,
} from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as logs from 'aws-cdk-lib/aws-logs';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { join } from 'path';
import { CDKContext } from '../../types';

export class AppStack extends Stack {
  constructor(
    scope: App,
    id: string,
    props?: StackProps,
    context?: CDKContext
  ) {
    super(scope, id, props);

    // lambda function base config
    const lambdaConfig = {
      runtime: Runtime.NODEJS_16_X,
      tracing: lambda.Tracing.ACTIVE,
      logRetention: logs.RetentionDays.ONE_WEEK,
      timeout: Duration.seconds(10),
      memorySize: 256,
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2020',
      },
    };

    // S3 buckets base config
    const videoBucketConfig = {
      autoDeleteObjects: true,
      encryption: context?.s3Encrypt
        ? s3.BucketEncryption.S3_MANAGED
        : s3.BucketEncryption.UNENCRYPTED,
      removalPolicy: RemovalPolicy.DESTROY,
    };

    const videosTable = new dynamodb.Table(this, 'VideosTable', {
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: `${context?.appName}-${context?.environment}-videos-table`,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'PK',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'SK',
        type: dynamodb.AttributeType.STRING,
      },
      pointInTimeRecovery: context?.ddbPITRecovery,
    });

    // Lambda api endpoints
    const saveVideoMetadata = new NodejsFunction(this, 'SaveVideoMetadata', {
      ...lambdaConfig,
      environment: {
        VIDEO_TABLE_NAME: videosTable.tableName,
        ALLOWED_ORIGIN: '*',
      },
      entry: join(__dirname, '../../../../functions/save-video-metadata.ts'),
    });

    const getAllVideos = new NodejsFunction(this, 'get-all-videos.ts', {
      ...lambdaConfig,
      environment: {
        VIDEO_TABLE_NAME: videosTable.tableName,
        ALLOWED_ORIGIN: '*',
      },
      entry: join(__dirname, '../../../../functions/get-all-videos.ts'),
    });

    // create video transcoding sns topic
    const videoTranscodingTopic = new sns.Topic(this, 'VideoTranscodingTopic', {
      topicName: 'video-transcoding',
    });

    new sns.Subscription(this, 'VideoTranscodingTopicEmailSubscription', {
      // create email subscription for video transcoding topic
      // https://tempmail.email/
      endpoint: 'onvu@gotgel.org',
      protocol: sns.SubscriptionProtocol.EMAIL,
      topic: videoTranscodingTopic,
    });

    const videoInputBucket = new s3.Bucket(this, 'VideoInputBucket', {
      ...videoBucketConfig,
      bucketName: `${context?.appName}-${context?.environment}-video-input-bucket`,
    });

    const videoOutputBucket = new s3.Bucket(this, 'VideoOutputBucket', {
      ...videoBucketConfig,
      bucketName: `${context?.appName}-${context?.environment}-video-output-bucket`,
    });

    const videoThumbnailBucket = new s3.Bucket(this, 'VideoThumbnailBucket', {
      ...videoBucketConfig,
      bucketName: `${context?.appName}-${context?.environment}-video-thumbnail-bucket`,
    });

    const getS3SignedUrlLambda = new NodejsFunction(
      this,
      'GetS3SignedUrlLambda',
      {
        ...lambdaConfig,
        entry: join(
          __dirname,
          '../../../../functions/get-s3-pre-signed-url.ts'
        ),
        description:
          'Function that creates a presigned URL to upload a file into S3',
        environment: {
          UPLOAD_BUCKET: videoInputBucket.bucketName,
          URL_EXPIRATION_SECONDS: (3 * 60 * 60).toString(), // 3 hours
          ALLOWED_ORIGIN: '*',
        },
      }
    );

    // create lambda url
    const preSignedS3Url = getS3SignedUrlLambda.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const saveVideoMetadataUrl = saveVideoMetadata.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    const getAllVideosUrl = getAllVideos.addFunctionUrl({
      authType: lambda.FunctionUrlAuthType.NONE,
    });

    videoInputBucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        principals: [new iam.StarPrincipal()],
        actions: ['s3:Put*', 's3:Get*', 's3:List*'],
        resources: [`${videoInputBucket.bucketArn}/*`],
      })
    );

    // videoInputBucket.policy?.document.addStatements(
    //   new iam.PolicyStatement({
    //     effect: iam.Effect.ALLOW,
    //     principals: [new iam.StarPrincipal()],
    //     actions: ['s3:PutObject', 's3:GetObject'],
    //     resources: [videoInputBucket.bucketArn],
    //   })
    // );

    // grant dynamodb permissions to lambda
    videosTable.grantReadWriteData(saveVideoMetadata);
    videosTable.grantReadData(getAllVideos);

    // videoInputBucket.grantPut(getS3SignedUrlLambda);
    videoInputBucket.grantPublicAccess();
    videoOutputBucket.grantPublicAccess();
    videoThumbnailBucket.grantPublicAccess();

    // s3 bucket cors configuration
    videoInputBucket.addCorsRule({
      allowedOrigins: ['*'],
      allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
      allowedHeaders: ['*'],
    });

    videoOutputBucket.addCorsRule({
      allowedOrigins: ['*'],
      allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
      allowedHeaders: ['*'],
    });

    videoThumbnailBucket.addCorsRule({
      allowedOrigins: ['*'],
      allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
      allowedHeaders: ['*'],
    });

    // Outputs
    new CfnOutput(this, 'save-video-metadata--arn', {
      value: saveVideoMetadata.functionArn,
    });

    new CfnOutput(this, 'get-all-videos-arn', {
      value: getAllVideos.functionArn,
    });

    new CfnOutput(this, 'get-s3-signed-url-lambda-arn', {
      value: getS3SignedUrlLambda.functionArn,
    });

    new CfnOutput(this, 'signed-s3-url', {
      value: preSignedS3Url.url,
    });

    new CfnOutput(this, 'get-all-videos-url', {
      value: getAllVideosUrl.url,
    });

    new CfnOutput(this, 'save-video-metadata-url', {
      value: saveVideoMetadataUrl.url,
    });

    new CfnOutput(this, 'video-transcoding-topic-arn', {
      value: videoTranscodingTopic.topicArn,
      exportName: `${context?.appName}-${context?.environment}-video-transcoding-topic-arn`,
    });

    new CfnOutput(this, 'VideoInputBucket-arn', {
      value: videoInputBucket.bucketArn,
      exportName: `${context?.appName}-${context?.environment}-video-input-bucket-name`,
    });

    new CfnOutput(this, 'VideoOutputBucket-arn', {
      value: videoOutputBucket.bucketArn,
      exportName: `${context?.appName}-${context?.environment}-video-output-bucket-arn`,
    });

    new CfnOutput(this, 'VideoThumbnailBucket-arn', {
      value: videoThumbnailBucket.bucketArn,
      exportName: `${context?.appName}-${context?.environment}-video-thumbnail-bucket-arn`,
    });

    new CfnOutput(this, 'demo-table-arn', {
      value: videosTable.tableArn,
      exportName: `${context?.appName}-${context?.environment}-demo-table-arn`,
    });
  }
}
