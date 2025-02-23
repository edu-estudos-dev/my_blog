import slugify from 'slugify';
import ArticleModel from '../../articles/models/articlesModel.js';
import CategoryModel from '../../categories/models/categoriesModel.js';

class ArticlesController {
	// Método para resnderizar o formulario de criação de Artigos
	async showFormArticle(_req, res) {
		const categories = await CategoryModel.findAll();
		res.render('articles/FormNewArticle', { categories });
	}

	// Método para criar uma nova categoria
	async createArticle(req, res) {
		try {
			const { title, body, category } = req.body;

			const slug = slugify(title).toLowerCase();

			const article = await ArticleModel.create({
				title,
				slug,
				body,
				categoryId: category
			});

			console.log('Artigo criado:');
			res.send('tabela de artigos');
			// res.redirect('/article/table');
		} catch (error) {
			console.error('Erro ao criar artigo:', error);
			const categories = await CategoryModel.findAll();
			res.render('articles/FormNewArticle', {
				categories,
				error: 'Erro ao criar artigo'
			});
		}
	}
}

export default new ArticlesController();
