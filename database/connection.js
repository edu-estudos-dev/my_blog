import { Sequelize } from 'sequelize';
import ArticlesModel from '../src/articles/models/articlesModel.js';
import CategoryModel from '../src/categories/models/categoriesModel.js';

const connection = new Sequelize('my_blog', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
	logging: false,
   timezone: "-03:00"
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
		// Inicializa e obtém as instâncias dos modelos
		const Category = CategoryModel.initModel(connection);
		const Article = ArticlesModel.initModel(connection);
		console.log('🎯 Modelos inicializados!');
		return { Category, Article };
	} catch (error) {
		console.error('❌ Erro na inicialização dos modelos:', error);
		process.exit(1);
	}
};

// Configurar associações
const setupAssociations = models => {
	try {
		// Passa todos os modelos para as associações
		CategoryModel.associate(models);
		ArticlesModel.associate(models);
		console.log('🔗 Associações configuradas!');
	} catch (error) {
		console.error('❌ Erro nas associações:', error);
		process.exit(1);
	}
};

// Sincronizar com o banco de dados
const syncDatabase = async () => {
	try {
		await connection.sync({ force: false, alter: false });
		console.log('🔄 Banco sincronizado!');
	} catch (error) {
		console.error('❌ Erro na sincronização:', error);
		process.exit(1);
	}
};

// Fluxo principal
const setupDatabase = async () => {
	await testConnection();
	const models = initializeModels();
	setupAssociations(models);
	await syncDatabase();
};

export { connection, setupDatabase };
