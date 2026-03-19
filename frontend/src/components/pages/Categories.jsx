import React from 'react'
import Layout from '../layout/Layout'
import Usecategory from '../../hooks/Usecategory'
import { Link } from 'react-router-dom'


const Categories = () => {

const categories = Usecategory()



  return (
   <Layout title={'All Categories'}>
        <div className="container">
            <div className="row container">
                {categories.map(c =>(
                         <div className="col-md-6 mt-5 mb-3 gx-3 gy-3" key={c._id}>
                          
                    <div className="card" style={{width:"200px"}}>
                  <Link to={`/categories/${c.slug}`} className='btn btn-primary'>{c.name}</Link>
                  </div>
                  
                </div>
               
                ) )}
               
            </div>
        </div>
   </Layout>
  )
}

export default Categories
