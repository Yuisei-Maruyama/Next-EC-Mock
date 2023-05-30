import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await axios.get(
      `https://${process.env.SHOPIFY_STORE_DOMAIN}.myshopify.com/admin/api/2023-04/products.json`,
      {
        headers: {
          'X-Shopify-Access-Token': process.env.SHOPIFY_ADMIN_ACCESS_TOKEN,
        },
      }
    )

    res.status(200).json(response.data)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while trying to fetch the data' })
  }
}
