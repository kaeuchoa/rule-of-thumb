import { render, screen, fireEvent } from '@testing-library/react';
import PollCard from '../.';

describe('PollCard', () => {
  it('renders all elements correctly', () => {
    const onThumbUpClickMock = jest.fn();
    const onThumbDownClickMock = jest.fn();

    render(
      <PollCard
        primaryTitle="Sample Title"
        description="Sample Description"
        onThumbUpClick={onThumbUpClickMock}
        onThumbDownClick={onThumbDownClickMock}
      />
    );

    const titleElement = screen.getByText('Sample Title');
    const descriptionElement = screen.getByText('Sample Description');
    const thumbsUpButton = screen.getByLabelText('thumbs up');
    const thumbsDownButton = screen.getByLabelText('thumbs down');

    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
    expect(thumbsUpButton).toBeInTheDocument();
    expect(thumbsDownButton).toBeInTheDocument();
  });

  it('handles "thumbs up" button click', () => {
    const onThumbUpClickMock = jest.fn();
    const onThumbDownClickMock = jest.fn();

    render(
      <PollCard
        primaryTitle="Sample Title"
        description="Sample Description"
        onThumbUpClick={onThumbUpClickMock}
        onThumbDownClick={onThumbDownClickMock}
      />
    );

    const thumbsUpButton = screen.getByLabelText('thumbs up');
    fireEvent.click(thumbsUpButton);

    expect(onThumbUpClickMock).toHaveBeenCalledTimes(1);
  });

  it('handles "thumbs down" button click', () => {
    const onThumbUpClickMock = jest.fn();
    const onThumbDownClickMock = jest.fn();

    render(
      <PollCard
        primaryTitle="Sample Title"
        description="Sample Description"
        onThumbUpClick={onThumbUpClickMock}
        onThumbDownClick={onThumbDownClickMock}
      />
    );

    const thumbsDownButton = screen.getByLabelText('thumbs down');
    fireEvent.click(thumbsDownButton);

    expect(onThumbDownClickMock).toHaveBeenCalledTimes(1);
  });
});
