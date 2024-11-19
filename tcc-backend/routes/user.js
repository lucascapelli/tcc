const express = require("express");
const axios = require("axios");
const router = express.Router();
const { User, sequelize } = require("../models"); // Importa o modelo de usuário e o sequelize
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const validate = require("validate.js");
const config = require("../config/config.js"); // Importando o arquivo de configuração
const { Rota } = require("../models"); // Certifique-se de importar o modelo Rota

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
console.log("JWT_SECRET:", process.env.JWT_SECRET); // Verifica se a chave está definida

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY; // Certifique-se de que a variável de ambiente está configurada

// Função para validar entrada de usuário
const validateUserInput = (email, name, password) => {
  const constraints = {
    email: {
      presence: true,
      email: true,
    },
    name: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 50,
      },
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        maximum: 72,
      },
    },
  };

  return validate({ email, name, password }, constraints);
};

// Função para criar um token JWT
const createToken = (user) => {
  return jwt.sign(
    { id: user.ID_Usuario, email: user.Email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// Rota para registrar um novo usuário
router.post("/register", async (req, res) => {
  const { email, name, password } = req.body;

  console.log("Dados recebidos:", { email, name, password });

  try {
    const validationErrors = validateUserInput(email, name, password);
    if (validationErrors) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Erro de validação",
          errors: validationErrors,
        });
    }

    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "E-mail já cadastrado." });
    }

    await sequelize.transaction(async (t) => {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create(
        {
          Email: email,
          Nome: name,
          Senha: hashedPassword,
          Telefone: "",
          Preferencia_De_Viagem: "",
          Data_De_Cadastro: new Date(),
          Historico_De_Deslocamento: "",
        },
        { transaction: t }
      );

      const token = createToken(newUser);

      res
        .status(201)
        .json({
          success: true,
          message: "Usuário registrado com sucesso!",
          user: newUser,
          token,
        });
    });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao registrar o usuário",
        error: error.message,
      });
  }
});

// Rota para login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.Senha);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Credenciais inválidas" });
    }

    const token = createToken(user);

    res
      .status(200)
      .json({
        success: true,
        message: "Login realizado com sucesso!",
        user,
        token,
      });
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Erro ao fazer login",
        error: error.message,
      });
  }
});

// Rota para listar todas as rotas
router.get("/rotas", async (req, res) => {
  try {
    const rotas = await Rota.findAll();
    res.status(200).json(rotas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar rotas" });
  }
});

// Rota para criar uma nova rota
router.post("/rotas", async (req, res) => {
  const {
    nome_rota,
    origem,
    destino,
    distancia_km,
    duracao_tempo,
    id_usuario,
  } = req.body;

  try {
    const novaRota = await Rota.create({
      nome_rota,
      origem,
      destino,
      distancia_km,
      duracao_tempo,
      id_usuario,
    });
    res.status(201).json(novaRota);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar rota" });
  }
});

// Rota para obter direções do Google Maps
router.get("/google-maps-directions", async (req, res) => {
  const { origin, destination } = req.query;

  if (!origin || !destination) {
    return res
      .status(400)
      .json({ error: "Origin and destination are required." });
  }
/*
  try {
    await fetch("https://maps.googleapis.com/maps/api/directions/json",{

      method: "GET",
      headers:{
        "Access-Control-Allow-Origin":"*",
            "Content-Type": "application/json",
      }
    }
    )
    
  } catch (error) {
    
  }*/
console.log("Flavio Otario");
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/directions/json",
      {
        params: {
          origin,
          destination,
          key: GOOGLE_MAPS_API_KEY,
          mode: "driving",
        },
        method:"GET",
        
        headers:
          {
            "Access-Control-Allow-Origin":"*",
            "Content-Type": "application/json",
            
          }
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch directions." });
  }
    
});

module.exports = router;
