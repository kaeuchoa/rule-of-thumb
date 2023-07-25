import PollCard from "../packages/PollCard";
import PollListItem from "../packages/PollListItem";

const Main = () => {
  return (
    <main>
      <section>
        <div>
          placeholder hero carousel
          <PollCard
            primaryTitle="title"
            description="lorem impsum"
            imgAlt="alt"
            imgSrc="src"
            infoLink="wikipedia"
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
          <li>
            <PollListItem
              category="category"
              description="description"
              icon="thumb-up"
              imageUrl="img/path"
              openDuration='22'
              thumbsDownCount={20}
              thumbsUpCount={25}
              title='name'
              onThumbDownClick={() => console.log('thumb down')}
              onThumbUpClick={() => console.log('thumb up')}
              onVoteClick={() => console.log('on vote')}
            />
          </li>
        </ul>
      </section>
      <section>
        <div>CTA with button</div>
      </section>
    </main>
  );
};

export default Main;
