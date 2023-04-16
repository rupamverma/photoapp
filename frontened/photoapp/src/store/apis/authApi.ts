import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const pause = (duration:number)=>{
    return  new Promise(res => setTimeout(res, duration));
   }
const authApi = createApi({
    reducerPath: 'auth',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080/api/v1',
        fetchFn: async(...args)=>{
            await pause(1000)
            return fetch(...args)
         }
    }),
    endpoints: (builder) =>({
        loginUser: builder.mutation({
            query: (body: {email: string, password: string})=>{
                return {
                    url: '/auth/authenticate',
                    method: 'POST',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        }),
        registerUser: builder.mutation({
            query: (body: {firstName: string, lastName: string, email: string, password: string})=>{
                return {
                    url: '/auth/register',
                    method: 'POST',
                    body,
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
            }
        })
    })
})
export const{useLoginUserMutation, useRegisterUserMutation} = authApi
export {authApi}