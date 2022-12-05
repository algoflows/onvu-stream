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

    const helloHandler = new NodejsFunction(this, 'HelloHandler', {
      runtime: Runtime.NODEJS_16_X,
      entry: join(__dirname, '../../../../functions/hello.ts'),
      memorySize: 1024,
      timeout: Duration.seconds(10),
      bundling: {
        minify: true,
        sourceMap: true,
        target: 'es2020',
      },
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

    // S3 buckets and config
    const videoBucketConfig = {
      autoDeleteObjects: true,
      encryption: context?.s3Encrypt
        ? s3.BucketEncryption.S3_MANAGED
        : s3.BucketEncryption.UNENCRYPTED,
      removalPolicy: RemovalPolicy.DESTROY,
    };

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

    videoInputBucket.grantPublicAccess();
    videoOutputBucket.grantPublicAccess();
    videoThumbnailBucket.grantPublicAccess();

    videoInputBucket.grantReadWrite(helloHandler);
    videoOutputBucket.grantReadWrite(helloHandler);
    videoThumbnailBucket.grantReadWrite(helloHandler);

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

    const videosTable = new dynamodb.Table(this, 'VideosTable', {
      removalPolicy: RemovalPolicy.DESTROY,
      tableName: `${context?.appName}-${context?.environment}-demo-table`,
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      partitionKey: {
        name: 'haskKey',
        type: dynamodb.AttributeType.STRING,
      },
      sortKey: {
        name: 'rangeKey',
        type: dynamodb.AttributeType.STRING,
      },
      pointInTimeRecovery: context?.ddbPITRecovery,
    });

    // Outputs
    new CfnOutput(this, 'hello-handler-arn', {
      value: helloHandler.functionArn,
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
