import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';

const queryClient = new QueryClient();

interface Celebrity {
  id: number;
  name: string;
  description: string;
  category: string;
  picture: string;
  lastUpdated: string;
  votes: {
    positive: number;
    negative: number;
  };
}

type GetCelebrityResponse = {
  data: Celebrity[]
}

class CelebrityService {
  async fetchCelebrities() {
    const { data, status } = await axios.get<GetCelebrityResponse>('http://localhost:4000/data');
    console.info(JSON.stringify(data, null, 4));
    console.info('response status is:', status);
    return data.data;
  }
}

export function CelebrityDataProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function useCelebrities() {
  return useQuery('celebrities', () => new CelebrityService().fetchCelebrities());
}
