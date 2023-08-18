import { render, screen, fireEvent } from '@testing-library/react';
import PollListItem, { ThumbsIcon } from '../.';

describe('PollListItem', () => {
  const props = {
    icon: 'thumb-up' as ThumbsIcon,
    imageUrl: 'thumb-up-image-url',
    title: 'Sample Title',
    description: 'Sample Description',
    openDuration: '2023-08-01T00:00:00Z',
    category: 'Sample Category',
    thumbsUpCount: 10,
    thumbsDownCount: 5,
    onThumbUpClick: jest.fn(),
    onThumbDownClick: jest.fn(),
    onVoteClick: jest.fn(),
  };

  it('renders the component', () => {
    render(<PollListItem {...props} />);
    expect(screen.getByText('Sample Title')).toBeInTheDocument();
  });

  it('handles thumb up click', () => {
    render(<PollListItem {...props} />);
    fireEvent.click(screen.getByLabelText('Select Thumb Up'));
    expect(props.onThumbUpClick).toHaveBeenCalled();
  });

  it('handles thumb down click', () => {
    render(<PollListItem {...props} />);
    fireEvent.click(screen.getByLabelText('Select Thumb Down'));
    expect(props.onThumbDownClick).toHaveBeenCalled();
  });

  it('handles vote click', () => {
    render(<PollListItem {...props} />);
    fireEvent.click(screen.getByText('Vote Now'));
    expect(props.onVoteClick).toHaveBeenCalled();
  });

  it('handles "Vote Now" button click', () => {
    const onVoteClickMock = jest.fn();

    render(<PollListItem {...props} />);

    const voteButton = screen.getByText('Vote Now');
    fireEvent.click(voteButton);

    expect(onVoteClickMock).toHaveBeenCalledTimes(1);


    expect(screen.getByText('Vote Again')).toBeInTheDocument()
  });
});
