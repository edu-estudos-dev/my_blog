import express from 'express';
import CategoriesController from '../controllers/categoriesController.js';

const categoriesRouter = express.Router();

// rota para renderizar o formulário para criação de categorias
categoriesRouter.get('/categories/new', CategoriesController.showFormCategories);

// rota para renderizar a tabela de categorias
categoriesRouter.get('/categories/table', CategoriesController.showTableCategories);

// rota para criação de categorias
categoriesRouter.post('/categories/save', CategoriesController.createCategory);

// rota para excluir uma categoria
categoriesRouter.delete('/categories/:id', CategoriesController.deleteCategory);

// rota para renderizar o formulário para edição de categorias
categoriesRouter.get('/categories/formEditCategory/:id', CategoriesController.showFormEdit);

// rota para editar uma categoria
categoriesRouter.put('/categories/update/:id', CategoriesController.updateCategory);

export default categoriesRouter;