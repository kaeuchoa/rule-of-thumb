import PollsList from '@rule-of-thumb/polls-list';

import styles from './styles.module.css';
import CTABanner from './CTABanner';
import SpeakOutBanner from './SpeakOutBanner';

const Main = () => {
  return (
    <main>
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
