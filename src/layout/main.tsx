import PollListItem from '@rule-of-thumb/poll-list-item';
import CTABanner from './CTABanner';
import SpeakOutBanner from './SpeakOutBanner';
import { usePolls } from '../data/PollService';
import { useVoteHandler } from '../shared/hooks';
import { VoteType } from '../shared/types';
import LayoutToggle from './LayoutToggle';
import styles from './styles.module.css'

const Main = () => {
  const { data: polls, isLoading } = usePolls();
  const { handleVoteClick, setVote } = useVoteHandler()

  if (isLoading) {
    return <>loading....</>
  }

  if (!polls) {
    return <>no polls found</>
  }
  return (
    <main className={styles['main-container']}>
      <section>
        <SpeakOutBanner />
      </section>
      <section>
        <h2>Previous Rulings</h2>
        <LayoutToggle>
          {polls.map(({ id, celebrity, openingDate, resultIcon }) => (
            <li>
              <PollListItem
                key={id}
                category={celebrity.category}
                description={celebrity.description}
                icon={resultIcon}
                imageUrl={celebrity.picture}
                openDuration={openingDate}
                thumbsDownCount={celebrity.votes.negative}
                thumbsUpCount={celebrity.votes.positive}
                title={celebrity.name}
                onThumbDownClick={() => setVote({ pollId: id, vote: VoteType.negative })}
                onThumbUpClick={() => setVote({ pollId: id, vote: VoteType.positive })}
                onVoteClick={handleVoteClick}
              />
            </li>
          ))}
        </LayoutToggle>
      </section>
      <section>
        <CTABanner />
      </section>
    </main>
  );
};

export default Main;
