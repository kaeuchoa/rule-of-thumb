import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosError } from 'axios';

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

class CelebrityService {
  async fetchCelebrities(): Promise<Celebrity[]> {
    try {
      const response = await axios.get('http://localhost:4000/data');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Request failed with status ${axiosError.response?.status}: ${axiosError.message}`);
      }

      throw new Error('An unexpected error occurred while fetching data.');
    }
  }
}

export function CelebrityDataProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function useCelebrities() {
  const service = new CelebrityService();
  return useQuery({
    queryKey: 'celebrities',
    queryFn: () => service.fetchCelebrities(),
  });
}
