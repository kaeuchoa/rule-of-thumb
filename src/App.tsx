import './App.css';
import Footer from './layout/Footer';
import Main from './layout/main';
import Navbar from '@rule-of-thumb/navbar';
import { CelebrityDataProvider } from './data/CelebrityService';
import { PollDataProvider } from './data/PollService';

function App() {
  return (
    <>
      <Navbar />
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
