import Dropzone from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';

/* eslint-disable-next-line */
export interface DropzoneS3UploaderProps {}

export function DropzoneS3Uploader(props: DropzoneS3UploaderProps) {
  const getUploadParams = ({ meta }: any) => {
    const url = 'https://httpbin.org/post';
    return {
      url,
      meta: { fileUrl: `${url}/${encodeURIComponent(meta.name)}` },
    };
  };

  const handleChangeStatus = ({ meta }: any, status) => {
    console.log(status, meta);
    console.log('META', meta);
  };

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f) => f.meta));
    allFiles.forEach((f) => f.remove());
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      accept="video/*"
      inputContent={(files, extra) =>
        extra.reject ? 'Video files only' : 'Drag Files'
      }
      styles={{
        dropzoneReject: { borderColor: 'red', backgroundColor: '#55fa8c' },
        inputLabel: (files, extra) => (extra.reject ? { color: 'red' } : {}),
      }}
    />
  );
}

export default DropzoneS3Uploader;
