// PollListItem.tsx

import React from 'react';

export type ThumbsIcon = 'thumb-up' | 'thumb-down';
interface PollListItemProps {
  icon: ThumbsIcon;
  imageUrl: string;
  title: string;
  description: string;
  openDuration: string;
  category: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
  onThumbUpClick: () => void;
  onThumbDownClick: () => void;
  onVoteClick: () => void;
}

const PollListItem: React.FC<PollListItemProps> = ({
  icon,
  imageUrl,
  title,
  description,
  openDuration,
  category,
  thumbsUpCount,
  thumbsDownCount,
  onThumbUpClick,
  onThumbDownClick,
  onVoteClick,
}) => {
  return (
    <div className="poll-list-item">
      <div className="icon">{icon === 'thumb-up' ? '👍' : '👎'}</div>
      <img src={imageUrl} alt="" aria-hidden="true" />
      <h1>{title}</h1>
      <p className="short-description">{description}</p>
      <p>{`Open for: ${openDuration} | Category: ${category}`}</p>
      <div className="voting-buttons">
        <button className="thumb-up-button" onClick={onThumbUpClick}>
          Thumb Up
        </button>
        <button className="thumb-down-button" onClick={onThumbDownClick}>
          Thumb Down
        </button>
      </div>
      <button className="vote-button" onClick={onVoteClick}>
        Vote
      </button>
      <div className="result-bar" >
        <div className="result-thumb-up" style={{ width: `${(thumbsUpCount / (thumbsUpCount + thumbsDownCount)) * 100}%` }} />
        <div className="result-thumb-down" style={{ width: `${(thumbsDownCount / (thumbsUpCount + thumbsDownCount)) * 100}%` }} />
      </div>
      <p className="result-count">{`${thumbsUpCount}% Thumb Up | ${thumbsDownCount}% Thumb Down`}</p>
    </div>
  );
};

export default PollListItem;
