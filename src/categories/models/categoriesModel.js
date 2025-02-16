import { DataTypes, Model } from 'sequelize';

class CategoryModel extends Model {
    static initModel(connection) {
        CategoryModel.init(
            {
                title: {
                    type: DataTypes.STRING,
                    allowNull: false
                },
                slug: {
                    type: DataTypes.STRING,
                    allowNull: false
                }
            },
            {
                sequelize: connection,
                modelName: 'Category',
                tableName: 'categories'
            }
        );
    }

    static associate(models) {
        this.hasMany(models.ArticlesModel, { foreignKey: 'categoryId', as: 'articles' });
    }
}

// Exporta o modelo sem inicializar
export default CategoryModel;
