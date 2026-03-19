import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const ProductDetails = () => {
    const params = useParams()

    const navigate = useNavigate()

    const [product, setProduct] = useState({})
    const [related,setRelated] = useState([])
    //intial Details
    useEffect(()=>{
        if(params?.slug) getProduct()
    },[params?.slug])

    // get product
    const getProduct = async ()=>{
        try {
            const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id,data?.product.category._id)
        } catch (error) {
            console.log(error)
        }
    }


    //  Get Similer Product

    const getSimilarProduct = async (pid,cid)=>{
            try {
                const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/product/related-product/${pid}/${cid}`)
                setRelated(data?.product)
            } catch (error) {
                console.log(error)
            }
    }
  return (
  <Layout>
    <div className="row container mt-2">
        <div className="col-md-3">
             <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${product._id}`} className="card-img-top" alt={product.name}
             
             height={"220"}
             width={'200'}
             />
        </div>
        <div className="col-md-8">
            <h1 className='text-center'>PRODUCT DETAILES</h1>
            <h6>Name : {product.name}</h6>
             <h6>Description : {product.description}</h6>
              <h6>Price : {product.price}</h6>
              <h6>Category : {product?.category?.name}</h6>

               <button  className="btn btn-secondary ms-1">ADD TO CART</button>
             
        </div>
    </div>
    <hr />
    <div className="row container">
        <h6>Similar Product</h6>
        {related.length < 1 && (<p className='text-center'>No Simelar Products Found</p>)}
          <div className="d-flex flex-wrap">
            {related?.map(p => (
              
             
            <div key={p._id} className="card m-2" style={{width: '18rem'}}>
  <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description.substring(0,30)}</p>
     <p className="card-text"> $ {p.price}</p>
    
       <button  className="btn btn-secondary ms-1">ADD TO CART</button>
         <button  className="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
    
  </div>
</div>




            ))}

          </div>
    </div>
  </Layout>
  )
}

export default ProductDetails
