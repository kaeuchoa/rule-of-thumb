import PollCard from "@rule-of-thumb/poll-card";
import PollsList from '@rule-of-thumb/polls-list';

import { useCelebrities } from '../data/CelebrityService';
import { Celebrity } from '../shared/types';
import { useNegativeVote, usePositiveVote } from '../shared/hooks';

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
        <div>placeholder countdown</div>
      </section>
      <section>
        <div>banner placeholder</div>
      </section>
      <section>
        <h2>Previous Rulings</h2>
        <PollsList />
      </section>
      <section>
        <div>CTA with button</div>
      </section>
    </main>
  );
};

export default Main;
