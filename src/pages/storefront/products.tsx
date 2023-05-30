import { useState } from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  List,
  ListItem,
  Chip,
  Button,
  Box,
  Divider,
} from '@mui/material'
import { useQuery } from '@apollo/client'
import {
  GET_PRODUCTS_QUERY,
  GET_PRODUCTS_FREE_SHIPPING_QUERY,
} from '@/graphql/queries/products'
import client from '@/lib/apolloClient'
import { QueryResult } from '@/types/storefront/product'
import SearchInput from '@/components/Input/SearchInput'
import FilterIcon from '@/components/Icon/FilterIcon'
import FilterDialog from '@/components/Dialog/FilterDialog'

export default function ProductsPage() {
  const [freeShippingOnly, setFreeShippingOnly] = useState(false)
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')

  const handleSelectChange = (event: any) => {
    setSelected(event.target.value)
  }

  const { loading, error, data } = useQuery<QueryResult>(
    freeShippingOnly ? GET_PRODUCTS_FREE_SHIPPING_QUERY : GET_PRODUCTS_QUERY,
    {
      variables: {
        optionsFirst: 10,
        imagesFirst: 10,
        variantsFirst: 10,
        collectionsFirst: 10,
      },
      client,
    }
  )

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :</p>

  console.log(data?.products.nodes)

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFreeShippingOnly(event.target.checked)
  }

  const handleFilterBtnClick = () => {
    setOpen(true)
  }

  const filterDialogProps = {
    open,
    setOpen,
    freeShippingOnly,
    handleCheckboxChange,
    selected,
    handleSelectChange,
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <SearchInput />
      </Box>
      <Divider sx={{ marginTop: '40px' }} />
      <Typography
        variant="h4"
        component="h4"
        align="center"
        gutterBottom
        sx={{ marginTop: '40px' }}
      >
        商品一覧
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          endIcon={<FilterIcon />}
          onClick={handleFilterBtnClick}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'black',
            backgroundColor: '#fff',
            borderColor: 'grey.500',
            borderStyle: 'solid',
            borderWidth: '1px',
            borderRadius: '20px',
          }}
        >
          フィルター
        </Button>
      </Box>
      <FilterDialog {...filterDialogProps} />
      <Grid container spacing={4} style={{ margin: 'auto', maxWidth: '90%' }}>
        {data?.products.nodes.map((node) => (
          <Grid item key={node.id} xs={12} sm={6} md={3}>
            <Card>
              {node.images.nodes[0] && (
                <CardMedia
                  component="div"
                  style={{
                    paddingTop: '56.25%',
                    backgroundImage: `url(${node.images.nodes[0].url})`,
                    backgroundSize: 'contain',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                  }}
                />
              )}
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    '& > :not(style)': { m: 0.5 },
                  }}
                >
                  {node.tags.map((tag, index) => (
                    <Chip key={index} label={tag} />
                  ))}
                </Box>
                <Typography variant="h5" component="div">
                  {node.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {node.description}
                </Typography>
                <List>
                  {node.variants.nodes.map((variant) => (
                    <ListItem key={variant.id}>
                      <Typography variant="body1" color="text.primary">
                        Variant: {variant.title}, Price: {variant.price.amount}{' '}
                        {variant.price.currencyCode}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  )
}
