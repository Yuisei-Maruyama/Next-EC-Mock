type Price = {
  amount: number
  currencyCode: string
}

type Variant = {
  id: string
  title: string
  price: Price
  quantityAvailable: number
  availableForSale: boolean
}

type Image = {
  id: string
  height: number
  altText: string
  url: string
  width: number
}

type Option = {
  id: string
  name: string
  values: string[]
}

type Product = {
  id: string
  title: string
  description: string
  options: Option[]
  images: {
    nodes: Image[]
  }
  tags: string[]
  totalInventory: number
  vendor: string
  variants: {
    nodes: Variant[]
  }
}

type ProductsResult = {
  nodes: Product[]
}

export type QueryResult = {
  products: ProductsResult
}
