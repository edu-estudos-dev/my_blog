import { DataTypes } from 'sequelize';

export default (sequelize) => {
  const Exemplo1 = sequelize.define('Exemplo1', {
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

  Exemplo1.associate = (models) => {
    Exemplo1.hasMany(models.Exemplo2, {   // exemplo1 tem muitos exemplo2
      foreignKey: 'exemplo1Id',          // a chave estrangeira é o id do exemplo1, pois ele é o principal
      as: 'exemplo2'
    });
  };

  return Exemplo1;
};