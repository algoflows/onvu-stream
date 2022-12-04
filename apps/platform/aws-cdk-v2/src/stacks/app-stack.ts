import { App, CfnOutput, Duration, Stack, StackProps } from 'aws-cdk-lib';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import * as s3 from 'aws-cdk-lib/aws-s3';
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

    const demoBucket = new s3.Bucket(this, 'DemoBucket', {
      bucketName: `${context?.appName}-${context?.environment}-demo-bucket`,
      encryption: context?.s3Encrypt
        ? s3.BucketEncryption.S3_MANAGED
        : s3.BucketEncryption.UNENCRYPTED,
    });

    const demoTable = new dynamodb.Table(this, 'DemoTable', {
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

    // Stack outputs
    new CfnOutput(this, 'hello-handler-arn', {
      value: helloHandler.functionArn,
    });

    new CfnOutput(this, 'demo-bucket-arn', {
      value: demoBucket.bucketArn,
      exportName: `${context?.appName}-${context?.environment}-demo-bucket-arn`,
    });

    new CfnOutput(this, 'demo-table-arn', {
      value: demoTable.tableArn,
      exportName: `${context?.appName}-${context?.environment}-demo-table-arn`,
    });
  }
}
