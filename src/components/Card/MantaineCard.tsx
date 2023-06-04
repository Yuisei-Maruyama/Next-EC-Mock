import { Card, Text, Box } from '@mantine/core'

const MantineCard = () => {
  return (
    <Card
      shadow="sm"
      padding="xl"
      component="a"
      href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      target="_blank"
      style={{
        padding: 0,
        height: 331,
        backgroundImage: `url(/xxx.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Card.Section></Card.Section>

      <Card
        padding="xl"
        style={{
          padding: '12px',
          backgroundColor: 'rgba(53, 56, 66, 0.6)',
          position: 'absolute',
          bottom: 0,
          width: '100%',
          color: '#ffffff',
        }}
      >
        <Text fz="sm" style={{ opacity: 0.6 }}>
          2023年2月2日
        </Text>
        <Box display="flex" sx={{ alignItems: 'center' }}>
          <Text>サツドラ小樽新光店OPEN</Text>
          <Text style={{ marginLeft: '35px' }}>{'>'}</Text>
        </Box>
      </Card>
    </Card>
  )
}

export default MantineCard
