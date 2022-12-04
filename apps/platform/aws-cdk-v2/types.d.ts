export type CDKContext = {
  appName: string;
  region: string;
  environment: string;
  branchName: string;
  accountNumber: string;
  s3Encrypt: boolean;
  ddbPITRecovery: boolean;
};
