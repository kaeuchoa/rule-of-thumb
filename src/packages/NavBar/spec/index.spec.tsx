import { render, screen } from '@testing-library/react';
import Navbar from '..';
import userEvent from '@testing-library/user-event';

describe('Navbar component', () => {
  it('renders logo and menu correctly', () => {
    render(<Navbar />);
    const logoElement = screen.getByText('Logo');
    const trialsLink = screen.getByText('Past Trials');
    const aboutLink = screen.getByText('How it works');
    const loginLink = screen.getByText('Login/Sign up');

    expect(logoElement).toBeInTheDocument();
    expect(trialsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(loginLink).toBeInTheDocument();
  });

  it('hides the menu items on initial render', () => {
    render(<Navbar />);
    const trialsLink = screen.getByText('Past Trials');
    const aboutLink = screen.getByText('How it works');
    const loginLink = screen.getByText('Login/Sign up');

    expect(trialsLink).not.toHaveClass('open');
    expect(aboutLink).not.toHaveClass('open');
    expect(loginLink).not.toHaveClass('open');
  });

  it('toggles the menu items on menu toggle click', () => {
    render(<Navbar />);
    const menuToggle = screen.getByRole('button', { name: 'toggle menu' });
    
    userEvent.click(menuToggle);

    expect(screen.getByRole('menu')).toHaveClass('open');

    userEvent.click(menuToggle);

    expect(screen.getByRole('menu')).not.toHaveClass('open');
  });
});
