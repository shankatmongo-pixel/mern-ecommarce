import axios from "axios";
import { useEffect, useState } from "react";

export default function Usecategory(){
    const [categories,setCategories] = useState([])



    // get categories


    const getCategories = async ()=>{
        try {
            const {data} = await axios.get(`http://localhost:5000/api/v1/category/get-category`)
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