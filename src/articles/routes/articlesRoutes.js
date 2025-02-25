import express from 'express';
import ArticlesController from '../controllers/articlesController.js';

const articlesRouter = express.Router();

// rota para renderizar o formulário para criação de artigos
articlesRouter.get('/articles/new', ArticlesController.showFormArticle);

// rota para criação de artigos
articlesRouter.post('/articles/save', ArticlesController.createArticle);

// rota para excluir uma artigo
articlesRouter.delete('/articles/:id', ArticlesController.deleteArticle); 

// rota para renderizar o formulário para edição de Artigo
articlesRouter.get('/articles/formEditArticle/:id', ArticlesController.showFormEdit);

// rota para renderizar a tabela de artigos
articlesRouter.get('/articles/table', ArticlesController.showTableArticles);

// rota para renderizar a pagina de artigos de uma categoria
articlesRouter.get('/categories/:id/articles', ArticlesController.getArticlesByCategory);

// rota para editar um artigo
articlesRouter.put('/articles/update/:id', ArticlesController.updateArticle);

// rota para pegar uma artigo por slug
articlesRouter.get('/articles/:slug', ArticlesController.getArticleBySlug);

// rota de paginação
articlesRouter.get('/articles/page/:num', ArticlesController.createPagination);


export default articlesRouter;