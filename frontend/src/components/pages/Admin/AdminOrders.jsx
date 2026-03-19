import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../../layout/AdminMenu'
import { useAuth } from '../../../context/authContext'
import moment from 'moment'
import { Select } from 'antd'
import axios from 'axios'
const AdminOrders = () => {

    const  {Option} = Select
   const [status, setStatus] = useState(["not process", "processing","shipped","delivered","cancel"])

    const [changeStatus,setChangeStatus] = useState("")

     const [orders,setOrders] = useState([])

  const [auth, setAuth] = useAuth()

  const getOders = async()=>{
    try {
      const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/auth/all-orders`)
      setOrders(data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    if(auth?.token) getOders()
  },[auth?.token])

  const handleChange = async (orderId,value)=>{

    try {
      const  {data} = await axios.put(`https://mern-ecommarce.onrender.com/api/v1/auth/order-status/${orderId}`,{status:value})
      getOders()
    } catch (error) {
      console.log(error)
    }

  }


  return (
    <Layout title={'All Orders Data'}>
        <div className="row">
            <div className="col-md-3">
                <AdminMenu />
            </div>
            <div className="col-md-9">
                <h1 className='text-center'>All Orders</h1>
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
                                       <td>
                                        <Select bordered = {false}  value ={o?.status}onChange={(value) => handleChange(o._id,value)} >
                                           {status.map((s,i) => (
                                            <Option key={i} value = {s}>{s}</Option>
                                           ))}
                                        </Select>
                                       </td>
                                        <td>{o?.buyer?.name}</td>
                                         <td>{moment(o?.createdAt).fromNow()}</td>
                                          <td>{o?.payment.success ? "Success" : "Failed"}</td>
                                          <td>{o?.products?.length}</td>
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
    </Layout>

)
}

export default AdminOrders
