import React, { useEffect, useState } from "react";
import {Typography, 
    Box,
    Avatar,
    TextField,
    FormControlLabel,
    Checkbox,
    Button,
    Grid,
    Link,
} from '@mui/material'
import {LockOutlined} from '@mui/icons-material'
import { useLoginUserMutation, useRegisterUserMutation } from "../store";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import { useAppDispatch } from "../hooks/useApp";
import { setUser } from "../store/slices/authSlice";

const Auth = ()=>{
  const initialState={
    "firstName": "",
    "lastName": "",
    "email": "",
    "password": "",
    "confirmPassword": ""
  }
  const[formValue, setFormValue] = useState(initialState)
  const{firstName, lastName, email, password} = formValue
  const[showSignup, setShowSignup] = useState(false)
  const[loginUser, {
    data: loginData, 
    isSuccess: isLoginSuccess, 
    isError: isLoginError, 
    error: loginError}] = useLoginUserMutation()

    const[registerUser, {
     data: registerData, 
    isSuccess: isRegisterSuccess, 
    isError: isRegisterError, 
    error: registerError
    }] = useRegisterUserMutation()

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleSubmit = async(event: React.FormEvent)=>{
      event.preventDefault()
      if(showSignup){
         if(firstName && lastName && email && password){
          await registerUser({firstName, lastName, email, password})
         }
      }else{
        if(email && password){
          await loginUser({email, password})
        }else{
          toast.error("Please fill all input fields")
        }
      }
    }
    useEffect(()=>{
      if(isLoginSuccess){
        toast.success("User login successfully")
        dispatch(setUser({name: loginData.results.firstName, token: loginData.token}))
        navigate('/dashboard')
      }
      if(isRegisterSuccess){
        toast.success("User registered successfully")
        dispatch(setUser({name: registerData.results.firstName, token: registerData.token}))
          navigate("/dashboard")
      }
    }, [isLoginSuccess, isRegisterSuccess])
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>)=>{
      setFormValue({...formValue, [event.target.name]: event.target.value})
      
    }
    useEffect(()=>{
      if(isLoginError){
        toast.error((loginError as any).data);
      }
      if(isRegisterError){
        toast.error((registerError as any).data);
      }
    }, [isLoginError, isRegisterError])
 
    return (
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            {showSignup ? `Signup`: `Sign in`}
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {showSignup && 
            <>
              <div>
              <TextField
              margin="normal"
              required
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              autoComplete="given-name"
              autoFocus
              value={firstName}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="lastName"
              id="lastName"
              autoComplete="family-name"
              value={lastName}
              onChange={handleChange}
            />
              </div>
            </>
            }
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {showSignup ? 'Signup': 'Sign In'}
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                {showSignup ? <Link href="#" variant="body2" onClick={()=>setShowSignup(!showSignup)}>
                  {"Already have an account? Sign In"}
                </Link>
                :
                <Link href="#" variant="body2" onClick={()=>setShowSignup(!showSignup)}>
                  {"Don't have an account? Sign Up"}
                </Link>
                }
              </Grid>
            </Grid>
          </Box>
        </Box>
    )
}
export default Auth