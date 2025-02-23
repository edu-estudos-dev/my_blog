import { DataTypes, Model } from 'sequelize';

class ArticlesModel extends Model {
	// Método de inicialização do model
	static initModel(connection) {
		ArticlesModel.init(
			{
				title: {
					type: DataTypes.STRING,
					allowNull: false,
					validate: {
						notEmpty: { msg: 'Título não pode ser vazio' }
					}
				},
				slug: {
					type: DataTypes.STRING,
					unique: true
				},
				body: {
					type: DataTypes.TEXT,
					allowNull: false
				},
				categoryId: {
					type: DataTypes.INTEGER,
					allowNull: false
				}
			},
			{
				sequelize: connection,
				modelName: 'Article'
			}
		);
		return ArticlesModel;
	}

	// Relacionamento entre as tabelas
	static associate(models) {
		this.belongsTo(models.Category, {
			foreignKey: 'categoryId',
			as: 'category'
		});
	}
}

export default ArticlesModel;
