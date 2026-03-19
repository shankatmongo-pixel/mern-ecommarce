import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import AdminMenu from '../../layout/AdminMenu'
import { toast } from 'react-toastify'
import axios from 'axios'
import {Select} from 'antd'
import { useNavigate,useParams } from 'react-router-dom'



const UpdateProduct = () => {

const params = useParams()
 const navigate = useNavigate()
  const [categories,SetCategories] = useState([])
  const [name, setName] = useState("")
   const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
     const [category, SetCategory] = useState("")
      const [quantity, setQuantity] = useState("")
      const [shipping,setShipping] = useState("")
      const [photo,setaphoto] = useState()

      const [id, setId] = useState("")

        //GET SINGLE PRODUCT

        const getSingleProduct = async ()=>{
            try {
                const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/product/get-product/${params.slug}`)
                setName(data.product.name)
                setDescription(data.product.description)
                setPrice(data.product.price)
                setQuantity(data.product.quantity)
                setId(data.product._id)
                SetCategory(data.product.category._id)


            } catch (error) {
                console.log(error)
            }
        }

            useEffect(()=>{
                getSingleProduct();
                // eslint-diable-next-line
            },[])
      // get all categories

      const getAllCategory = async ()=>{
    try {
      const {data} = await axios.get('https://mern-ecommarce.onrender.com/api/v1/category/get-category')

      if(data.success){
        SetCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong Getting Categories')

    }
  }

  useEffect (()=>{
      getAllCategory()
    },[])

    // create product function
 
    const handleUpdate = async(e)=>{
        e.preventDefault()

        try {
          const productData = new FormData()
          productData.append("name",name)
          productData.append("description",description)
          productData.append("price",price)
          productData.append("quantity",quantity)
          photo && productData.append("photo",photo)
          productData.append("category",category)
          
            const {data} =  await axios.put(`https://mern-ecommarce.onrender.com/api/v1/product/update-product/${id}`,
            productData
          )

          if(data?.success){
           toast.success('Product Updated Successfully')
           navigate ("/dashboard/admin/products")
          }else{   
             toast.error(data?.message)
          }
        } catch (error) {
          console.log(error)
          toast.error('Something Went Wrong')
        }
    }

//      DELETE PRODUCT

const handleDelete = async ()=>{
       try {
        let answer = window.prompt('Are You Sure Want to Delete This Product') 
        if(!answer)return;
        const {data} = await axios.delete(`https://mern-ecommarce.onrender.com/api/v1/product/delete-product/${id}`)
        toast.success('Product Deleted Successfully')
        navigate('/dashboard/admin/products')
       } catch (error) {
        console.log(error)
        toast.error('Something Went Wrong ')
       }
}
  return (
    <Layout title={'Dashboard - Create Product'}>
          <div className="container-fluid m-3 p-3">
   <div className="row">
    <div className="col-md-3">
        <AdminMenu />
    </div>
    <div className="col-md-9">
        <h1>UPDATE PRODUCT</h1>
        <div className="m-1 w-75">
            <Select bordered = {false}
             placeholder = "Select a Category" 
             size='large'
              showSearch
               className='form-select mb-3'
                onChange={(value)=>{SetCategory(value)}}
                 value={category}
                 >
                {categories?.map(c => (
                    <Option key={c._id} value={c._id}>
                        {c.name}
                        </Option>
                ))}

            </Select>
            <div className="mb-3">
                <label className='btn btn-outline-secondary col-md-12'>
                    {photo ? photo.name :  "Upload Photo" }
                <input type="file"  name='photo' accept='image/*' onChange={(e)=>setaphoto(e.target.files[0])} hidden/>
                </label>
            </div>

            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img src={URL.createObjectURL(photo)} alt="Product Photo" height={'200px'} className='img img-responsive'/>
                </div>
              ):(
                <div className="text-center">
                  <img src={`https://mern-ecommarce.onrender.com/api/v1/product/product-photo/${id}`} alt="Product Photo" height={'200px'} className='img img-responsive'/>
                </div>
              )}
            </div>
            <div className="mb-3">
              <input type="text" value={name} placeholder='Write a Name ' className='form-control' onChange={(e)=>setName(e.target.value)} />
            </div>
            
              <textarea className='col-md-12' placeholder='Write a Description' value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
            
             <div className="mb-3">
              <input type="number" value={price} placeholder='Write a Price' className='form-control' onChange={(e)=>setPrice(e.target.value)} />
            </div>
             <div className="mb-3">
              <input type="number" value={quantity} placeholder='Write a Quantity ' className='form-control' onChange={(e)=>setQuantity(e.target.value)} />
            </div>
              <div className="mb-3">
               <Select bordered = {false} placeholder = "Select Shipping" size='large' showSearch className='form-select mb-3'
                onChange={(value)=>{setShipping(value)}} value={shipping ? "Yes" : "No"}>
                <option value="0">No</option>
                <option value="1">Yes</option>
               </Select>
              </div>
              <div className="mb-3">
                <button className='btn btn-primary' onClick={handleUpdate}>UPDATE PRODUCT</button>
              </div>

               <div className="mb-3">
                <button className='btn btn-danger' onClick={handleDelete}>DELETE PRODUCT</button>
              </div>
        </div>
    </div>
   </div>
   </div>
   </Layout>
  )
}

export default UpdateProduct
