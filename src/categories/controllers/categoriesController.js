import CategoryModel from '../models/categoriesModel.js';
import slugify from 'slugify';

class CategoriesController {
	async showFormCategories(_req, res) {
		res.render('categories/FormNewCategory');
	}

	async createCategory(req, res) {
		try {
			const { title } = req.body;

			if (!title) {
				return res.redirect('/categories/new');
			}

			const upperCaseTitle = title.toUpperCase();
			const slug = slugify(upperCaseTitle).toLowerCase();

			const existingCategory = await CategoryModel.findOne({
				where: { slug }
			});

			if (existingCategory) {
				return res.status(400).send('Categoria já existe');
			}

			const category = await CategoryModel.create({
				title: upperCaseTitle,
				slug
			});

			console.log('Categoria criada:', category.title);
			res.redirect('/categories/table');
		} catch (error) {
			console.error('Erro ao criar categoria:', error);
			res.status(500).send('Erro ao criar categoria');
		}
	}

	async showTableCategories(_req, res) {
		try {
			const categories = await CategoryModel.getAllCategories();
			res.render('categories/tableCategories', { categories });
		} catch (error) {
			console.error(
				'Erro ao renderizar a tabela de categorias:',
				error.message
			);
			res.status(500).send('Erro ao renderizar a tabela de categorias');
		}
	}

	async deleteCategory(req, res) {
		try {
			const id = parseInt(req.params.id, 10);

			// Validação do ID
			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).json({
					message: 'ID de categoria inválido'
				});
			}

			const deletedCount = await CategoryModel.deleteCategory(id);

			if (deletedCount === 0) {
				return res.status(404).json({
					message: 'Categoria não encontrada'
				});
			}
			res.status(204).send();
		} catch (error) {
			console.error('Erro ao deletar categoria:', error);
		}
	}
}

export default new CategoriesController();
