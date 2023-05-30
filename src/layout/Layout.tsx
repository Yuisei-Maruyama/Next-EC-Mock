import { ReactElement } from 'react'
import Header from '@/components/Header/Header'
import Box from '@mui/material/Box'

type LayoutProps = Required<{
  readonly children: ReactElement
}>

export const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <Box sx={{ maxWidth: '1440px', margin: 'auto', paddingY: '30px' }}>
      {children}
    </Box>
  </>
)
