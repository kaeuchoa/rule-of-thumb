import PollCard from "../packages/PollCard";
import PollListItem from "../packages/PollListItem";
import { Celebrity, useCelebrities } from '../data/CelebrityService';

function orderByLastUpdated(items: Celebrity[]): Celebrity[] {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return dateB - dateA; // Sort in descending order (latest first)
  });
}

const Main = () => {

  const { data: celebrities, isLoading } = useCelebrities();

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
            imgAlt="alt"
            imgSrc={firstCelebrity.picture}
            infoLink="/"
            onThumbDownClick={() => console.log("thumb down")}
            onThumbUpClick={() => console.log("thumb up")}
          />
        </div>
        <div>placeholder countdown</div>
      </section>
      <section>
        <div>banner placeholder</div>
      </section>
      <section>
        <h2>Previous Rulings</h2>
        <ul>
          {celebrities.map(({ id, category, description, votes, picture, name }) => (
            <li>
              <PollListItem
                key={id}
                category={category}
                description={description}
                icon={votes.positive > votes.negative ? 'thumb-up' : 'thumb-down'}
                imageUrl={picture}
                openDuration='22'
                thumbsDownCount={votes.negative}
                thumbsUpCount={votes.positive}
                title={name}
                onThumbDownClick={() => console.log('thumb down')}
                onThumbUpClick={() => console.log('thumb up')}
                onVoteClick={() => console.log('on vote')}
              />
            </li>
          ))}
        </ul>
      </section>
      <section>
        <div>CTA with button</div>
      </section>
    </main>
  );
};

export default Main;
