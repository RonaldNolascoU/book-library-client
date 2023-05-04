// pages/_app.tsx
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import type { AppProps } from 'next/app'

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
