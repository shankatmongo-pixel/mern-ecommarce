import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import { useCart } from '../../context/Cart'
import { useAuth } from '../../context/authContext'
import { useNavigate } from 'react-router-dom'
import { AiFillWarning } from "react-icons/ai";
import DropIn from 'braintree-web-drop-in-react'
import axios from 'axios'
import { toast } from 'react-toastify'

import "../../style/CartPage.css"

const CartPage = () => {
    const navigate = useNavigate()
    const [cart, setCart] = useCart ()
    const [auth,SetAuth] = useAuth()


    const [clientToken, setClientToken] = useState("");

    const [instance, setInstance] = useState("")

    const [loading, setLoading]  = useState(false)


        const totalPrice = ()=>{
            try {
                let  total = 0;
                cart?.map(Item => {total = total + Item.price})
                return total.toLocaleString('en-Us', {
                    style: 'currency',
                    currency:"USD"
                });
            } catch (error) {
                console.log(error)
            }
        } 

    // Remove Items

    const removeCartItem = (pid)=>{
        try {
            let myCart = [...cart]

            let index = myCart.find(Item => Item._id === pid)
            myCart.splice(index,1)

            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error)
        }
    }

    // get payment gateway

    const getToken  = async ()=>{
        try {
            const {data} =  await axios.get(`http://localhost:5000/api/v1/product/braintree/token`)

           setClientToken(data?.clientToken);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getToken();
    },[auth?.token])

    // handlePayment

    const handlePayment = async()=>{
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod()
            const {data} = await axios.post(`http://localhost:5000/api/v1/product/braintree/payment`,{nonce,cart})
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success('Payment Completed Successfully')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

  return (
   <Layout>
    <div className="cart-page">
        <div className="row  p-0 m-0">
            <div className="col-md-12">
                <h1 className='text-center bg-light p-2 mb-1'>
                    {`Hello ${auth?.token && auth?.user?.name}`}
                </h1>
                <h4 className='text-center'>
                    {cart?.length > 1 
                    ? `You Have ${cart.length} Items in Your Cart ${
                        auth?.token ? "" : "please Login to Checkout"
                        }` : "your Cart is Emptey" }
                </h4>
            </div>
        </div>
        <div className="row p-0 m-0">
            <div className="col-md-8">
              
                    {cart?.map( p => (
                            <div className="row mb-2 card p-3 flex-row">
                                <div className="col-md-4">
                                   <img src={`http://localhost:5000/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} 
                                   width="100px"
                                   height="100px"
                                   
                                   />
                                </div>
                                <div className="col-md-8">
                                   <p>{p.name}</p>
                                   <p>{p.description.substring(0,30)}</p>
                                   <p>{p.price}</p>
                                   <button className='btn btn-danger' onClick={()=>removeCartItem(p._id)}>Remove</button>
                                </div>
                            </div>
                    ))}
                
            </div>
            <div className="col-md-4 text-center m-0 p-0">
               <h2>Cart Summary</h2>
               <p>Total | Checkout | Payment</p>
               <hr />

                    <h4>Total : {totalPrice()}</h4>
                    {auth?.user?.address ? (
                        <>
                        <div className="mb-3">
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning'
                             onClick={()=>navigate('/dashboard/user/profile')}
                             >Upadate Address</button>
                        </div>
                        </>
                    ) : (
                       <div className="mb-3">
                        {
                            auth?.token ? (
                                <button className='btn btn-outline-warning' onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                            ) : (
                                <button className='btn btn-outline-warning' onClick={()=>navigate('/login',{
                                    state:"/cart"
                                })}>Please Login to Checkout</button>
                            )
                        }
                       </div>
                    )}

                    <div className="mt-2">

                        {
                            !clientToken || !cart?.length ? (""):(
                                <>
                                 <DropIn 
                        options={
                            {
                                authorization:clientToken,
                                paypal:{
                                    flow:'vault'
                                }
                            }
                        }

                        onInstance={instance => setInstance(instance)}
                        
                         
                        />
                          <button className='btn btn-primary mb-4'
                           onClick={handlePayment} 
                           disabled ={loading || !instance || !auth?.user?.address}
                           
                           >
                           {loading ? "Processing ...." : "Make Payment"}
                            
                            
                            </button>
                                
                                </>
                            )
                        }
                       

                     
                    </div>
            </div>



        </div>
    </div>
   </Layout>
  )
}

export default CartPage
