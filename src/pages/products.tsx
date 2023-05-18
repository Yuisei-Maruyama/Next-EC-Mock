import { useQuery, gql } from '@apollo/client'
import client from '@/lib/apolloClient'

const PRODUCTS_QUERY = gql`
  query getProducts($first: Int!) {
    products(first: $first) {
      edges {
        cursor
        node {
          title
        }
      }
    }
  }
`

type Product = {
  title: string
}

type QueryResult = {
  products: {
    edges: {
      cursor: string
      node: Product
    }[]
  }
}

export default function ProductsPage() {
  const { loading, error, data } = useQuery<QueryResult>(PRODUCTS_QUERY, {
    variables: { first: 10 },
    client,
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  return data?.products.edges.map(({ node }, id) => (
    <div key={id}>
      <h2>{node.title}</h2>
    </div>
  ))
}
