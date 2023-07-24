import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import PollListItem from '..';

describe('PollListItem component', () => {
  const mockProps = {
    icon: 'thumb-up',
    imageUrl: 'celebrity.jpg',
    title: 'John Doe',
    description: 'Short description',
    openDuration: '2 days',
    category: 'Entertainment',
    thumbsUpCount: '90%',
    thumbsDownCount: '10%',
    onThumbUpClick: jest.fn(),
    onThumbDownClick: jest.fn(),
    onVoteClick: jest.fn(),
  };

  it('renders all elements correctly', () => {
    render(<PollListItem {...mockProps} />);

    expect(screen.getByText('👍')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Short description')).toBeInTheDocument();
    expect(screen.getByText('Open for: 2 days | Category: Entertainment')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thumb Up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thumb Down' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Vote' })).toBeInTheDocument();
    expect(screen.getByText('90% Thumb Up | 10% Thumb Down')).toBeInTheDocument();
  });

  it('calls the correct event handler when Thumb Up button is clicked', () => {
    render(<PollListItem {...mockProps} />);
    const thumbUpButton = screen.getByRole('button', { name: 'Thumb Up' });
    userEvent.click(thumbUpButton);
    expect(mockProps.onThumbUpClick).toHaveBeenCalledTimes(1);
  });

  it('calls the correct event handler when Thumb Down button is clicked', () => {
    render(<PollListItem {...mockProps} />);
    const thumbDownButton = screen.getByRole('button', { name: 'Thumb Down' });
    userEvent.click(thumbDownButton);
    expect(mockProps.onThumbDownClick).toHaveBeenCalledTimes(1);
  });

  it('calls the correct event handler when Vote button is clicked', () => {
    render(<PollListItem {...mockProps} />);
    const voteButton = screen.getByRole('button', { name: 'Vote' });
    userEvent.click(voteButton);
    expect(mockProps.onVoteClick).toHaveBeenCalledTimes(1);
  });
});
