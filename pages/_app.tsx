// pages/_app.tsx
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split
} from '@apollo/client'
import { createUploadLink } from 'apollo-upload-client'
import type { AppProps } from 'next/app'
import { Toaster } from 'sonner'
import '../styles/globals.scss'
import Layout from '@/components/layout'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'

import { getMainDefinition } from '@apollo/client/utilities'
import { createClient } from 'graphql-ws'
import { setContext } from '@apollo/client/link/context'

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql'
  })
)

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  wsLink,
  uploadLink
)

const client = new ApolloClient({
  link: authLink.concat(link),
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Toaster richColors />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  )
}

export default MyApp
