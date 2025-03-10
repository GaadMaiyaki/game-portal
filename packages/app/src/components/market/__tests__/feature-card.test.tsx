import { render, screen } from '@testing-library/react';

import FeatureCard from '../feature-card';

const defaultProps = {
  textColor: 'text-blue-500',
  borderColor: 'border-blue-500',
  icon: '%%',
  text: 'Casino A Feature',
};

describe('FeatureCard', () => {
  it('renders correctly with given props', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
    expect(screen.getByText(defaultProps.icon)).toBeInTheDocument();
  });

  it('displays the correct icon', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.icon)).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<FeatureCard {...defaultProps} />);

    expect(screen.getByText(defaultProps.text)).toBeInTheDocument();
  });

  it('applies the correct text color', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    expect(container.firstChild).toHaveClass('text-blue-500');
  });

  it('applies the correct border color', () => {
    const { container } = render(<FeatureCard {...defaultProps} />);

    expect(container.firstChild).toHaveClass(defaultProps.borderColor);
  });
});
