// graphql/mutations.ts
import { gql } from '@apollo/client'

export const SIGN_UP_USER = gql`
  mutation SignUpUser($input: SignUpInput!) {
    signupUser(input: $input) {
      status
      user {
        id
        name
        email
      }
    }
  }
`

export const LOGIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      status
      access_token
      user {
        id
        name
        email
      }
    }
  }
`

export const LOGOUT = gql`
  mutation {
    logoutUser
  }
`

export const ADD_BOOK = gql`
  mutation addBook($input: BookInput!) {
    addBook(input: $input) {
      status
      book {
        id
        title
        author
        date
        coverImage
        collectionSection
      }
    }
  }
`

export const UPDATE_BOOK = gql`
  mutation updateBook($slug: String!, $input: BookInputUpdate!) {
    updateBook(slug: $slug, input: $input) {
      status
      book {
        id
        title
        author
        date
        coverImage
        collectionSection
      }
    }
  }
`

export const FINISH_BOOK = gql`
  mutation finishBook($id: String!, $rating: Int!) {
    finishBook(id: $id, rating: $rating) {
      status
      book {
        id
        title
        author
        date
        coverImage
        collectionSection
      }
    }
  }
`

export const BOOK_FINISHED_SUBSCRIPTION = gql`
  subscription BookFinished {
    bookFinished {
      book {
        id
        title
        coverImage
      }
      user {
        id
        name
      }
    }
  }
`
