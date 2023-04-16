import {configureStore} from '@reduxjs/toolkit'
import {setupListeners} from '@reduxjs/toolkit/query/react'
import { authApi, useLoginUserMutation, useRegisterUserMutation } from './apis/authApi'
import {authReducer} from './slices/authSlice'

const store = configureStore({
 reducer: {
   [authApi.reducerPath] : authApi.reducer,
   user: authReducer
 },
 middleware:  (getDefualtMiddleware)=>{
  return getDefualtMiddleware()
   .concat(authApi.middleware)
}
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
setupListeners(store.dispatch)
export {
  store,
  useLoginUserMutation,
  useRegisterUserMutation
}