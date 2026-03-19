import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { brainTreePaymentsController, braintreeTokenController, createProductController, deleteProductController, getProductController, getSingleProduct, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, relatedProductController, searcProducthController, updateaProductController } from '../controllers/productController.js';
import formidable from 'express-formidable'

const router = express.Router()

// routes

//Create Products

router.post('/create-product', requireSignin,isAdmin,formidable(), createProductController)

// get  all products

router.get('/get-product', getProductController)

// get single product

router.get('/get-product/:slug', getSingleProduct)

// get photo 

router.get('/product-photo/:pid', productPhotoController)

// delete product

router.delete('/delete-product/:pid', deleteProductController)

//update route

router.put("/update-product/:id",requireSignin,isAdmin, formidable(), updateaProductController)

// filter product

router.post('/product-filter', productFilterController  )

// product count

router.get('/product-count', productCountController)

router.get('/product-list/:page', productListController)

// Serch product

router.get('/search/:keyword',searcProducthController)

// Similer Product

router.get('/related-product/:pid/:cid',relatedProductController)


// category vise product
router.get('/product-category/:slug', productCategoryController)


// pyament routes
// token

router.get('/braintree/token', braintreeTokenController)

//payments 

router.post('/braintree/payment',requireSignin, brainTreePaymentsController)

export default router;