import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate} from 'react-router-dom'

const Spinner = ({path = "login"}) => {
    const [count, SetCount] = useState(5)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        const intervel = setInterval(()=>{
            SetCount((prevalue)=> --prevalue)
        },1000)
        count === 0 && navigate(`/${path}`,{
            state:location.pathname
        })
        return ()=>clearInterval(intervel)
    },[count,navigate,location,path])
  return (
   <>
   
  <div className="d-flex  flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
    <h1 className='text-center'>Redirecting to you in {count} secconds</h1>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

   </>
  )
}

export default Spinner
