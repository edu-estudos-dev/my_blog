import express from 'express';
import ArticlesController from '../controllers/articlesController.js';

const articlesRouter = express.Router();

// rota para renderizar o formulário para criação de artigos
articlesRouter.get('/articles/new', ArticlesController.showFormArticle);

// rota para renderizar a tabela de artigos
// articlesRouter.get('/categories/table', ArticlesController.showTableArticles);

// rota para criação de artigos
articlesRouter.post('/articles/save', ArticlesController.createArticle);


export default articlesRouter;