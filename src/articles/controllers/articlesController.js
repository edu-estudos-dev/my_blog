import CategoryModel from '../../categories/models/categoriesModel.js';

class ArticlesController {
	// Método para resnderizar o formulario de criação de Artigos
	async showFormArticle(_req, res) {
		const categories = await CategoryModel.findAll();
		res.render('articles/FormNewArticle', { categories });
	}
}

export default new ArticlesController();
