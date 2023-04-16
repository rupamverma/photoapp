import React from "react";
import {Box, Button, Typography} from '@mui/material'
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { selectAuth, logout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Dashboard = ()=>{
    const{name} = useAppSelector(selectAuth)
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const handleLogout = ()=>{
      dispatch(logout())
      toast("Logout successfully")
      navigate("/")
    }
    return (
     <Box>
        <Typography variant="h3">Welcome {name}</Typography>
        <Button onClick={handleLogout}>Logout</Button>
     </Box>
    )
}
export default Dashboard