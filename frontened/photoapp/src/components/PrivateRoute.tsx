import React, { ReactNode } from 'react'
import { useAppSelector } from '../hooks/useApp'
import { selectAuth } from '../store/slices/authSlice'
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoute = ({children}: {children: ReactNode})=>{
    const {token} = useAppSelector(selectAuth)
    return (
        <>
         {token ? children : <LoadingToRedirect/>}
        </>
    )
}

export default PrivateRoute