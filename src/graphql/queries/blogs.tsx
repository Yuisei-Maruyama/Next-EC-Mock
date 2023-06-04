import { gql } from '@apollo/client'

export const GET_BLOGS_QUERY = gql`
  query getBlogs($first: Int!) {
    blogs(first: $first) {
      edges {
        node {
          id
          title
          url
          articles(first: $first) {
            edges {
              node {
                id
                title
                contentHtml
                publishedAt
                url
              }
            }
          }
        }
      }
    }
  }
`
