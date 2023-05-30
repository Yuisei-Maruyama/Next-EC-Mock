import React, { useState } from 'react'
import { useQuery } from 'react-query'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LoadingButton from '@mui/lab/LoadingButton'

// APIからデータを取得する関数
const fetchAddress = async (postalCode: string) => {
  const response = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
  )
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }
  return response.json()
}

const AddressInput = () => {
  const [postalCode1, setPostalCode1] = useState('')
  const [postalCode2, setPostalCode2] = useState('')

  const postalCode = postalCode1 + postalCode2

  const {
    data: address,
    isLoading,
    isError,
    refetch,
  } = useQuery(['address', postalCode], () => fetchAddress(postalCode), {
    enabled: false,
  })

  const onChange1 = (e) => {
    if (e.target.value.length <= 3) setPostalCode1(e.target.value)
  }

  const onChange2 = (e) => {
    if (e.target.value.length <= 4) setPostalCode2(e.target.value)
  }

  const handleClick = () => {
    if (postalCode.length === 7) refetch()
  }

  if (isError) {
    return <div>Error occurred while fetching data</div>
  }

  return (
    <div>
      <Box display="flex" alignItems="center" marginBottom={2}>
        <TextField
          value={postalCode1}
          onChange={onChange1}
          label="郵便番号1"
          variant="outlined"
        />
        <span style={{ marginLeft: '12px' }}>-</span>
        <TextField
          value={postalCode2}
          onChange={onChange2}
          label="郵便番号2"
          variant="outlined"
          style={{ marginLeft: '12px' }}
        />
        <Box marginLeft={2}>
          <LoadingButton
            loading={isLoading}
            onClick={handleClick}
            variant="outlined"
            style={{ height: '56px' }}
          >
            Search
          </LoadingButton>
        </Box>
      </Box>
      {address && address.results && (
        <Box display="flex" flexDirection="column">
          <TextField
            value={address.results[0].address1}
            label="都道府県"
            variant="outlined"
            sx={{ marginTop: '12px' }}
          />
          <TextField
            value={address.results[0].address2}
            label="市町村"
            variant="outlined"
            sx={{ marginTop: '12px' }}
          />
          <TextField
            value={address.results[0].address3}
            label="町名・番地など"
            variant="outlined"
            sx={{ marginTop: '12px' }}
          />
        </Box>
      )}
    </div>
  )
}

export default AddressInput
