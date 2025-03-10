import { render, screen } from '@testing-library/react';

import MarketInfo from '../market-info';

const defaultProps = {
  title: 'Canada Market',
  description: 'Hello word in canada',
  flag: '/flags/ca.png',
};

describe('MarketInfo', () => {
  it('renders the title correctly', () => {
    render(<MarketInfo {...defaultProps} />);
    expect(screen.getByText(defaultProps.title)).toBeInTheDocument();
  });

  it('renders the description correctly', () => {
    render(<MarketInfo {...defaultProps} />);
    expect(screen.getByText(defaultProps.description)).toBeInTheDocument();
  });

  it('renders the flag image with correct src and alt text', () => {
    render(<MarketInfo {...defaultProps} />);
    const image = screen.getByRole('img', { name: /market flag/i });

    expect(image).toHaveAttribute('alt', 'Market Flag');
    expect(image.getAttribute('src')).toContain(
      encodeURIComponent(defaultProps.flag)
    );
  });
});
