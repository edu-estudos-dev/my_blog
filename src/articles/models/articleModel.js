// src/articles/models/articleModel.js
import { DataTypes } from 'sequelize';

export default sequelize => {
	const Article = sequelize.define('Article', {
		title: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		slug: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false
		},
		body: {
			type: DataTypes.TEXT,
			allowNull: false,
			validate: {
				notEmpty: true
			}
		},
		categoryId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	});

	Article.associate = models => {
		Article.belongsTo(models.Category, {
			foreignKey: 'categoryId',
			as: 'category'
		});
	};

	return Article;
};
