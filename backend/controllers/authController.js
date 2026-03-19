import { token } from "morgan";
import { copmparePassword, hashpassword } from "../helpers/authHelper.js";
import usermodel from "../models/usermodel.js"
import jwt from 'jsonwebtoken'
import orederModel from '../models/orderModel.js'
export const registerController = async (req,res)=>{
try{
const {name,email,password,phone,address,question}= req.body;

// Validation

if(!name){
    return res.send({
       message:'Name is Required'
    })
}
if(!email){
    return res.send({
       message:'Email is Required'
    })
}

if(!password){
    return res.send({
       message:'Password is Required'
    })
}
if(!phone){
    return res.send({
       message:'Phone Number is Required'
    })
}
if(!address){
    return res.send({
       message:'Address is Required'
    })
}

if(!question){
    return res.send({
       message:'answer is Required'
    })
}
// checking user
const existinguser = await usermodel.findOne({email})
// checking Exiting User 
if(existinguser){
    return res.status(200).send({
        message:'Already Registered Please Login',
        success:false
    })
}
// Register user 

const hashedpassword = await hashpassword(password)

// save 

const user= await new usermodel({name,email,phone,address,password:hashedpassword,question}).save()

res.status(201).send({
    success:true,
    message:'User Registerd Successfully',
    user
})



}catch(error){
    res.status(500).send(
        {
            success:false,
            message:'Error in Registeration',
            error
        }
    )
}
}

export const loginController = async (req,res)=>{
    try{
            const {email,password} = req.body;

            if(!email || ! password){
                return res.status(404).send({
                    message:'Invailed Email or Password',
                    success:false
                })
            }
            // check user
            const user = await usermodel.findOne({email})
            if(!user){
                return res.status(404).send(
                    {
                        success:false,
                        message:'Email is not Registerd'
                    }
                )
            }
            const match = await copmparePassword(password,user.password)
            if(!match){
                return res.status(200).send({
                    message:'Invailed Password',
                    success:false
                }) 
            }
            // Token 

            const token = await jwt.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
            res.status(200).send({
                message:'Login Successfully',
                success:true,
                user:{
                    name:user.name,
                    email:user.email,
                    phone: user.phone,
                    address:user.address,
                    role:user.role,
                    
                },
                token
            }) 
    }catch(error){
        console.log(error)
        res.status(500).send(
            {message:'Error in Login',error,success:false}
        )
    }
}

// forgot password controller

export const forgotPasswordController = async (req,res)=>{
try {
    const {email,question,newPassword} = req.body;
    if(!email){
      return  res.status(400).send({
            message: "Emial is Required"
        })
    }

    if(!question){
      return  res.status(400).send({
            message: "Question is Required"
        })
    }

    if(!newPassword){
     return   res.status(400).send({
            message: "New Password  is Required"
        })
    }

    // Check Email and Answer

    const user = await usermodel.findOne({email,question})

    // Validation

    if(!user){
        return res.status(404).send({
            success:false,
            message:"Wrong Email or Answer"
        })
    }

    const hashed = await hashpassword(newPassword)
    await usermodel.findByIdAndUpdate(user._id,{password:hashed})

    res.status(200).send(
        {
            success:true,
            message:"Password Reset Successfully"
        }
    )
} catch (error) {
    res.status(500).send(
        {
            success:false,
            message:"something went wrong",
            error
        }
    )
}
}
// Test Controller

export  const testController  = (req,res)=>{
   res.send('Protected Routes')

}

//Update Profile


export const updateProfileController = async (req,res)=>{
    try {
        const {name,email,password,address,phone} = req.body;

        const user = await usermodel.findById(req.user._id)

        // password check

        if(password && password.length < 6){
            return res.json({error:'password is Required and 6 character long'})
        }

        const hashedpassword = password ? await hashpassword(password) : undefined
        const upadatedUser = await usermodel.findByIdAndUpdate(req.user._id,{
            name:name || user.name,
           password: hashedpassword || user.password,
           phone : phone || user.phone,
           address : address || user.address
        },{new:true})
         
        res.status(200).send({
            success:true,
            message:'Profile Updated Successfully',
            upadatedUser
        })
    } catch (error) {
        console.log(error)
        res.status(400).send({
            success:false,
            message:"Error While Updating User Profile",
            error
        })
    }
}

    export const getOrdersController = async (req,res)=>{
        try {
            const orders = await orederModel.find({buyer:req.user._id}).populate("products","-photo").populate("buyer","name")
            res.json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message: 'Error While Getting Orders',
                error
            })
        }
    }



    //all orders

    export const getAllOrdersController = async (req,res)=>{
        try {
            const orders = await orederModel.find({}).populate("products","-photo").populate("buyer","name")
            .sort("-createdAt");
            res.json(orders)
        } catch (error) {
            console.log(error)
            res.status(500).send({
                success:false,
                message: 'Error While Getting Orders',
                error
            })
        }
    }

// order status 

export const orderStatusController = async(req,res)=>{
            try {
                
                const {orderId} = req.params;
                const {status} = req.body;

                const oreders = await orederModel.findByIdAndUpdate(orderId,{status}, {new:true})

                res.json(oreders)
            } catch (error) {
                console.log(error)
                res.status(500).send(
                    {success:false,
                    message:'error while updating order status',
                    error
                    }
                )
            }
}