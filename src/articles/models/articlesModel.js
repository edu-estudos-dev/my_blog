// src/articles/models/articlesModel.js
import { Model, DataTypes } from 'sequelize';

class ArticlesModel extends Model {
    static initModel(connection) {
        ArticlesModel.init(
            {
                title: DataTypes.STRING,
                body: DataTypes.TEXT
            },
            {
                sequelize: connection,
                modelName: 'Article'
            }
        );
        return ArticlesModel; // Retorne a classe
    }

    static associate(models) {
        this.belongsTo(models.CategoryModel, {
            foreignKey: 'categoryId',
            as: 'category'
        });
    }
}

export default ArticlesModel;