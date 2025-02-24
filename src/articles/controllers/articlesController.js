import slugify from 'slugify';
import striptags from 'striptags';

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

			// Remove tags HTML do body antes de salvar
			const plainBody = striptags(body);

			const upperCaseTitle = title.toUpperCase();

			await models.Article.create({
				title: upperCaseTitle,
				slug,
				body: plainBody, // Usa o body limpo
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

	// Método para renderizar a tabela de artigos
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

	// Método para excluir categoria
	async deteteArticle(req, res) {
		try {
			const id = parseInt(req.params.id, 10);

			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).json({ message: 'Id inválido' });
			}

			const deletedArticle = await models.Article.destroy({ where: { id } });

			if (deletedArticle === 0) {
				return res.status(400).json({ message: 'Artigo não encontrado.' });
			}

			res.redirect('/articles/table');
		} catch (error) {
			console.error('Erro ao excluir artigo:', error);
			res.status(500).send('Erro ao excluir artigo.');
		}
	}

	// Método para renderizar o formulário de edição de Artigo
	async showFormEdit(req, res) {
		try {
			const id = parseInt(req.params.id, 10);

			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).render('error', {
					message: 'ID de artigo inválido'
				});
			}

			const editArticle = await models.Article.findByPk(id);

			if (!editArticle) {
				return res.status(404).render('error', {
					message: 'Artigo não encontrado'
				});
			}

			const categories = await models.Category.findAll();

			// Remove todas as tags HTML do body
			const plainBody = striptags(editArticle.body);

			res.render('articles/formEditArticle', {
				article: { ...editArticle.dataValues, body: plainBody },
				categories: categories
			});
		} catch (error) {
			console.error('Erro ao carregar formulário de edição:', error);
			res.status(500).render('500', {
				message: 'Erro interno ao carregar a página de edição'
			});
		}
	}

	// Método para atualizar um artigo
	async updateArticle(req, res) {
		try {
			const { title, body, category } = req.body;

			const id = req.params.id;

			const upperCaseTitle = title.toUpperCase();
			const slug = slugify(title).toLowerCase();

			await models.Article.update(
				{
					title: upperCaseTitle,
					slug,
					body: body,
					categoryId: category 
				},
				{
					where: { id }
				}
			);

			res.redirect('/articles/table');
		} catch (error) {
			console.error('Erro ao atualizar artigo:', error);
			res.status(500).render('500', {
				message: 'Erro ao atualizar artigo'
			});
		}
	}
}

export default new ArticlesController();
