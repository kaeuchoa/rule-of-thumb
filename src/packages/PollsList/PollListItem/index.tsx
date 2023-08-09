// PollListItem.tsx
import React from 'react';
import styles from './css/styles.module.css';
import thumbUp from './assets/imgs/thumbs-up.svg';
import thumbDown from './assets/imgs/thumbs-down.svg';
import classNames from 'classnames';

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
    <div className={styles["poll-list-item"]}>
      <img src={imageUrl} alt="" aria-hidden="true" />
      <div className={styles['content']}>
        <div className={styles["header"]}>
          <ResultIcon icon={icon} />
          <h1>{title}</h1>
        </div>
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
    </div>
  );
};

const ResultIcon = ({ icon }: { icon: ThumbsIcon }) => {
  const isThumbUp = icon === 'thumb-up';
  return (
    <span className={classNames({
      [styles['result-icon']]: true,
      [styles['result-icon--positive']]: isThumbUp,
      [styles['result-icon--negative']]: !isThumbUp,
    })}>
      <img src={isThumbUp ? thumbUp : thumbDown} alt={isThumbUp ? 'thumbs up' : 'thumbs down'} />
    </span>
  )
}

export default PollListItem;
