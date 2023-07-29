import { usePolls } from '../../data/PollService'
import PollListItem from './PollListItem'

const PollsList = () => {
  const { data: polls, isLoading } = usePolls();
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
            onThumbDownClick={() => console.log('thumb down')}
            onThumbUpClick={() => console.log('thumb up')}
            onVoteClick={() => console.log('on vote')}
          />
        </li>
      ))}
    </ul>
  )
}

export default PollsList