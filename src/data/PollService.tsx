import axios, { AxiosError } from 'axios';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { Poll } from '../shared/types';

const queryClient = new QueryClient();
class PollService {
  async fetchPolls(): Promise<Poll[]> {
    try {
      const response = await axios.get(`http://localhost:4000/polls`);
      return response.data;
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Request failed with status ${axiosError.response?.status}: ${axiosError.message}`);
      }

      // Handle other errors
      throw new Error('An unexpected error occurred while fetching poll data.');
    }
  }

  /*async createPoll(poll: Poll): Promise<Poll> {
    const { data } = await axios.post<Poll>(`${BASE_URL}/polls`, poll);
    return data;
  }

  async updatePoll(poll: Poll): Promise<Poll> {
    const { data } = await axios.patch<Poll>(`${BASE_URL}/polls/${poll.id}`, poll);
    return data;
  }

  async deletePoll(id: number): Promise<void> {
    await axios.delete<void>(`${BASE_URL}/polls/${id}`);
  }*/
}

export function PollDataProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export function usePolls() {
  const service = new PollService();
  return useQuery({
    queryKey: 'polls',
    queryFn: () => service.fetchPolls(),
  });
}

/*
export function useCreatePoll() {
  const queryClient = useQueryClient();
  return useMutation((poll: Poll) => new PollService().createPoll(poll), {
    onSuccess: () => {
      queryClient.invalidateQueries('polls');
    },
  });
}

export function useUpdatePoll() {
  const queryClient = useQueryClient();
  return useMutation((poll: Poll) => new PollService().updatePoll(poll), {
    onSuccess: () => {
      queryClient.invalidateQueries('polls');
    },
  });
}

export function useDeletePoll() {
  const queryClient = useQueryClient();
  return useMutation((id: number) => new PollService().deletePoll(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('polls');
    },
  });
}
*/
