import PollListItem from '@rule-of-thumb/poll-list-item';
import Flickity from 'react-flickity-component'
import { useMediaQuery } from 'react-responsive'
import CTABanner from './CTABanner';
import SpeakOutBanner from './SpeakOutBanner';
import { usePolls } from '../data/PollService';
import { useVoteHandler, useVotedPolls } from '../shared/hooks';
import { VoteType } from '../shared/types';
import LayoutToggle from './LayoutToggle';
import styles from './styles.module.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
  const { data: polls, isLoading } = usePolls();
  const notifySuccess = () => toast("Thank you for your vote!");
  const notifyError = () => toast("Something wrong! Try again");
  const { handleVoteClick, setVote } = useVoteHandler(notifySuccess, notifyError);
  const { hasVotedOnPoll } = useVotedPolls();
  const isMobile = useMediaQuery({ query: '(max-width: 767px)' })

  if (isLoading) {
    return <>loading....</>
  }

  if (!polls) {
    return <>no polls found</>
  }
  return (
    <main className={styles['main-container']}>
      <ToastContainer />
      <section>
        <SpeakOutBanner />
      </section>
      <section>
        <h2>Previous Rulings</h2>
        {isMobile && (
          <Flickity
            elementType={'div'}
            options={{
              prevNextButtons: false
            }}
            disableImagesLoaded={false}
            reloadOnUpdate
            static
          >
            {polls.map(({ id, celebrity, openingDate, resultIcon }) => (
              <li style={{ marginRight: '10px' }}>
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
                  isMobileView={true}
                  hasVotedOnPoll={hasVotedOnPoll(id)}
                />
              </li>
            ))}
          </Flickity>
        )}
        {!isMobile && (
          <LayoutToggle>
            {layout => polls.map(({ id, celebrity, openingDate, resultIcon }) => (
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
                  isMobileView={layout === 'grid'}
                  hasVotedOnPoll={hasVotedOnPoll(id)}
                />
              </li>
            ))}
          </LayoutToggle>
        )}
      </section>
      <section>
        <CTABanner />
      </section>
    </main>
  );
};

export default Main;
