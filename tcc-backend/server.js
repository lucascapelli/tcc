const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user'); // Importa as rotas de usuário
const mapRoutes = require('./routes/mapRoutes'); // Importa as rotas de mapa
const { sequelize } = require('./models'); // Importa a instância do Sequelize
require('dotenv').config();

const app = express();
app.use(cors());
app.use(bodyParser.json()); // Para analisar o corpo da requisição em JSON

// Usar as rotas
app.use('/api', userRoutes); // Prefixa as rotas com '/api'
app.use('/api', mapRoutes); // Prefixa as rotas de mapa com '/api'

// Testa a conexão com o banco de dados
sequelize.authenticate()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  })
  .catch(err => {
    console.error('Não foi possível conectar ao banco de dados:', err);
  });

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
