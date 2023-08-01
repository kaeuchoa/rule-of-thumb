import './App.css';
import Footer from './layout/Footer';
import Main from './layout/main';
import Navbar from '@rule-of-thumb/navbar';
import { CelebrityDataProvider, useCelebrities } from './data/CelebrityService';
import { PollDataProvider } from './data/PollService';
import HeroBanner from './packages/HeroBanner';
import { useNegativeVote, usePositiveVote } from './shared/hooks';
import { Celebrity } from './shared/types';
import PollCard from '@rule-of-thumb/poll-card';

function orderByLastUpdated(items: Celebrity[]): Celebrity[] {
  return items.slice().sort((a, b) => {
    const dateA = new Date(a.lastUpdated).getTime();
    const dateB = new Date(b.lastUpdated).getTime();
    return dateB - dateA; // Sort in descending order (latest first)
  });
}

function App() {
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
    <>
      <Navbar />
      <HeroBanner pictureSrc={firstCelebrity.picture}>
        <PollCard
          primaryTitle={firstCelebrity.name}
          description={firstCelebrity.description}
          onThumbDownClick={() => handleThumbDownVote(firstCelebrity.id)}
          onThumbUpClick={() => handleThumbUpVote(firstCelebrity.id)}
        />
      </HeroBanner>
      <Main />
      <Footer />
    </>
  );
}

export default function AppWithProvider() {
  return (
    <PollDataProvider>
      <CelebrityDataProvider>
        <App />
      </CelebrityDataProvider>
    </PollDataProvider>
  );
}
