import slugify from 'slugify';
import CategoryModel from '../models/categoriesModel.js';

class CategoriesController {
	// Método para resnderizar o formulario de criação de categorias
	async showFormCategories(_req, res) {
		res.render('categories/FormNewCategory');
	}

	// Método para criar uma nova categoria
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

	// Método para resnderizar a tabela com as categorias
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

	// Método para excluir categoria
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
			res.redirect('/categories/table');
		} catch (error) {
			console.error('Erro ao deletar categoria:', error);
		}
	}

	// Método para resnderizar o formulário de edição de categoria
	async showFormEdit(req, res) {
		try {
			const id = parseInt(req.params.id, 10);
			console.log('ID recebido:', id); // Adicione este log

			// Validação do ID
			if (!Number.isInteger(id) || id <= 0) {
				return res.status(400).render('error', {
					message: 'ID de categoria inválido'
				});
			}

			// Busca a categoria
			const editCategory = await CategoryModel.findByPk(id);
			console.log('Categoria encontrada:', editCategory); // Adicione este log

			// Verifica se a categoria existe
			if (!editCategory) {
				return res.status(404).render('error', {
					message: 'Categoria não encontrada'
				});
			}

			res.render('categories/formEditCategory', { category: editCategory });
		} catch (error) {
			console.error('Erro ao carregar formulário de edição:', error);
			res.status(500).render('500', {
				message: 'Erro interno ao carregar a página de edição'
			});
		}
	}
}

export default new CategoriesController();
