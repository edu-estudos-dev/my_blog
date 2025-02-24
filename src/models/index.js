import { Sequelize } from 'sequelize';
import categoryModel from '../categories/models/categoryModel.js';
import articleModel from '../articles/models/articleModel.js';

const sequelize = new Sequelize('my_blog', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: false,
  timezone: '-03:00'
});

// Inicializar todos os modelos
const Category = categoryModel(sequelize);
const Article = articleModel(sequelize);

// Configurar associações
const models = {
  Category,
  Article
};

// Aplicar associações
Category.associate(models);
Article.associate(models);

export { sequelize, models };