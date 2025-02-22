import { DataTypes, Model } from 'sequelize';

class ArticlesModel extends Model {
	static initModel(connection) {
		ArticlesModel.init(
			{
				title: DataTypes.STRING,
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

	static async getAllArticles() {
		try {
			return await ArticlesModel.findAll();
		} catch (error) {
			console.error('Erro ao obter artigos:', error);
			throw error;
		}
	}

	static async deleteArticle(id) {
		try {
			return await ArticlesModel.destroy({ where: { id } });
		} catch (error) {
			console.error('Erro ao deletar artigo:', error);
			throw error;
		}
	}

   static associate(models) {
      this.belongsTo(models.Category, {
          foreignKey: 'categoryId',
          as: 'category'
      });
  }
}

export default ArticlesModel;
