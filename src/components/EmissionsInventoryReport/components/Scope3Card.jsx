import { Typography } from '@mui/material'
import React from 'react'

const Scope3Card = ({title, value}) => {
  // Helper function to round numbers to 4 decimal places
  const roundToFour = (num) => Number(parseFloat(num).toFixed(4));

  return (
    <div style={{
      borderRadius: '1rem',
      padding: '1.2rem 1.6rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      flex: '1 0 0',
      backgroundColor: '#FFF4F4',
      gap: '2rem'
    }}>
      <Typography sx={{fontSize: '0.8rem', fontWeight: '500'}}>
        {title}
      </Typography>
      <Typography sx={{fontSize: '1rem', fontWeight: '600'}}>
        {typeof value === 'number' ? roundToFour(value) : value}
      </Typography>
    </div>
  )
}

export default Scope3Card