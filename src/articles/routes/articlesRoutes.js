import express from 'express';
import ArticlesController from '../controllers/articlesController.js';

const articlesRouter = express.Router();

// rota para renderizar o formulário para criação de artigos
articlesRouter.get('/articles/new', ArticlesController.showFormArticle);

// rota para renderizar a tabela de artigos
articlesRouter.get('/articles/table', ArticlesController.showTableArticles);

// rota para criação de artigos
articlesRouter.post('/articles/save', ArticlesController.createArticle);

// rota para excluir uma artigo
articlesRouter.delete('/articles/:id', ArticlesController.deteteArticle);

// rota para renderizar o formulário para edição de Artigo
articlesRouter.get('/articles/formEditArticle/:id', ArticlesController.showFormEdit);

// rota para editar um artigo
articlesRouter.put('/articles/update/:id', ArticlesController.updateArticle);


export default articlesRouter;