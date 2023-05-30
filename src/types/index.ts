export type Product = {
  id: number
  title: string
  body_html: string
  vendor: string
  product_type: string
  created_at: string
  handle: string
  updated_at: string
  published_at: string
  template_suffix: null | string
  published_scope: string
  tags: string
  admin_graphql_api_id: string
  variants: Variant[]
  options: Option[]
  images: Image[]
  image: Image | null
}

type Variant = {
  id: number
  product_id: number
  title: string
  price: string
  sku: string
  position: number
  inventory_policy: string
  compare_at_price: null | string
  fulfillment_service: string
  inventory_management: string
  option1: string
  option2: null | string
  option3: null | string
  created_at: string
  updated_at: string
  taxable: boolean
  barcode: string
  grams: number
  image_id: null | number
  weight: number
  weight_unit: string
  inventory_item_id: number
  inventory_quantity: number
  old_inventory_quantity: number
  presentment_prices: PresentmentPrice[]
  requires_shipping: boolean
  admin_graphql_api_id: string
}

type PresentmentPrice = {
  price: {
    amount: string
    currency_code: string
  }
  compare_at_price: null | string
}

type Option = {
  id: number
  product_id: number
  name: string
  position: number
  values: string[]
}

type Image = {
  id: number
  product_id: number
  position: number
  created_at: string
  updated_at: string
  alt: null | string
  width: number
  height: number
  src: string
  variant_ids: number[]
  admin_graphql_api_id: string
}

type ProductsData = {
  products: Product[]
}
