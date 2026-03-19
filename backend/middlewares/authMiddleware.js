import jwt from 'jsonwebtoken'
import usermodel from '../models/usermodel.js'

// Protected Routes Token base

export const requireSignin = async (req,res,next)=>{

try{
    const decode = jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    req.user = decode;
    next()
}catch(error){
    console.log(error)
}
}

// Admin Access 
export  const isAdmin = async (req,res,next)=>{
    try{
            const user = await usermodel.findById(req.user._id)
            if(user.role !==1){
                return res.status(401).send(
                   { success:false,
                    message: 'unauthorized Access'}
                )
            }else{
                next();
            } 
    }catch(error){
        console.log(error)
        res.status(401).send(
            {
                success:false,
                error,
                message:'Error in Admin Middleware'
            }
        )
    }
}