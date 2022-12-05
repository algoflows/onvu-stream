import { DropzoneS3Uploader } from '@onvu/shared/ui';
import React, { useState, useEffect } from 'react';

/* eslint-disable-next-line */
export interface UploadProps {}

const bucketUrl =
  'https://platform-aws-cdk-v2-dev-video-input-bucket.s3.eu-west-1.amazonaws.com/';

export function Upload(props: UploadProps) {
  const handleChangeStatus = (status: string) => {
    console.log(status);
  };

  const handleMetaData = (metadata: Record<string, string>) => {
    console.log(metadata);
  };
  return (
    <div>
      <DropzoneS3Uploader
        handleMetadata={handleMetaData}
        handleChangeStatus={handleChangeStatus}
        bucketUrl={bucketUrl}
      />
    </div>
  );
}

export default Upload;
