import { usePolls } from '../../data/PollService'
import PollListItem from './PollListItem'
import { VoteType } from '../../shared/types';
import { useVoteHandler } from '../../shared/hooks';


const PollsList = () => {
  const { data: polls, isLoading } = usePolls();
  const { handleVoteClick, setVote } = useVoteHandler()

  if (isLoading) {
    return <>loading....</>
  }

  if (!polls) {
    return <>no polls found</>
  }

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