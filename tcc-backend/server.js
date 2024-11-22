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
app.use(cors());

/*// Middleware do CORS (controlado pelo pacote cors)
app.use(
  cors({
    origin: ["http://10.10.10.2", "http://localhost:19006"], // Origem permitida
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  })
);

// Configurações adicionais de cabeçalhos globais
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Permite qualquer origem como fallback
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  ); // Garante os métodos suportados
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // Garantia de cabeçalhos
  next();
});

// Tratamento de requisições OPTIONS (Preflight Requests)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.sendStatus(204); // Resposta rápida e sem conteúdo
});*/

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
