import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

categoriesRouter.get('/categories/new', CategoriesController.showFormCategories);
categoriesRouter.get('/categories/table', CategoriesController.showTableCategories);
categoriesRouter.post('/categories/save', CategoriesController.createCategory);
categoriesRouter.delete('/categories/:id', CategoriesController.deleteCategory);


export default categoriesRouter;