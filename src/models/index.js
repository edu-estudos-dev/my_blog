import { Sequelize } from 'sequelize';
import examplo1Model from '../exemplo1/models/exemplo1Model.js';
import examplo2Model from '../exemplo2/models/exemplo2Model.js';

const sequelize = new Sequelize('nome do banco de dados', 'root', '', {
	host: 'localhost',
	dialect: 'mysql',
	port: 3306,
	logging: false,
	timezone: '-03:00'
});

// Inicializar todos os modelos
const Examplo1 = examplo1Model(sequelize);
const Examplo2 = examplo2Model(sequelize);

// Configurar associações
const models = {
	Examplo1,
	Examplo2
};

// Aplicar associações
Examplo1.associate(models);
Examplo2.associate(models);

export { models, sequelize };
