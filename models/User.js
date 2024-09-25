// models/User.js

'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // Defina os campos da tabela "User"
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  // Aqui você pode definir associações, se houver, por exemplo:
  // User.associate = function(models) {
  //   // Associações com outras tabelas
  // };

  return User;
};