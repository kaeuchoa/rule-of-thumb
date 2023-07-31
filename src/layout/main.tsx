import PollCard from "@rule-of-thumb/poll-card";
import PollsList from '@rule-of-thumb/polls-list';

import { useCelebrities } from '../data/CelebrityService';
import { Celebrity } from '../shared/types';
import { useNegativeVote, usePositiveVote } from '../shared/hooks';

import styles from './styles.module.css';
import CTABanner from './CTABanner';
import SpeakOutBanner from './SpeakOutBanner';

function orderByLastUpdated(items: Celebrity[]): Celebrity[] {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return dateB - dateA; // Sort in descending order (latest first)
  });
}

const Main = () => {
  const { data: celebrities, isLoading } = useCelebrities();
  const { handleThumbUpVote } = usePositiveVote();
  const { handleThumbDownVote } = useNegativeVote();

  if (isLoading) {
    <>loading...</>
  }

  if (!celebrities) {
    return <>no data</>
  }

  const firstCelebrity = orderByLastUpdated(celebrities)[0];
  return (
    <main>
      <section>
        <div>
          placeholder hero carousel
          <PollCard
            primaryTitle={firstCelebrity.name}
            description={firstCelebrity.description}
            onThumbDownClick={() => handleThumbDownVote(firstCelebrity.id)}
            onThumbUpClick={() => handleThumbUpVote(firstCelebrity.id)}
          />
        </div>
        {/* move to component */}
        <div className={styles["hero__closing-gauge"]}>
          <div className={styles["closing-gauge__left"]}>
            <span className={styles["closing-gauge__title"]}>closing in</span>
          </div>
          <div className={styles["closing-gauge__right"]}>
            <span className={styles["closing-gauge__number"]}>22</span>
            <span className={styles["closing-gauge__desc"]}>days</span>
          </div>
        </div>
      </section>
      <section>
        <SpeakOutBanner />
      </section>
      <section>
        <h2>Previous Rulings</h2>
        <PollsList />
      </section>
      <section>
        <CTABanner /> 
      </section>
    </main>
  );
};

export default Main;
