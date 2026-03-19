import categoryModel from "../models/categoryModel.js";
import slugify from "slugify";


export const cteateCategoryController = async(req,res)=>{
        try {
            const {name}= req.body;

            if(!name){
                return res.status(401).send({message:"Name is Reqquired"})
            }

            const existingCategory = await categoryModel.findOne({name})

            if(existingCategory){
                return res.status(200).send({
                    success:true,
                    message:'Category Alredy Exists'
                })
            }
            const category = await new categoryModel({name,slug:slugify(name)}).save()
            res.status(201).send({
                success:true,
                message :'New Category Created',
                category

            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:"Error in Category"
            })
        }
}

// update Category

export  const updateCategoryController = async (req,res)=>{
        try {
            const {name} = req.body;
            const {id} =req.params
            const category = await categoryModel.findByIdAndUpdate(id,{name, slug:slugify(name)},{new:true})
            res.status(200).send(
                {
                    success:true,
                    message:'Category Updated',
                    category
                }
            )
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:'Error While UpdatinCategory'
            })
        }
}

// Get all Catogory

export const categoryController = async (req,res)=>{
        try {
            const category = await categoryModel.find({})
            res.status(200).send({
                success:true,
                message:'All Categories List',
                category
            })
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                error,
                message:'Error While Getting All Categories'
            })
        }
}

// single category
export const singleCategoryController = async (req,res)=>{
    try {
        
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success:true,
            message:'Get Single Category Successfully',
            category
        })
    } catch (error) {
        console.log(error)
        res.status(500).send(
            {
                success:false,
                error,
                message:'Error While Getting Single Category'
            }
        )
    }
}

// Delete Category 

export const deletCategoryController = async (req,res)=>{
        try {
            const {id} = req.params;
            await categoryModel.findByIdAndDelete(id)
            res.status(200).send(
                {
                    success:true,
                    message:'Category Deleted SuccessFully'
                }
            )
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message: 'Error While Deleting Category',
                error
            })
        }
}