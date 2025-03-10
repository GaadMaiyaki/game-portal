import { render, screen } from '@testing-library/react';

import FeatureList from '../feature-list';

const defaultProps = {
  newUserBonus: true,
  earlyAccess: false,
  premiumSupport: true,
};

describe('FeatureList', () => {
  it('renders New User Bonus card when enabled', () => {
    render(<FeatureList features={{ ...defaultProps, newUserBonus: true }} />);
    expect(screen.getByText('New User Bonus Enabled!')).toBeInTheDocument();
  });

  it('does not render New User Bonus card when disabled', () => {
    render(<FeatureList features={{ ...defaultProps, newUserBonus: false }} />);
    expect(
      screen.queryByText('New User Bonus Enabled!')
    ).not.toBeInTheDocument();
  });

  it('renders Early Access card when enabled', () => {
    render(<FeatureList features={{ ...defaultProps, earlyAccess: true }} />);
    expect(screen.getByText('Early Access Available!')).toBeInTheDocument();
  });

  it('does not render Early Access card when disabled', () => {
    render(<FeatureList features={{ ...defaultProps, earlyAccess: false }} />);
    expect(
      screen.queryByText('Early Access Available!')
    ).not.toBeInTheDocument();
  });

  it('renders Premium Support card when enabled', () => {
    render(
      <FeatureList features={{ ...defaultProps, premiumSupport: true }} />
    );
    expect(screen.getByText('Premium Customer Support!')).toBeInTheDocument();
    expect(screen.getByText('🛠️')).toBeInTheDocument();
  });

  it('renders Standard Support card when Premium Support is disabled', () => {
    render(
      <FeatureList features={{ ...defaultProps, premiumSupport: false }} />
    );
    expect(screen.getByText('Standard Support')).toBeInTheDocument();
    expect(screen.getByText('⚠️')).toBeInTheDocument();
  });
});
