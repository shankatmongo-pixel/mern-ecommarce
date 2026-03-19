import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Outlet } from 'react-router-dom'
import axios from 'axios'
import Spinner from '../Spinner'

export default function Private(){
     const [ok, SetOk] = useState (false)
    const [auth, SetAuth] = useAuth ()

    useEffect(()=>{
        const authCheck = async ()=>{
      const response = await axios.get('https://mern-ecommarce.onrender.com/api/v1/auth/user-auth')
      if(response.data.ok){
        SetOk(true)
      }else{
        SetOk(false)
      }
       
        }
        if(auth?.token) authCheck()
       
    },[auth?.token])
    return ok ? <Outlet /> : <Spinner /> 
}
