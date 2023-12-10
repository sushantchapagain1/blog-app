import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '../components/Navbar';

test('shows profile navigation when there is a user', () => {
  // Mock the user being logged in
  jest.mock('../Context/AuthContext', () => ({
    useAuth: () => ({ user: { name: 'Test User' } }),
  }));

  render(<Navbar />);

  // Check for the user's name and profile navigation
  const userName = screen.getByText('Test User');
  const profileNavigation = screen.getByText('My Blogs');
  const logoutButton = screen.getByText('logout');
  const writeReviewButton = screen.getByText('Write');

  expect(userName).toBeInTheDocument();
  expect(profileNavigation).toBeInTheDocument();
  expect(logoutButton).toBeInTheDocument();
  expect(writeReviewButton).toBeInTheDocument();
});

test('hides profile navigation when mouse leaves', () => {
  jest.mock('../Context/AuthContext', () => ({
    useAuth: () => ({ user: { name: 'Test User' } }),
  }));

  render(<Navbar />);

  const profileButton = screen.getByText('Test User');
  const profileNavigation = screen.getByText('My Blogs');

  fireEvent.mouseEnter(profileButton);
  expect(profileNavigation).toBeInTheDocument();

  fireEvent.mouseLeave(profileButton);
  expect(profileNavigation).not.toBeInTheDocument();
});
