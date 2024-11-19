require("dotenv").config(); // Carrega as variáveis de ambiente do .env
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const userRoutes = require("./routes/user"); // Importa as rotas de usuário
const { sequelize } = require("./models"); // Importa a instância do Sequelize
const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Agora você usa a chave do .env

console.log(process.env.GOOGLE_MAPS_API_KEY); // Verifica se a chave está sendo carregada corretamente

const app = express();
const PORT = process.env.PORT || 3000;

// Configurações de CORS
app.use(cors({ origin: ["http://10.10.10.227:19006"],  })); // Permite todas as origens (você pode restringir isso conforme necessário)
app.use(bodyParser.json()); // Para analisar o corpo da requisição em JSON

// Usar as rotas
app.use("/api", userRoutes); // Prefixa as rotas com '/api'

// Rota para a API de Direções do Google Maps
app.get("/api/google-maps-directions", async (req, res) => {
  const { origin, destination } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY; // Supondo que sua chave está no arquivo .env

  try {
    // Faz a requisição para a API de Direções do Google Maps
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin,
          destination,
          key: apiKey,
          mode: "driving",
          language: "en",
        },
      }
    );

    // Retorna a resposta JSON para o cliente
    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar direções:", error.message);
    res.status(500).json({ error: "Erro ao buscar direções" });
  }
});

// Testa a conexão com o banco de dados
sequelize
  .authenticate()
  .then(() => {
    console.log("Conexão com o banco de dados estabelecida com sucesso.");
  })
  .catch((err) => {
    console.error("Não foi possível conectar ao banco de dados:", err);
  });

// Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
