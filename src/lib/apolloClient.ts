import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: `https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/api/2023-04/graphql.json`,
})

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-Shopify-Storefront-Access-Token':
        process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      'Content-Type': 'application/json',
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export default client
