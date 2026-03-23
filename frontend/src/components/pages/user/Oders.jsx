import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import UserMenu from '../../layout/UserMenu'
import axios from 'axios'
import {useAuth} from '../../../context/AuthContext'
import moment from 'moment'


const Oders = () => {
  const [orders,setOrders] = useState([])

  const [auth, setAuth] = useAuth()

  const getOders = async()=>{
    try {
      const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/auth/orders`)
      setOrders(data)
      console.log(orders)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    if(auth?.token) getOders()
  },[auth?.token])
  return (
   <Layout title={'Your Orders'}>
    <div className="container-fluid p-3 m-3">
    <div className="row">
       <div className="col-md-3">
        <UserMenu />
       </div>
       <div className="col-md-9">
        <h1 className='text-center'>All Oders</h1>

        {
          orders?.map((o,i)=>{
            return(
              <div className="border shodow">
                <table className='table'>

                  <thead>
                    <tr>
                      <th scope='col'>#</th>
                       <th scope='col'>Status</th>
                        <th scope='col'>Buyer</th>
                         <th scope='col'>Orders</th>
                          <th scope='col'>Payments</th>
                           <th scope='col'>Quantity</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{i + 1}</td>
                       <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                         <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                          <td>{o?.products?.lenght}</td>
                    </tr>

                 
                    
                  </tbody>

                </table>
                <div className="container">
                    {o?.products.map((p,i) => (
                            <div className="row mb-2 card p-3 flex-row">
                                <div className="col-md-4">
                                   <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} 
                                   width="100px"
                                   height="100px"
                                   
                                   />
                                </div>
                                <div className="col-md-8">
                                   <p>{p.name}</p>
                                   <p>{p.description.substring(0,30)}</p>
                                   <p>{p.price}</p>
                                  
                                </div>
                            </div>
                    ))}
                </div>
              </div>
            )
          })
        }
        
       </div>
    </div>
    </div>
   </Layout>
  )
}

export default Oders
