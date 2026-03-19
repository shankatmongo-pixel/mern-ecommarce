
import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'
import '../../../style/authstyle.css'




const ForgotPassword = () => {
     
        const [email, SetEmail] = useState("")
        
        const [question, SetQuestion] = useState("")
        const [newPassword, SetNewPassword] = useState("")
       

         const navigate = useNavigate()
         
       

        // form function

    const handleSubmit= async (e)=>{
            e.preventDefault()
          try {
            const response = await axios.post('https://mern-ecommarce.onrender.com/api/v1/auth/forgot-password/',{email,question,newPassword})
            if(response.data.success){
                toast.success(response.data.message)
               
               
                navigate(location.state ||'/login')
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
                  <h4 className='title'>RESET PASSWORD</h4>
     
      <div className="mb-3">
        <input type="email" value={email}  onChange={(e)=>SetEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>
      </div>

      <div className="mb-3">
        <input type="text" value={question}  onChange={(e)=>SetQuestion(e.target.value)} className="form-control" id="question" placeholder='Enter Your Favorite Sport Name' required/>
      </div>
      <div className="mb-3">
        <input type="password"  value={newPassword} onChange={(e)=>SetNewPassword(e.target.value)} className="form-control" id="exampleInputPass"   placeholder='Enter Your Password' required/>
      </div>
      
    
     
      <button type="submit" className="btn btn-primary">RESET</button>
       
    </form>
    
            </div>
       </Layout>
  )
}

export default ForgotPassword
