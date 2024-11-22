require("dotenv").config(); // Carrega variáveis de ambiente
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const userRoutes = require("./routes/user"); // Importa rotas de usuário
const { sequelize } = require("./models"); // Importa Sequelize

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware de CORS
app.use(
  cors({
    origin: "*", // URL do frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para analisar JSON
app.use(bodyParser.json());

// Rotas
app.use("/api", userRoutes);

// Rota para Direções do Google Maps
app.get("/api/google-maps-directions", async (req, res) => {
  const { origin, destination } = req.query;
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  try {
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

    res.json(response.data);
  } catch (error) {
    console.error("Erro ao buscar direções:", error.message);
    res.status(500).json({ error: "Erro ao buscar direções" });
  }
});

// Testa conexão com banco de dados
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
