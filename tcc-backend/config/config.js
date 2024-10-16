// config/config.js

require('dotenv').config(); // Carrega as variáveis de ambiente do arquivo .env

module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'default_secret', // Chave secreta para JWT
};
