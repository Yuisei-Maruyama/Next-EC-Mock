import React, { Suspense } from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import {
  Box,
  CircularProgress,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Chip,
} from '@mui/material'
import { Product } from '@/types'

async function fetchProducts() {
  const res = await axios.get('/api/products')
  return res.data.products
}

function Products() {
  const {
    data: products,
    error,
    isFetching,
  } = useQuery<Product[], Error>('products', fetchProducts)

  if (isFetching) return <CircularProgress />

  if (error)
    return <Typography>An error has occurred: {error.message}</Typography>

  return (
    <Container>
      <Grid container spacing={3}>
        {products?.map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Box sx={{ marginBottom: 2, height: '100%' }}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {product.image && (
                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image.src}
                    alt={product.image.alt || ''}
                  />
                )}
                <CardContent sx={{ flex: '1 0 auto' }}>
                  <Typography variant="h5">{product.title}</Typography>
                  <Typography
                    variant="body2"
                    dangerouslySetInnerHTML={{ __html: product.body_html }}
                  />
                  {product.tags.split(',').map((tag, index) => (
                    <Chip key={index} label={tag} style={{ margin: '4px' }} />
                  ))}
                </CardContent>
              </Card>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

function ProductsWrapper() {
  return (
    <Suspense fallback={<CircularProgress />}>
      <Products />
    </Suspense>
  )
}

export default ProductsWrapper
