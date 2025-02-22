import { Sequelize } from 'sequelize';
import ArticlesModel from '../src/articles/models/articlesModel.js';
import CategoryModel from '../src/categories/models/categoriesModel.js';

const connection = new Sequelize('my_blog', 'root', '', {
    host: '127.0.0.1',
    dialect: 'mysql',
    logging: false
});

// Testar conexão com o banco
const testConnection = async () => {
    try {
        await connection.authenticate();
        console.log('✅ Conexão com o banco estabelecida!');
    } catch (error) {
        console.error('❌ Falha na conexão com o banco:', error);
        process.exit(1);
    }
};

// Inicializar modelos
const initializeModels = () => {
    try {
        CategoryModel.initModel(connection);
        ArticlesModel.initModel(connection);
        console.log('🎯 Modelos inicializados!');
    } catch (error) {
        console.error('❌ Erro na inicialização dos modelos:', error);
        process.exit(1);
    }
};

// Configurar associações
const setupAssociations = () => {
   try {
       // Passe os modelos diretamente (não use connection.models)
       CategoryModel.associate({ ArticlesModel });
       ArticlesModel.associate({ CategoryModel });
       console.log('🔗 Associações configuradas!');
   } catch (error) {
       console.error('❌ Erro nas associações:', error);
       process.exit(1);
   }
};

// Sincronizar com o banco de dados
const syncDatabase = async () => {
    try {
        await connection.sync({ alter: false });
        console.log('🔄 Banco sincronizado!');
    } catch (error) {
        console.error('❌ Erro na sincronização:', error);
        process.exit(1);
    }
};

// Fluxo principal
const setupDatabase = async () => {
    await testConnection();
    initializeModels();
    setupAssociations();
    await syncDatabase();
};

export {
    connection,
    setupDatabase
};