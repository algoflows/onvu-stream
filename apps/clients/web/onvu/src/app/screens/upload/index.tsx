import { DropzoneS3Uploader } from '@onvu/shared/ui';

/* eslint-disable-next-line */
export interface UploadProps {}

export function Upload(props: UploadProps) {
  return (
    <div>
      <DropzoneS3Uploader />
    </div>
  );
}

export default Upload;
