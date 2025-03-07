import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Home from '@/app/page';

describe('Home Page', () => {
  it('renders welcome message', () => {
    render(<Home />);

    expect(screen.getByText(/welcome to the casino/i)).toBeInTheDocument();
  });
});
