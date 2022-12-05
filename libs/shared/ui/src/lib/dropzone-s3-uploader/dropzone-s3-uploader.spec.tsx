import { render } from '@testing-library/react';

import DropzoneS3Uploader from './dropzone-s3-uploader';

describe('DropzoneS3Uploader', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DropzoneS3Uploader />);
    expect(baseElement).toBeTruthy();
  });
});
