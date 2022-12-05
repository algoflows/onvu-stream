import { DropzoneS3Uploader } from '@onvu/shared/ui';
import { usePostVideoMeta } from '@onvu/shared/hooks';
import { useState } from 'react';
import { VideoMeta } from '@onvu/shared/types';

/* eslint-disable-next-line */
export interface UploadProps {}

const bucketUrl =
  'https://platform-aws-cdk-v2-dev-video-input-bucket.s3.eu-west-1.amazonaws.com/';
const lamdbaUrl = 'https://api.onvu.app/video';

export function Upload(props: UploadProps) {
  const [status, setStatus] = useState('idle');
  const [metadata, setMetadata] = useState<VideoMeta | null>(null);

  usePostVideoMeta({
    url: lamdbaUrl,
    data: metadata!,
    status,
  });

  const handleChangeStatus = (status: string) => {
    setStatus(status);
  };

  const handleMetaData = (metadata: VideoMeta) => {
    setMetadata(metadata);
  };
  return (
    <div className="flex flex-col">
      <div className="mb-8 font-mono">Status: {status}</div>
      <DropzoneS3Uploader
        handleMetadata={handleMetaData}
        handleChangeStatus={handleChangeStatus}
        bucketUrl={bucketUrl}
      />
    </div>
  );
}

export default Upload;
