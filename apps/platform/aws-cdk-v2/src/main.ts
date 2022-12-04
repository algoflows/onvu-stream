import * as cdk from 'aws-cdk-lib';
import { AppStack } from './stacks/app-stack';
import gitBranch from 'git-branch';
import { CDKContext } from '../types';

// Create Stacks
const createStacks = async () => {
  try {
    const app = new cdk.App();
    const context = await getContext(app);

    const tags: any = {
      Environment: context.environment,
    };

    const stackProps: cdk.StackProps = {
      env: {
        region: context.region,
        account: context.accountNumber,
      },
      stackName: `${context.appName}-${context.environment}`,
      description: `${context.appName} - ${context.environment}`,
      tags,
    };

    new AppStack(
      app,
      `${context.appName}-${context.environment}-stack`,
      stackProps,
      context
    );
  } catch (error) {
    console.error(error);
  }
};

export const getContext = async (app: cdk.App): Promise<CDKContext> => {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (resolve, reject) => {
    try {
      const currentBranch = await gitBranch();
      console.log(`Current branch: ${currentBranch}`);

      const environment = await app.node
        .tryGetContext('environments')
        .find((env: any) => env.branchName === currentBranch);
      console.log(`Environment:`);
      console.log(JSON.stringify(environment, null, 2));

      const globals = await app.node.tryGetContext('globals');
      console.log(`Globals:`);
      console.log(JSON.stringify(globals, null, 2));

      return resolve({ ...globals, ...environment });
    } catch (err) {
      console.error(err);
      throw reject();
    }
  });
};

createStacks();
