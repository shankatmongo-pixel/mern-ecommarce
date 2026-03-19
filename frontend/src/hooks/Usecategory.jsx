import axios from "axios";
import { useEffect, useState } from "react";

export default function Usecategory(){
    const [categories,setCategories] = useState([])



    // get categories


    const getCategories = async ()=>{
        try {
            const {data} = await axios.get(`https://mern-ecommarce.onrender.com/api/v1/category/get-category`)
            setCategories(data?.category)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])

    return categories;
}