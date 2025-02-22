import { DataTypes, Model } from 'sequelize'; // Importe Model do sequelize

class CategoryModel extends Model {
	static initModel(connection) {
		CategoryModel.init(
			{
				title: DataTypes.STRING,
				slug: {
					type: DataTypes.STRING,
					unique: true
				}
			},
			{
				sequelize: connection,
				modelName: 'Category'
			}
		);
		return CategoryModel;
	}

	static async getAllCategories() {
		try {
			return await CategoryModel.findAll();
		} catch (error) {
			console.error('Erro ao obter categorias:', error);
			throw error;
		}
	}

	static async deleteCategory(id) {
		try {
			return await CategoryModel.destroy({ where: { id } });
		} catch (error) {
			console.error('Erro ao deletar categoria:', error);
			throw error;
		}
	}

	// src/categories/models/categoriesModel.js
   static associate(models) {
      this.hasMany(models.Article, {
          foreignKey: 'categoryId',
          as: 'articles'
      });
  }
}

export default CategoryModel;
