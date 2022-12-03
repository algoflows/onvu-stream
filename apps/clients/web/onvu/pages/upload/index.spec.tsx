import { render } from '@testing-library/react';

import Upload from './index';

describe('Upload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Upload />);
    expect(baseElement).toBeTruthy();
  });
});
