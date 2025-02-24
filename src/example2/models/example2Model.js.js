import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Exemplo2 = sequelize.define('Exemplo2', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    slug: {
      type: DataTypes.STRING,
      unique: true
    }
  });

  Exemplo2.associate = (models) => {
    Exemplo2.belongsTo(models.Exemplo1, {   // exemplo2 pertence ao exemplo1
      foreignKey: 'exemplo1Id',          // a chave estrangeira é o id do exemplo1, pois ele é o principal
      as: 'exemplo1'
    });
  };

  return Exemplo2;
};