import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import UserMenu from '../../layout/UserMenu'
import { useAuth } from '../../../context/authContext'
import { toast } from 'react-toastify'
import axios from 'axios'


const Profile = () => {
  // context 
  const [auth, setAuth] = useAuth()

  // state
   const [name, SetName] = useState("")
    const [email, SetEmail] = useState("")
    const [password, SetPassword] = useState("")
    const [phone, SetPhone] = useState("")
    const [address, SetAddress] = useState("")

    // form handle

    const handleSubmit= async (e)=>{
            e.preventDefault()
          try {
            const {data} = await axios.put('https://mern-ecommarce.onrender.com/api/v1/auth/profile/',{name,email,password,phone,address})
           
            if(data?.error){
              toast.error(data.error)
            }else{
              setAuth({...auth,user:data?.upadatedUser})
              let ls = localStorage.getItem('auth')
              ls = JSON.parse(ls)
              ls.user = data.upadatedUser
              localStorage.setItem('auth', JSON.stringify(ls))
              toast.success('Profile Updated Successfully');
            }
          } catch (error) {
            console.log(error)
            toast.error('Somthing Went Wromg')
          }
    }

    // GET USER DATA

    useEffect(()=>{
       if (auth?.user) {
    SetName(auth.user.name || "")
    SetEmail(auth.user.email || "")
    SetPhone(auth.user.phone || "")
    SetAddress(auth.user.address || "")
  }

    },[auth?.user]
  
  )
  return (
    <div>
       <Layout title={'Your Profile'}>
    <div className="container-fluid p-3 m-3">
    <div className="row">
       <div className="col-md-3">
        <UserMenu />
       </div>
       <div className="col-md-9">
           <div className="form-container">
            

            <form onSubmit={handleSubmit} >
              <h4 className='title'>USER PROFILE</h4>
  <div className="mb-3">
    <input type="text" value={name} onChange={(e)=>SetName(e.target.value)} className="form-control" id="exampleInputName"   placeholder='Enter Your Name' />
  </div>
  <div className="mb-3">
    <input type="email" value={email}  onChange={(e)=>SetEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder='Enter Your Email'  disabled/>
  </div>
  <div className="mb-3">
    <input type="password"  value={password} onChange={(e)=>SetPassword(e.target.value)} className="form-control" id="exampleInputPass"   placeholder='Enter Your Password' />
  </div>
  <div className="mb-3">
    <input type="text" value={phone} onChange={(e)=>SetPhone(e.target.value)}  className="form-control" id="exampleInputPhone"placeholder='Enter Your Phone Number' />
  </div>
  <div className="mb-3">
    <input type="text" value={address} onChange={(e)=>SetAddress(e.target.value)}  className="form-control" id="exampleInputAddress" placeholder='Enter Your Address' />
  </div>

 
 
  <button type="submit" className="btn btn-primary">UPDATE</button>
</form>

        </div>
       </div>
    </div>
    </div>
   </Layout>
    </div>
  )
}

export default Profile
