import { DataTypes, Model } from 'sequelize';

class ArticlesModel extends Model {
    static initModel(sequelize) {
        ArticlesModel.init(
            {
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                body: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                modelName: 'Articles',
                tableName: 'articles'
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.CategoryModel, { foreignKey: 'categoryId', as: 'category' });
    }
}

// Exporta o modelo sem inicializar
export default ArticlesModel;
