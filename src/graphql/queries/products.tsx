import { gql } from '@apollo/client'

export const GET_PRODUCTS_QUERY = gql`
  query getProducts(
    $optionsFirst: Int
    $imagesFirst: Int
    $variantsFirst: Int
    $collectionsFirst: Int
  ) {
    products(first: 100) {
      nodes {
        id
        title
        description
        options(first: $optionsFirst) {
          id
          name
          values
        }
        images(first: $imagesFirst) {
          nodes {
            id
            height
            altText
            url
            width
          }
        }
        tags
        totalInventory
        vendor
        variants(first: $variantsFirst) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            quantityAvailable
            availableForSale
          }
        }
        collections(first: $collectionsFirst) {
          nodes {
            title
          }
        }
      }
    }
  }
`

export const SEARCH_PRODUCTS_QUERY = gql`
  query searchProducts(
    $first: Int!
    $query: String!
    $optionsFirst: Int
    $imagesFirst: Int
    $variantsFirst: Int
    $collectionsFirst: Int
  ) {
    products(first: $first, query: $query) {
      nodes {
        id
        title
        description
        options(first: $optionsFirst) {
          id
          name
          values
        }
        images(first: $imagesFirst) {
          nodes {
            id
            height
            altText
            url
            width
          }
        }
        tags
        totalInventory
        vendor
        variants(first: $variantsFirst) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            quantityAvailable
            availableForSale
          }
        }
        collections(first: $collectionsFirst) {
          nodes {
            title
          }
        }
      }
    }
  }
`

export const GET_PRODUCTS_FREE_SHIPPING_QUERY = gql`
  query getProductsFreeShipping(
    $optionsFirst: Int
    $imagesFirst: Int
    $variantsFirst: Int
    $collectionsFirst: Int
  ) {
    products(first: 10, query: "tag:送料無料") {
      nodes {
        id
        title
        description
        options(first: $optionsFirst) {
          id
          name
          values
        }
        images(first: $imagesFirst) {
          nodes {
            id
            height
            altText
            url
            width
          }
        }
        tags
        totalInventory
        vendor
        variants(first: $variantsFirst) {
          nodes {
            id
            title
            price {
              amount
              currencyCode
            }
            quantityAvailable
            availableForSale
          }
        }
        collections(first: $collectionsFirst) {
          nodes {
            title
          }
        }
      }
    }
  }
`
