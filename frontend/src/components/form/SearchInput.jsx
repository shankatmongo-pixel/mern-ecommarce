import React, { useState } from 'react'
import { useSearch } from '../../context/SearchContext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


const SearchInput = () => {
    const [value,setValue] = useSearch()
    const navigate = useNavigate()

    const handleSsubmit = async (e)=>{
         e.preventDefault();  
        try {
              const {data} = await axios.get(`http://localhost:5000/api/v1/product/search/${value.keyword}`) 
              setValue({...value, result:data}) 
              navigate ("/search");
        } catch (error) {
            console.log(error)

        }
    }
  return (
    <div>
     <form className="d-flex" role="search" onSubmit={handleSsubmit}>
  <input className="form-control me-2"
   type="search"
    placeholder="Search"
     aria-label="Search" 
   value={value.keyword}
   onChange={(e) => setValue({...value, keyword:e.target.value})}
   
   />
  <button className="btn btn-outline-success" type="submit">Search</button>
</form>

    </div>
  )
}

export default SearchInput

