import { error } from "console";
import productModel from "../models/productModel.js"
import fs from 'fs';
import slugify from "slugify";
import categoryModel from "../models/categoryModel.js"
import braintree from "braintree";

import orderModel from "../models/orderModel.js"; 
import dotenv from 'dotenv'

dotenv.config()


// payment gateway

 var geteway = new braintree.BraintreeGateway(
    {
        environment: braintree.Environment.Sandbox,

        merchantId: process.env.BRAINTREE_MERCHANT_ID,
       publicKey : process.env.BRAINTREE_PUBLIC_KEY,
        privateKey: process.env.BRAINTREE_PRIVATE_KEY
    }
 );


export const createProductController = async (req,res)=>{
    try {
        const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files;

        // validation

        switch(true){
            case!name:
            return res.status(500).send({error:'Name is Required'})

             case!description:
            return res.status(500).send({error:'Description is Required'})

             case!price:
            return res.status(500).send({error:'Price is Required'})

             case!category:
            return res.status(500).send({error:'Category is Required'})

             case!quantity:
            return res.status(500).send({error:'Quantity is Required'})

             case photo && photo.size > 1000000:
            return res.status(500).send({error:'Photo is Required and Should be less then 1mb'})
        }

        
        const product = new productModel({...req.fields,slug:slugify(name)})
  
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success:true,
            message:'Product Create Successfully',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in Creating Product'
        })


    }
}

// get product

export const getProductController = async(req,res)=>{
    try {
        
        const product = await productModel.find({}).populate('category').select("-photo").limit(12).sort({createdAt:-1})
        res.status(200).send({
            success:true,
              total_count:product.length,
            message:'All Products',
            product
          
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success :false,
            message:'Error in Getting Product',
            error:error.message
        })
    }
}


// get single product


export const getSingleProduct = async (req,res)=>{

    try {
        const product = await productModel.findOne({slug:req.params.slug}).select("-photo").populate('category')
        res.status(200).send({
            success:true,
            message:'Single Product Fetched',
            product
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Eroor While Getting Single Product',
            error: error.message
        })
    }

}

export const productPhotoController = async (req,res)=>{
        try {
           const product = await productModel.findById(req.params.pid).select('photo')
           if(product.photo.data){
                res.set('Content-Type', product.photo.contentType)
                return res.status(200).send(product.photo.data)
           } 
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error While Getting Product Photo',
                error
            })
        }
}


export const deleteProductController = async (req,res)=>{
    try {
        await productModel.findByIdAndDelete(req.params.pid).select('-photo')
        res.status(200).send({
            success:true,
            message:"Product Deleted Successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error While Deleting Product',
            error
        })
    }
}
/// update product

export const updateaProductController = async (req,res)=>{
        try {


             const {name,slug,description,price,category,quantity,shipping} = req.fields
        const {photo} = req.files;

        // validation

        switch(true){
            case!name:
            return res.status(500).send({error:'Name is Required'})

             case!description:
            return res.status(500).send({error:'Description is Required'})

             case!price:
            return res.status(500).send({error:'Price is Required'})

             case!category:
            return res.status(500).send({error:'Category is Required'})

             case!quantity:
            return res.status(500).send({error:'Quantity is Required'})

             case photo && photo.size > 100000:
            return res.status(500).send({error:'Photo is Required and Should be less then 1mb'})
        }

        
        const product = await productModel.findByIdAndUpdate(
  req.params.id,
  { ...req.fields, slug: slugify(name) },
  { new: true }
)

  
        if(photo){
            product.photo.data = fs.readFileSync(photo.path)
            product.photo.contentType = photo.type
        }
        await product.save()
        res.status(201).send({
            success:true,
            message:'Product Update Successfully',
            product
        })
            
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message:'Error While Updating Product'
            })
        }
}
// filter 

export const productFilterController = async(req,res)=>{
    try {
        const {checked,radio} = req.body;
        let args = {}
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = {$gte: radio[0], $lte:radio[1]}
        const product = await productModel.find(args)
        res.status(200).send(
            {
                success:true,
                product
            }
        )
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error While Filtering Products",
            error
        })
    }
}
export const productCountController = async(req,res)=>{
    try {
        const total = await productModel.find({}).estimatedDocumentCount()
        res.status(200).send(
            {
                success:true,
                total
            }
        )
    }catch(error){
        console.log(error)
             res.status(400).send(
            {
                message:'Error In Product Count',
                success:false,
                error
            }
        )
    }
}

// product list base on price

export const productListController = async (req, res) => {
  try {
    const perPage = 6;

    // convert page to number
    const page = Number(req.params.page) || 1;

    const product = await productModel
      .find({})
      .select("-photo")
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      product,
    });

  } catch (error) {
    console.log("PRODUCT LIST ERROR:", error);
    res.status(400).send({
      success: false,
      message: "Error in page list",
      error,
    });
  }
};


// Search Product

export const searcProducthController = async(req,res)=>{
    try {
        const {keyword} = req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}}
            ]
        }).select("-photo")
        res.json(result)
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error in Search Product API"
        })
    }
}

export const relatedProductController = async(req,res)=>{
    try {
        const {pid,cid}= req.params;

        const product = await productModel.find({
            category:cid,
            _id:{$ne:pid}
        }).select("-photo").limit(3).populate('category')

        res.status(200).send({
            success:true,
            product
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error While Getting Related Product"
        })
    }
}


// get product by category

export const productCategoryController = async (req,res)=>{
    try {
        const category = await categoryModel.findOne({slug:req.params.slug})

        const products = await productModel
          .find({ category: category?._id })      
          .populate('category')

        res.status(200).send({
            success:true,
            category,
            products
        })
    } catch (error) {
        console.log(error)
        res.status(401).send({
            success:false,
            error,
            message:"error while getting products"
        })
        
    }
}

// token

export const braintreeTokenController = async(req,res)=>{
        try {
            geteway.clientToken.generate({

            },function(err,response){
                if(err){
                    res.status(500).send(err)
                }else{
                    res.send(response)
                }
            })
        } catch (error) {
            console.log(error)
        }
}

// payments

export const brainTreePaymentsController = async(req,res)=>{

    try {
        const {cart,nonce} = req.body;
        let total = 0
        cart.map((i) => {
            total += i.price
        });

        let newTransaction = geteway.transaction.sale({
            amount : total,
            paymentMethodNonce : nonce,
            options : {
                submitForSettlement :true
            }
        },
        function(error,result){
            if(result){
                const order =   new orderModel({
                     products: cart.map((item) => item._id), 
                    payment:result,
                    buyer : req.user._id
                }).save()
                res.json({ok:true})
            }else{
                res.status(500).send(error)
            }
        }
    
    )
    } catch (error) {
        console.log(error)
    }

}
