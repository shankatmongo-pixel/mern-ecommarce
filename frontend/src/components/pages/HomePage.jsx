import React, { useEffect, useState } from 'react'
import Layout from '../layout/Layout'

import { toast } from 'react-toastify'
import axios from 'axios'
import {Checkbox,Radio} from 'antd'
import { prices } from '../prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../../context/Cart'

import { AiOutlineReload } from "react-icons/ai";

import "../../style/HomePage.css"


const HomePage = () => {
  const navigate = useNavigate()

  const [cart, setCart] = useCart()
  
  const [product, setProduct] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] =useState(false)

  


  // get all categories

  const getAllCategory = async ()=>{
    try {
      const {data} = await axios.get('https://mern-ecommarce.onrender.com/api/v1/category/get-category')

      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect (()=>{
    getAllCategory()
    getTotal()
  },[])

  // get all products function

  const getAllProducts = async ()=>{
      try {
        setLoading(true)
        const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/product/product-list/${page}`)
        setLoading(false)
        setProduct(data.product)
      } catch (error) {
        console.log(error)
        toast.error()
        setLoading(false)
      }
  }

  // filter by category 

  const handleFilter = (value,id)=>{
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
     all = all.filter(c => c !== id)
    }
    setChecked(all)
  }



  // get total count

  const getTotal = async()=>{
    try {
      const {data} =  await axios.get('https://mern-ecommarce.onrender.com/api/v1/product/product-count')
      setTotal(data?.total)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
  if(page === 1){
    getAllProducts();
  }else{
    loadMore();
  }
},[page])
  //load more

  const loadMore = async ()=>{
    try {
      setLoading(true)
      const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProduct(prev => [...prev, ...data.product])
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }











  useEffect(
    ()=>{
      if(!checked.length && !radio.length)   getAllProducts();
     
    },[checked.length, radio.length]
  )

  useEffect(()=>{
    if(checked.length || radio.length)  filterProduct()
   
  },[checked,radio])

  // get filtered products

  const  filterProduct = async()=>{
    try {
        const {data} = await axios.post(`https://mern-ecommarce.onrender.com/api/v1/product/product-filter`,{checked,radio})
        setProduct(data?.product)
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <Layout title={"All Products - Best Offers"}>
      {/* banner image */}

      <img src="/images/banner.png" alt="Banner"  width={'100%'} className='banner-img'/>

      <div className=" container-fluid row mt-3 home-page">
        <div className="col-md-2 filters">
          <h6 className='text-center text-muted'>FILTER BY CATEGORY</h6>
          <div className="d-flex flex-column">
              {categories?.map(c => (
              
            <Checkbox key={c._id} onChange={(e)=>handleFilter(e.target.checked,c._id)}>
            {c.name}
              </Checkbox>
             
          ))}
          </div>
          {/* price filter */}

           <h4 className='text-center mt-4'>Fliter by Price</h4>
          <div className="d-flex flex-column">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {prices?.map(p => (
                  <div key={p._id}>
                      <Radio value={p.array}>{p.name}</Radio>
                  </div>
                  
                ))}
              </Radio.Group>
          </div>
          <div className="d-flex flex-column">
            <button className='btn btn-danger' onClick={()=>window.location.reload()}>RESET FILTERS</button>
          </div>
          
        </div>
        <div className="col-md-10 products">
          {/* {JSON.stringify(radio,null,4)} */}
          <h1 className='text-center all'>ALL PRODUCTS</h1>
         
          <div className="d-flex flex-wrap justify-content-between ">
            {product?.map(p => (
              
             
            <div className="card m-2 all-product" key={p._id}>
  <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
  <div className="card-body">
    <div className='card-name-price'>
    <h5 className="card-title">{p.name}</h5>
    <h5 className="card-title card-price">
                      {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </h5>
                     </div> 
    <p className="card-text">{p.description.substring(0,60)}</p>
       <div className="card-name-price">
     <button  className="btn btn-primary ms-2" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
       <button  className="btn btn-secondary ms-2"
        onClick={()=>{
          setCart([...cart,p])
          localStorage.setItem('cart',JSON.stringify([...cart, p]))
          toast.success('Item Added to Cart')
        
        }
        }
        >ADD TO CART</button>

        </div>
   
  </div>
</div>




            ))}

          </div>

            <div className='m-2 p-3'>
          {product && product.length <total && (
            <button className='btn loadmore'
             onClick={(e)=>{
              e.preventDefault();
              setPage(page + 1);
             }}>
                  {loading ? "Loading..." : "Loadmore"}
            </button>
          )}
        </div>
        </div>
      
      </div>
     
    </Layout>
  )
}

export default HomePage
