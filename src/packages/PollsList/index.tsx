import { useState } from 'react';
import { usePolls, useSubmitVote } from '../../data/PollService'
import PollListItem from './PollListItem'
import { Vote, VoteType } from '../../shared/types';

const PollsList = () => {
  const { data: polls, isLoading } = usePolls();
  const submitVoteMutation = useSubmitVote();
  const [vote, setVote] = useState<Vote>({ pollId: null, vote: null })

  if (isLoading) {
    return <>loading....</>
  }

  if (!polls) {
    return <>no polls found</>
  }

  const handleVoteClick = () => {
    if (vote.vote === null || vote.pollId === null) return

    if (vote.vote === VoteType.positive) {
      handleThumbUpVote(vote.pollId)
    } else {
      handleThumbDownVote(vote.pollId)
    }
    //refetch data
  }
  const handleThumbUpVote = (id: number) => {
    submitVoteMutation.mutate({ pollId: id, voteType: VoteType.positive });
  };

  const handleThumbDownVote = (id: number) => {
    submitVoteMutation.mutate({ pollId: id, voteType: VoteType.negative });
  };

  return (
    <ul>
      {polls.map(({ id, celebrity, openingDate, resultIcon }) => (
        <li>
          <PollListItem
            key={id}
            category={celebrity.category}
            description={celebrity.description}
            icon={resultIcon}
            imageUrl={celebrity.picture}
            openDuration={openingDate}
            thumbsDownCount={celebrity.votes.negative}
            thumbsUpCount={celebrity.votes.positive}
            title={celebrity.name}
            onThumbDownClick={() => setVote({ pollId: id, vote: VoteType.negative })}
            onThumbUpClick={() => setVote({ pollId: id, vote: VoteType.positive })}
            onVoteClick={handleVoteClick}
          />
        </li>
      ))}
    </ul>
  )
}

export default PollsList