import React, { useState, useEffect } from 'react';
import Dropzone from 'react-dropzone-uploader';

import 'react-dropzone-uploader/dist/styles.css';

/* eslint-disable-next-line */
export interface DropzoneS3UploaderProps {
  bucketUrl: string;
  handleMetadata: (metadata: Record<string, string>) => void;
  handleChangeStatus: (status: string) => void;
}

export function DropzoneS3Uploader(props: DropzoneS3UploaderProps) {
  const setStatus = useState('idle')[1];
  const getUploadParams = async ({
    file,
    meta: { name },
  }: Record<any, any>) => {
    return {
      body: file,
      meta: { fileUrl: '/' },
      url: props.bucketUrl + name,
      method: 'put',
    };
  };

  const handleChangeStatus = ({ meta }: any, status: string) => {
    props.handleChangeStatus(status);
    setStatus(status);
  };

  const handleSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
  };

  return (
    <Dropzone
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      getUploadParams={getUploadParams}
      onChangeStatus={handleChangeStatus}
      onSubmit={handleSubmit}
      autoUpload={true}
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
