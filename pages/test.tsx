import { useSubscription } from '@apollo/client'
import { gql } from 'graphql-tag'

const BOOK_FINISHED_SUBSCRIPTION = gql`
  subscription OnBookFinished {
    bookFinished {
      book {
        title
      }
      user {
        name
      }
      rating
    }
  }
`

type BookFinished = {
  book: {
    id: string
    title: string
  }
  user: {
    name: string
  }
  rating: number
}

function RealTimeFeed() {
  const { data, loading, error } = useSubscription(BOOK_FINISHED_SUBSCRIPTION)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      {data.bookFinished.map(({ book, user, rating }: BookFinished) => (
        <div key={book.id}>
          <h3>{book.title}</h3>
          <p>User: {user.name}</p>
          <p>Rating: {rating} stars</p>
        </div>
      ))}
    </div>
  )
}

export default RealTimeFeed
