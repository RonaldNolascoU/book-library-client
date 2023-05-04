// pages/index.tsx
import { gql, useQuery } from '@apollo/client'

const GET_BOOKS = gql`
  query GetBooks {
    books {
      id
      title
      author
    }
  }
`

type Book = {
  id: string
  title: string
  author: string
}

export default function Home() {
  const { loading, error, data } = useQuery(GET_BOOKS)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div>
      <h1>Book Library</h1>
      <ul>
        {data.books.map(({ id, title, author }: Book) => (
          <li key={id}>
            {title} by {author}
          </li>
        ))}
      </ul>
    </div>
  )
}
