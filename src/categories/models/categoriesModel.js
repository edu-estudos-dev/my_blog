import { DataTypes, Model } from 'sequelize';

class CategoryModel extends Model {
	static initModel(connection) {
		// Método de inicialização do model
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

	// Relacionamento entre as tabelas
	static associate(models) {
		this.hasMany(models.Article, {
			foreignKey: 'categoryId',
			as: 'articles'
		});
	}
}

export default CategoryModel;
