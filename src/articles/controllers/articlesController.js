// src/articles/controllers/articlesController.js
import slugify from 'slugify';
import { models } from '../../models/index.js';

class ArticlesController {
	// Método para renderizar o formulário de criação de artigos
	async showFormArticle(_req, res) {
		try {
			const categories = await models.Category.findAll(); 
			res.render('articles/FormNewArticle', { categories });
		} catch (error) {
			console.error('Erro ao carregar formulário:', error);
			res.status(500).send('Erro ao carregar formulário');
		}
	}

	// Método para criar um novo artigo
	async createArticle(req, res) {
		try {
			const { title, body, category } = req.body;
			const slug = slugify(title).toLowerCase();

			await models.Article.create({
				title,
				slug,
				body,
				categoryId: category
			});

			res.redirect('/articles/table');
		} catch (error) {
			console.error('Erro ao criar artigo:', error);
			const categories = await models.Category.findAll();
			res.render('articles/FormNewArticle', {
				categories,
				error: 'Erro ao criar artigo'
			});
		}
	}

	// Método para mostrar tabela de artigos
	async showTableArticles(_req, res) {
		try {
			const articles = await models.Article.findAll({
				include: {
					model: models.Category,
					as: 'category'
				}
			});

			res.render('articles/tableArticles', { articles });
		} catch (error) {
			console.error('Erro ao renderizar a tabela de artigos:', error);
			res.status(500).send('Erro ao renderizar a tabela de artigos');
		}
	}
}

export default new ArticlesController();
