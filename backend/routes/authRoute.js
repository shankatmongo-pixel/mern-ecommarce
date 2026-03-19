import express from 'express'
import {registerController,loginController,testController, forgotPasswordController, updateProfileController, getOrdersController, getAllOrdersController, orderStatusController} from '../controllers/authController.js'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js'

// router object

const router = express.Router()

// routing
// REGISTER || POST 

router.post('/register', registerController)

// LOGIN || POST

router.post("/login", loginController)

// Test Routes 
router.get('/test',requireSignin, isAdmin, testController)

// protected route 

router.get('/user-auth', requireSignin, (req,res)=>{
    res.status(200).send({ok:true})
})

// protected Admin auth route
router.get('/admin-auth', requireSignin,isAdmin, (req,res)=>{
    res.status(200).send({ok:true})
})
// forgot password || POST

router.post('/forgot-password', forgotPasswordController);

// Update Profile 

router.put('/profile',requireSignin, updateProfileController)

// Orders 

router.get('/orders', requireSignin, getOrdersController)

// All Ordes

router.get('/all-orders', requireSignin,requireSignin,isAdmin, getAllOrdersController)

// order status update

router.put("/order-status/:orderId", requireSignin,isAdmin, orderStatusController)


export default router;