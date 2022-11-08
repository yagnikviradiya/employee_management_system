import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <div><CircularProgress
            color="secondary"
            className='loader'
            sx={{
                '&.MuiCircularProgress-root': {
                    width: '100px !important',
                    height: '100px !important',                }
            }} />
        </div>
    )
}

export default Loader