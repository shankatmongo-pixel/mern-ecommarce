
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import '../../../style/authstyle.css'
import { useAuth } from '../../../context/authContext'



const Login = () => {
     
        const [email, SetEmail] = useState("")
        const [password, SetPassword] = useState("")
        const [auth, SetAuth] = useAuth();

         const navigate = useNavigate()
         const location = useLocation()
       

        // form function

    const handleSubmit= async (e)=>{
            e.preventDefault()
          try {
            const response = await axios.post('https://mern-ecommarce.onrender.com/api/v1/auth/login/',{email,password})
            if(response.data.success){
                toast.success(response.data.message)
                SetAuth({
                  ...auth,
                  user:response.data.user,
                  token:response.data.token
                })
                localStorage.setItem('auth',JSON.stringify(response.data));
                navigate(location.state ||'/')
            }else{
                toast.error(response.data.message)
            }
          } catch (error) {
            console.log(error)
            toast.error('Somthing Went Wromg')
          }
    }
  return (
     <Layout title={'LOGIN - Ecommarce App'}>
            <div className="form-container">
                
    
                <form onSubmit={handleSubmit} >
                  <h4 className='title'>LOGIN FORM</h4>
     
      <div className="mb-3">
        <input type="email" value={email}  onChange={(e)=>SetEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>
      </div>
      <div className="mb-3">
        <input type="password"  value={password} onChange={(e)=>SetPassword(e.target.value)} className="form-control" id="exampleInputPass"   placeholder='Enter Your Password' required/>
      </div>
      
    
     
      <button type="submit" className="btn btn-primary">LOGIN</button>
        <div className="mt-3">
          <button type="button" className="btn btn-primary forgot-btn" onClick={()=>navigate('/forgot-password')}>FORGOT PASSWORD ?</button>
      </div>
    </form>
    
            </div>
       </Layout>
  )
}

export default Login
