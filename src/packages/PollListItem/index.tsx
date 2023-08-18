import React, { useState } from 'react';
import styles from './css/styles.module.css';
import thumbUp from './assets/imgs/thumbs-up.svg';
import thumbDown from './assets/imgs/thumbs-down.svg';
import classNames from 'classnames';
import { getPercentage } from './shared/getPercentage';
import { ellipsizeText } from './shared/ellipsizeText';
import { getTimeDiff } from './shared/getTimeDiff';
import { formatTimePeriod } from './shared/formatTimePeriod';

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
  isMobileView?: boolean
  hasVotedOnPoll?: boolean
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
  isMobileView = false,
  hasVotedOnPoll = false
}) => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [voteBtnText, setVoteBtnText] = useState<string>(!hasVotedOnPoll ? 'Vote Now' : 'Vote Again');

  const totalVotes = thumbsUpCount + thumbsDownCount;
  const positivePercentage = getPercentage(thumbsUpCount, totalVotes);
  const negativePercentage = getPercentage(thumbsDownCount, totalVotes);
  const timePeriod = formatTimePeriod(getTimeDiff(new Date(openDuration)));

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
    if (event.target.value === 'positive') {
      onThumbUpClick();
    } else {
      onThumbDownClick();
    }
  };

  function onClickHandler(): void {
    onVoteClick();
    setVoteBtnText('Vote Again');
  }

  return (
    <div className={classNames(
      {
        [styles["poll-list-item"]]: true,
        [styles["poll-list-item--list"]]: !isMobileView
      }
    )}>
      <img src={imageUrl} alt="" aria-hidden="true" />
      <div className={classNames({ [styles["gradient-overlay"]]: !isMobileView })} />
      <div className={classNames({
        [styles['content-container']]: true,
        [styles['content-container--list']]: !isMobileView
      })}>
        <div>
          <ResultIcon icon={icon} />
        </div>
        <div className={classNames({
          [styles['header']]: true,
          [styles['header-area']]: true,
          [styles['header-area--list']]: !isMobileView
        })}>
          <h1>{title}</h1>
          <p>{ellipsizeText(description, 70)}</p>
        </div>
        <div className={classNames({
          [styles['duration-area']]: true,
          [styles['duration-area--list']]: !isMobileView,
        })}>
          <p>{`${timePeriod} ago in ${category}`}</p>
        </div>
        <div className={classNames({
          [styles['voting-area']]: true,
          [styles['voting-area--list']]: !isMobileView,
        })}>
          <div className={classNames(
            {
              [styles['radio-container']]: true,
              [styles['radio-container--positive']]: true,
              [styles['radio-container--selected']]: selectedOption === 'positive'
            }
          )}>
            <label htmlFor="positive-vote">
              Select Thumb Up
            </label>
            <img src={thumbUp} alt="" aria-hidden="true" />
            <input type="radio" name="voting" value='positive' id='positive-vote' onChange={(event) => handleOptionChange(event)} />
          </div>
          <div className={classNames(
            {
              [styles['radio-container']]: true,
              [styles['radio-container--negative']]: true,
              [styles['radio-container--selected']]: selectedOption === 'negative'
            }
          )}>
            <label htmlFor="negative-vote">
              Select Thumb Down
            </label>
            <img src={thumbDown} alt="" aria-hidden="true" />
            <input type="radio" name="voting" value='negative' id='negative-vote' onChange={(event) => handleOptionChange(event)} />
          </div>
          <button className={styles['vote-button']} disabled={selectedOption === ''} onClick={onClickHandler}>
            {voteBtnText}
          </button>

        </div>
        <div className={styles['result-bar-area']}>
          <div className={styles['scale-bar']}>
            <div className={styles['scale-bar--positive']} style={{ width: `${positivePercentage}%` }}>
              <img src={thumbUp} alt="" aria-hidden="true" />
              <span>{`${positivePercentage}%`}</span>
            </div>
            <div className={styles['scale-bar--negative']} style={{ width: `${negativePercentage}%` }}>
              <span>{`${negativePercentage}%`}</span>
              <img src={thumbDown} alt="" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </div >
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
