import express from 'express';
import ArticlesController from '../controllers/articlesController.js';

const articlesRouter = express.Router();

// rota para renderizar o formulário para criação de artigos
articlesRouter.get('/articles/new', ArticlesController.showFormArticle);



export default articlesRouter;