import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import TextField from '@mui/material/TextField'
import SearchIcon from '@mui/icons-material/Search'
import InputAdornment from '@mui/material/InputAdornment'
import Typography from '@mui/material/Typography'
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  Chip,
  List,
  ListItem,
} from '@mui/material'
import { SEARCH_PRODUCTS_QUERY } from '@/graphql/queries/products'
import { QueryResult } from '@/types/storefront/product'
import client from '@/lib/apolloClient'

const SearchInput = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [executeSearch, { loading, error, data }] = useLazyQuery<QueryResult>(
    SEARCH_PRODUCTS_QUERY,
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

  const handleSubmit = (event: any) => {
    event.preventDefault()
    // サブミット時にクエリを実行する
    executeSearch({ variables: { first: 10, query: searchTerm } })
    setIsSubmitted(true)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleSubmit(event)
    }
  }

  useEffect(() => {
    setIsSubmitted(false)
  }, [searchTerm])

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          name="search"
          label="検索ワード"
          variant="outlined"
          value={searchTerm}
          onChange={(event) =>
            setSearchTerm((event.target as HTMLInputElement).value)
          }
          onKeyPress={handleKeyPress}
          style={{
            verticalAlign: 'baseline',
            marginRight: '20px',
            width: '950px',
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>

      {isSubmitted && data?.products.nodes.length === 0 ? (
        <>
          <Typography variant="h5">
            "{searchTerm}"の結果はありません。
          </Typography>
          <Typography variant="subtitle1">
            別の言葉で検索してください
          </Typography>
        </>
      ) : (
        <>
          <Typography
            variant="h4"
            component="h4"
            align="center"
            gutterBottom
            sx={{ marginTop: '40px' }}
          >
            検索結果
          </Typography>
          <Grid
            container
            spacing={4}
            style={{ margin: 'auto', maxWidth: '100%' }}
          >
            {data?.products.nodes.map((node) => (
              <Grid item key={node.id} xs={12} sm={6} md={4}>
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
                            Variant: {variant.title}, Price:{' '}
                            {variant.price.amount} {variant.price.currencyCode}
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
      )}
    </div>
  )
}

export default SearchInput
