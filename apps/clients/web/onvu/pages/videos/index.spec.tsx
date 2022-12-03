import { render } from '@testing-library/react';

import Videos from './index';

describe('Upload', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Videos />);
    expect(baseElement).toBeTruthy();
  });
});
