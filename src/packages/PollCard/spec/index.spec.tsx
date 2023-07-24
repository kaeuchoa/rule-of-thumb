import React from 'react';
import { render, screen } from '@testing-library/react';
import PollCard from '..';


describe('PollCard component', () => {
  it('renders all elements correctly', () => {
    const primaryTitle = 'Celebrity name';
    const description = 'Some description';
    const altText = 'hey this is my alt text';
    const moreInfoLink = 'link/path';

    render(<PollCard imgSrc={""} imgAlt={altText} primaryTitle={primaryTitle} description={description} onThumbDownClick={jest.fn()} onThumbUpClick={jest.fn()} infoLink={moreInfoLink} />)

    expect(screen.getByText("What's your opinion on")).toBeInTheDocument();
    expect(screen.getByText(primaryTitle)).toBeInTheDocument();
    expect(screen.getByText(description)).toBeInTheDocument();
    expect(screen.getByText("What's your veridict?")).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thumb Up' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thumb Down' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'more information' }))
    expect(screen.getByAltText(altText)).toBeInTheDocument();
  });
});
