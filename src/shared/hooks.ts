import { useState } from 'react';
import { useSubmitVote, useUpdateNegativeVoteByCelebrityId, useUpdatePositiveVoteByCelebrityId } from '../data/PollService';
import { Vote, VoteType } from './types';

export function useVoteHandler() {
  const submitVoteMutation = useSubmitVote();
  const [vote, setVote] = useState<Vote>({ pollId: null, vote: null });
  const handleVoteClick = () => {
    if (vote.vote === null || vote.pollId === null) return;

    if (vote.vote === VoteType.positive) {
      submitVoteMutation.mutate({ pollId: vote.pollId, voteType: VoteType.positive });
    } else {
      submitVoteMutation.mutate({ pollId: vote.pollId, voteType: VoteType.negative });
    }
  };

  return { handleVoteClick, setVote };
}

export function usePositiveVote() {
  const updateVoteMutation = useUpdatePositiveVoteByCelebrityId();
  
  const handleThumbUpVote = (id: number) => {
    updateVoteMutation.mutate({ celebrityId: id });
  };

  return { handleThumbUpVote }
}

export function useNegativeVote() {
  const updateVoteMutation = useUpdateNegativeVoteByCelebrityId();
  
  const handleThumbDownVote = (id: number) => {
    updateVoteMutation.mutate({ celebrityId: id });
  };

  return { handleThumbDownVote }
}


