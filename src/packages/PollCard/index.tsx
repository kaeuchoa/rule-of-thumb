import React from 'react';

interface PollCardProps {
  primaryTitle: string;
  description: string;
  infoLink: string;
  imgSrc: string;
  imgAlt: string
  onThumbUpClick: () => void;
  onThumbDownClick: () => void;
}

const PollCard: React.FC<PollCardProps> = ({ primaryTitle, description, infoLink, imgSrc, imgAlt, onThumbUpClick, onThumbDownClick }) => {
  return (
    <div className="poll-card">
      <h2>What's your opinion on</h2>
      <h1>{primaryTitle}</h1>
      <p>{description}</p>
      <span>
        <span aria-hidden={true}>wiki icon</span>
        <a href={infoLink}>more information</a>
      </span>
      <p>What's your veridict?</p>
      <img src={imgSrc} alt={imgAlt} />
      <button className="thumb-up-button" onClick={onThumbUpClick}>
        <span aria-hidden={true}>thumb up icon</span>
        Thumb Up
      </button>
      <button className="thumb-down-button" onClick={onThumbDownClick}>
        <span aria-hidden={true}>thumb down icon</span>
        Thumb Down
      </button>
    </div >
  );
};

export default PollCard;
