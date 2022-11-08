import { Typography } from '@mui/material'
import React from 'react'

// for show form validation error
const FormError = ({ children }) => {
    return (
        <>
            <Typography sx={{ color: '#d32f2f', ml: '14px', mt: '10px' }}>
                {children ?? ''}
            </Typography>
        </>
    )
}

export default FormError