import React, { useEffect, useState } from 'react'
import AdminMenu from '../../layout/AdminMenu'
import Layout from '../../layout/Layout'
import { toast } from 'react-toastify'
import axios from 'axios'
import CatrgoryForm from '../../form/CatrgoryForm'

import { Modal } from 'antd'

const CreateCategory = () => {

  const [category,SetCategory] = useState([])
  const [name, setName] = useState ("")
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null)
  const  [updatedName, setUpdtedName] = useState("")


  // handle form

  const handleSubmit = async(e)=>{
     
      try {
         e.preventDefault()
        const {data} = await axios.post('https://mern-ecommarce.onrender.com/api/v1/category/create-category',{name})
        if(data?.success){
          toast.success(`${name} is Cteated`)
          getAllCategory()
        }else{
          toast.error(`${data.message}`)
        }
        
      } catch (error) {
        console.log(error)
        toast.error('Something Went Wrong Input Form')
      }
  }


  // get all categories

  const getAllCategory = async ()=>{
    try {
      const {data} = await axios.get('https://mern-ecommarce.onrender.com/api/v1/category/get-category')

      if(data?.success){
        SetCategory(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong Getting Categories')

    }
  }

  useEffect (()=>{
    getAllCategory()
  },[])

  // update Category

  const handleUpdate = async (e)=>{
        e.preventDefault()

        try {
          const  {data} = await axios.put(`https://mern-ecommarce.onrender.com/api/v1/category/update-category/${selected._id}`,{name:updatedName})

          if(data.success){
            toast.success(`${updatedName} is Updated`)
            setSelected(null)
            setUpdtedName("")
            setVisible(false)
            getAllCategory()
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error('Somthing Went Wrong')
        }
  }
// delete category 

const handleDelete = async (id)=>{
        

        try {
          const  {data} = await axios.delete(`https://mern-ecommarce.onrender.com/api/v1/category/delete-category/${id}`,{name:updatedName})

          if(data.success){
            toast.success(`Category is Deleted`)
           
           
           
            getAllCategory()
          }else{
            toast.error(data.message)
          }
        } catch (error) {
          console.log(error)
          toast.error('Somthing Went Wrong')
        }
  }


  return (
    <Layout title={'Dashboard - Create Category'}>
     <div className="container-fluid m-3 p-3">
   <div className="row">
    <div className="col-md-3">
        <AdminMenu />
    </div>
    <div className="col-md-9">
        <h1>Manage Category</h1>
        <div className="p-3 w-50">
          <CatrgoryForm  handleSubmit={handleSubmit} value = {name} setValue = {setName}/>
        </div>
        <div className='w-75'>
         <table className="table">
  <thead>
    <tr>
      
      <th scope="col">Name</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
   
    
   
    {category?.map(c => (
     
      <tr  key={c._id}>
      <td>{c.name}</td>
      <td>
      <button className='btn btn-primary ms-2' 
      onClick={()=>{
        setVisible(true);
       setUpdtedName(c.name);
       setSelected(c);
         }}>EDIT</button>
      <button className='btn btn-danger ms-2'
      onClick={()=>{handleDelete(c._id)}}
      >DELETE</button>
      </td>

        </tr>
     
      
    ))}
 
  </tbody>
</table>

        </div>
    </div>
   <Modal
  open={visible}
  onCancel={() => setVisible(false)}
  footer={null}
>
  <CatrgoryForm
    value={updatedName}
    setValue={setUpdtedName}
    handleSubmit={handleUpdate}
  />
</Modal>

   </div>
   </div>
   </Layout>
  )
}

export default CreateCategory
