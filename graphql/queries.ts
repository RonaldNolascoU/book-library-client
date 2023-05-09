// graphql/mutations.ts
import { gql } from '@apollo/client'

export const GET_USER = gql`
  query {
    getMe {
      status
      user {
        id
        name
        email
        books {
          id
          title
          slug
          author
          date
          collectionSection
          coverImage
        }
      }
    }
  }
`

export const GET_BOOK = gql`
  query GetBook($slug: String!) {
    getBook(slug: $slug) {
      id
      title
      slug
      author
      date
      collectionSection
      coverImage
    }
  }
`
