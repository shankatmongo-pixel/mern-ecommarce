import React, { useEffect, useState } from 'react'
import AdminMenu from '../../layout/AdminMenu'
import Layout from '../../layout/Layout'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Product = () => {
    const [product, setProduct] = useState([])


    // get all products function

    const getAllProducts = async()=>{
        try {
            const {data} = await axios.get('https://mern-ecommarce.onrender.com/api/v1/product/get-product')
            setProduct(data.product);
        } catch (error) {
            console.log(error)
            toast.error('Somthing Went Wrong While Getting Products')
        }
    }

    // lifecycle method

    useEffect(()=>{
        getAllProducts();
    },[])
  return (
   <Layout>
    <div className="container-fluid m-3 p-3">
    <div className="row">
        <div className="col-md-3">
            <AdminMenu />
        </div>
        <div className="col-md-9">
            <h1 className='text-center'>All Product List</h1>
               <div className="d-flex">
            {product?.map(p => (
                <Link to={`/dashboard/admin/product/${p.slug}`} className='product-link'>
             
            <div className="card m-2" style={{width: '18rem'}}>
  <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <h5 className="card-title">{p.name}</h5>
    <p className="card-text">{p.description}</p>
     
    
  </div>
</div>
</Link>



            ))}
       
</div>

        </div>
    </div>
    </div>
   </Layout>
  )
}

export default Product
