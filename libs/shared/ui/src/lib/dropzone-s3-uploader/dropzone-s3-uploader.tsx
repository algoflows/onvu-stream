/* eslint-disable */
/* tslint:disable */
// @ts-nocheck

import { useState } from 'react';
import Dropzone from 'react-dropzone-uploader';
import type { VideoMeta } from '@onvu/shared/types';
import { nanoid } from 'nanoid';
import 'react-dropzone-uploader/dist/styles.css';
export interface DropzoneS3UploaderProps {
  bucketUrl: string;
  handleMetadata: (metadata: VideoMeta) => void;
  handleChangeStatus: (status: string) => void;
}

const outputBucketUrl =
  'https://platform-aws-cdk-v2-dev-video-output-bucket.s3.eu-west-1.amazonaws.com/';

export function DropzoneS3Uploader(props: DropzoneS3UploaderProps) {
  const setStatus = useState('idle')[1];
  const getUploadParams = async ({ file, meta }: Record<string, VideoMeta>) => {
    const newId = nanoid();

    const fileS3StorageId = `${newId}.${file.type.split('/')[1]}`;
    const fileStorageUrl = `${props.bucketUrl}${fileS3StorageId}`;
    const outputBucketDir = `${outputBucketUrl}/${newId}`;

    const newMeta: VideoMeta = {
      ...meta,
      id: newId,
      title: file.name,
      fileUrl: fileStorageUrl,
      thumbnailUrl: `${outputBucketDir}/Thumbnail_000000001.jpg`,
      fullFrameUrl: `${outputBucketDir}/FullImage_000000001.jpg`,
      mpdPlaylistUrl: `${outputBucketDir}/${newId}.mpd`,
    };

    return {
      body: file,
      meta: newMeta,
      url: fileStorageUrl,
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
