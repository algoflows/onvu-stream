/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import React, { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import type { VideoMeta } from '@onvu/shared/types';

import 'react-dropzone-uploader/dist/styles.css';

/* eslint-disable-next-line */
export interface DropzoneS3UploaderProps {
  bucketUrl: string;
  handleMetadata: (metadata: VideoMeta) => void;
  handleChangeStatus: (status: string) => void;
}

export function DropzoneS3Uploader(props: DropzoneS3UploaderProps) {
  const setStatus = useState('idle')[1];
  const getUploadParams = async ({
    file,
    meta: { name },
  }: Record<string, VideoMeta>) => {
    return {
      body: file,
      meta: { fileUrl: '/' },
      url: props.bucketUrl + name,
      method: 'put',
    };
  };

  const onChanges = (meta: VideoMeta, status: string) => {
    props.handleChangeStatus(status);
    props.handleMetadata(meta);
    setStatus(status);
  };

  const onSubmit = (files: any, allFiles: any) => {
    console.log(files.map((f: any) => f.meta));
  };

  return (
    <Dropzone
      getUploadParams={getUploadParams}
      onChangeStatus={onChanges}
      onSubmit={onSubmit}
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
