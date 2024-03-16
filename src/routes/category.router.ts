import express from "express";
import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/category.controller";

const router = express.Router();

router.post('/createCategory', createCategory);
router.get('/categories', getCategories);
router.get('/category/:id', getCategoryById);
router.patch('/updateCategory/:id', updateCategory);
router.delete('/deleteCategory/:id', deleteCategory);

export default router;