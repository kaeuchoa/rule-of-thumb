import './App.css';
import Footer from './layout/Footer';
import Main from './layout/main';
import Navbar from '@rule-of-thumb/navbar';
import { CelebrityDataProvider } from './data/CelebrityService';

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
    <CelebrityDataProvider>
      <App />
    </CelebrityDataProvider>
  );
}
