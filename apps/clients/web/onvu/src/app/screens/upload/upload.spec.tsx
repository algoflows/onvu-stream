import { render } from '@testing-library/react';

import Upload from './upload';

describe('Upload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Upload />);
    expect(baseElement).toBeTruthy();
  });
});
