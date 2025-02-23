import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();


// rota para renderizar o formulário para criação de categorias
categoriesRouter.get('/categories/new', CategoriesController.showFormCategories);

// rota para renderizar a tabela de categorias
categoriesRouter.get('/categories/table', CategoriesController.showTableCategories);

// rota para criação de categorias
categoriesRouter.post('/categories/save', CategoriesController.createCategory);


categoriesRouter.delete('/categories/:id', CategoriesController.deleteCategory);


categoriesRouter.get('/categories/formEditCategory/:id', CategoriesController.showFormEdit);


categoriesRouter.put('/categories/update/:id', CategoriesController.updateCategory);





export default categoriesRouter;