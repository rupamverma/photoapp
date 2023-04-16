import { Box } from '@mui/material';
import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { json } from 'stream/consumers';
import PrivateRoute from './components/PrivateRoute';
import { useAppDispatch } from './hooks/useApp';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import { setUser } from './store/slices/authSlice';

function App() {
  const dispatch = useAppDispatch()
  const user = JSON.parse(localStorage.getItem("user")|| "{}")
  useEffect(()=>{
    dispatch(setUser(user))
  }, [])
  return (
    <Box>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/auth' replace/>}/>
            <Route path='/auth' element={<Auth/>}/>
            <Route path='/dashboard' element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
