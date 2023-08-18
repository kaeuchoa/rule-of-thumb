import axios, { AxiosError } from 'axios';
import { QueryClient, QueryClientProvider, useMutation, useQuery, useQueryClient } from 'react-query';
import { Poll, VoteType } from '../shared/types';
import { deepCopy } from '../utils';

const queryClient = new QueryClient();

const BASE_URL = 'http://localhost:4000'
class PollService {

  async fetchPolls(): Promise<Poll[]> {
    try {
      const response = await axios.get(`${BASE_URL}/polls`);
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

  async fetchPoll(pollId: number): Promise<Poll> {
    try {
      const response = await axios.get(`${BASE_URL}/polls/${pollId}`);
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

  async submitVote(pollId: number, voteType: VoteType): Promise<void> {
    try {
      const poll = await this.fetchPoll(pollId);
      if (!poll) {
        throw new Error(`Poll with ID ${pollId} not found.`);
      }
      const copyPoll: Poll = deepCopy(poll);
      if (voteType === VoteType.positive) {
        copyPoll.celebrity.votes.positive++;
      } else if (voteType === VoteType.negative) {
        copyPoll.celebrity.votes.negative++;
      }

      const totalVotes = copyPoll.celebrity.votes.positive + copyPoll.celebrity.votes.negative;
      poll.positivePercentage = (copyPoll.celebrity.votes.positive / totalVotes) * 100;
      poll.negativePercentage = (copyPoll.celebrity.votes.negative / totalVotes) * 100;

      // Save the updated poll data
      await axios.patch<Poll>(`${BASE_URL}/polls/${pollId}`, copyPoll);
    } catch (error) {
      // Handle errors here (e.g., show a notification to the user)
      console.error('Error submitting vote:', error);
      throw error;
    }
  }

  async getPollByCelebrityId(celebrityId: number): Promise<Poll[]> {
    try {
      const response = await axios.get(`${BASE_URL}/polls?celebrity.id=${celebrityId}`);
      return response.data;
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Request failed with status ${axiosError.response?.status}: ${axiosError.message}`);
      }

      // Handle other errors
      throw new Error('An unexpected error occurred while fetching the poll.');
    }
  }

  async updatePositiveVoteByCelebrityId(pollId: number, patchPoll: Partial<Poll>): Promise<Poll> {
    try {
      const response = await axios.patch(`${BASE_URL}/polls/${pollId}`, patchPoll);
      return response.data;
    } catch (error) {
      // Handle Axios errors
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        throw new Error(`Request failed with status ${axiosError.response?.status}: ${axiosError.message}`);
      }

      // Handle other errors
      throw new Error('An unexpected error occurred while updating the positive vote.');
    }
  }
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

export function useSubmitVote(onSuccessCallBack: () => void, onErrorCallBack: () => void) {
  const mutation = useMutation<void, AxiosError, { pollId: number; voteType: VoteType }>(
    ({ pollId, voteType }) => new PollService().submitVote(pollId, voteType),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('polls');
        onSuccessCallBack();
      },
      onError: () => onErrorCallBack()
    }
  );

  return mutation;
}

export function useUpdatePositiveVoteByCelebrityId() {
  const queryClient = useQueryClient();
  const pollService = new PollService();

  const mutation = useMutation<Poll, AxiosError, { celebrityId: number }>(
    async ({ celebrityId }) => {
      const [poll] = await pollService.getPollByCelebrityId(celebrityId);
      const patchPoll = { celebrity: { ...poll.celebrity } }
      patchPoll.celebrity.votes.positive = poll.celebrity.votes.positive + 1;
      return pollService.updatePositiveVoteByCelebrityId(poll.id, patchPoll);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('polls');
      },
    }
  );

  return mutation;
}

export function useUpdateNegativeVoteByCelebrityId() {
  const queryClient = useQueryClient();
  const pollService = new PollService();

  const mutation = useMutation<Poll, AxiosError, { celebrityId: number }>(
    async ({ celebrityId }) => {
      const [poll] = await pollService.getPollByCelebrityId(celebrityId);
      const patchPoll = { celebrity: { ...poll.celebrity } }
      patchPoll.celebrity.votes.positive = poll.celebrity.votes.positive - 1;
      return pollService.updatePositiveVoteByCelebrityId(poll.id, patchPoll);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('polls');
      },
    }
  );

  return mutation;
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
