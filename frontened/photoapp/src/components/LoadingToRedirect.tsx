import { Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'


const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.white',
    border: '1px solid #fff',
    boxShadow: 24,
    p: 4,
  };
const LoadingToRedirect = ()=>{
    const[count, setCount] = useState(5)
    const navigate = useNavigate()

    useEffect(()=>{
        const interval = setInterval(()=>{
          setCount((currentCount) => currentCount - 1)
          console.log(count);
          
        }, 1000)
    
        count === 0 && navigate("/auth")
     return () => clearInterval(interval)
    }, [count, navigate])
    return (
        <Modal
        open={true}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Redirecting you in {count} sec
          </Typography>
        </Box>
      </Modal>
    )
}

export default LoadingToRedirect