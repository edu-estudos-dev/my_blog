import { Sequelize } from 'sequelize';
import ArticlesModel from '../articles/models/articlesModel.js';
import CategoryModel from '../categories/models/categoriesModel.js';

const connection = new Sequelize('my_blog', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

testConnection();

// Inicialize os modelos passando a conexão
CategoryModel.initModel(connection);
ArticlesModel.initModel(connection);

// Associe os modelos
CategoryModel.associate({ ArticlesModel });
ArticlesModel.associate({ CategoryModel });

// Sincronize os modelos com o banco de dados
const syncDatabase = async () => {
    try {
        await connection.sync({ alter: false });
        console.log('As tabelas foram criadas ou atualizadas com sucesso.');
    } catch (error) {
        console.error('Erro ao sincronizar as tabelas:', error);
    }
};

syncDatabase();

export default connection;
