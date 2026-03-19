import express from 'express'
import { isAdmin, requireSignin } from '../middlewares/authMiddleware.js';
import { categoryController, cteateCategoryController, deletCategoryController, singleCategoryController, updateCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// routes
// Create Category
router.post('/create-category',requireSignin,isAdmin,cteateCategoryController)

// Update Category

router.put('/update-category/:id',requireSignin,isAdmin,updateCategoryController)

// Getall Category

router.get('/get-category', categoryController)

// Single Category 
router.get('/single-category/:slug', singleCategoryController)

export default router

// Delete Category

router.delete('/delete-category/:id', requireSignin,isAdmin, deletCategoryController);