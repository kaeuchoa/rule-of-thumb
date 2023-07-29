import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import axios, { AxiosError } from 'axios';
import { Celebrity } from '../shared/types';

const queryClient = new QueryClient();
class CelebrityService {
  async fetchCelebrities(): Promise<Celebrity[]> {
    try {
      const response = await axios.get('http://localhost:4000/celebrities');
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
