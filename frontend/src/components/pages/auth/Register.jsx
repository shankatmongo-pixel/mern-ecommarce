import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../../../style/authstyle.css'

const Register = () => {
    const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [phone, SetPhone] = useState("")
    const [address, SetAddress] = useState("")
    const [question, SetQuestion] =useState("")

    const navigate = useNavigate()

    // form function

    const handleSubmit= async (e)=>{
            e.preventDefault()
          try {
            const response = await axios.post('http://localhost:5000/api/v1/auth/register/',{name,email,password,phone,address,question})
            if(response.data.success){
                toast.success(response.data.message)
                navigate('/login')
            }else{
                toast.error(response.data.message)
            }
          } catch (error) {
            console.log(error)
            toast.error('Somthing Went Wromg')
          }
    }
  return (
   <Layout title={'Register - Ecommarce App'}>
        <div className="form-container" style={{minHeight:"90vh"}}>
            

            <form onSubmit={handleSubmit} >
              <h4 className='title'>REGISTER FORM</h4>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=>SetName(e.target.value)} className="form-control" id="exampleInputName"   placeholder='Enter Your Name' required/>
  </div>
  <div className="mb-3">
    <input type="email" value={email}  onChange={(e)=>SetEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email' required/>
  </div>
  <div className="mb-3">
    <input type="password"  value={password} onChange={(e)=>SetPassword(e.target.value)} className="form-control" id="exampleInputPass"   placeholder='Enter Your Password' required/>
  </div>
  <div className="mb-3">
    <input type="text" value={phone} onChange={(e)=>SetPhone(e.target.value)}  className="form-control" id="exampleInputPhone"placeholder='Enter Your Phone Number' required/>
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e)=>SetAddress(e.target.value)}  className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' required/>
  </div>

  <div className="mb-3">
    <input type="text" value={question} onChange={(e)=>SetQuestion(e.target.value)}  className="form-control" id="question" placeholder='What is Your Favorite Sports' required/>
  </div>
 
  <button type="submit" className="btn btn-primary">REGISTER</button>
</form>

        </div>
   </Layout>
  )
}

export default Register
