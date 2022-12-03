import { render } from '@testing-library/react';

import CardPlayer from './card-player';

describe('CardPlayer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <CardPlayer cardTitle={'Awesome video card'} />
    );
    expect(baseElement).toBeTruthy();
  });

  it('should fail to render if no props are passed', () => {
    const { baseElement } = render(<CardPlayer cardTitle="" />);
    expect(baseElement).toBeTruthy();
  });
});
