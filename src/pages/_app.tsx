import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ApolloProvider } from '@apollo/client'
import { QueryClient, QueryClientProvider } from 'react-query'
import client from '@/lib/apolloClient'
import { Layout } from '@/layout/Layout'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </ApolloProvider>
  )
}
