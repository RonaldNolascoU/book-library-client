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

const uploadLink = createUploadLink({
  uri: 'http://localhost:4000/graphql'
})

const wsLink = new GraphQLWsLink(
  createClient({
    url: 'ws://localhost:4000/graphql'
  })
)

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
  link,
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
