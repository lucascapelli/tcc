const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models'); // Importa o modelo de usuário e o sequelize
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validate = require('validate.js');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

// Função para validar entrada de usuário
const validateUserInput = (email, name, password) => {
  const constraints = {
    email: {
      presence: true,
      email: true
    },
    name: {
      presence: true,
      length: {
        minimum: 2,
        maximum: 50
      }
    },
    password: {
      presence: true,
      length: {
        minimum: 8,
        maximum: 72
      }
    }
  };

  return validate({ email, name, password }, constraints);
};

// Função para criar um token JWT
const createToken = (user) => {
  return jwt.sign({ id: user.ID_Usuario, email: user.Email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  
  try {
    // Validação de entrada
    const validationErrors = validateUserInput(email, name, password);
    if (validationErrors) {
      return res.status(400).json({ success: false, message: 'Erro de validação', errors: validationErrors });
    }

    // Verifica se o e-mail já está cadastrado
    const existingUser = await User.findOne({ where: { Email: email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'E-mail já cadastrado.' });
    }
    
    // Transação Sequelize
    await sequelize.transaction(async (t) => {
      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criação do usuário
      const newUser = await User.create({
        Email: email,
        Nome: name,
        Senha: hashedPassword,
        Telefone: '', // Campo opcional
        Preferencia_De_Viagem: '', // Campo opcional
        Data_De_Cadastro: new Date(),
        Historico_De_Deslocamento: '' // Campo opcional
      }, { transaction: t });

      console.log('Usuário criado com sucesso:', newUser);

      // Geração do token JWT
      const token = createToken(newUser);
      
      res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', user: newUser, token });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao registrar o usuário', error: error.message });
  }
});

// Rota para fazer login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validação de entrada
    const validationErrors = validateUserInput(email, null, password);
    if (validationErrors) {
      return res.status(400).json({ success: false, message: 'Erro de validação', errors: validationErrors });
    }

    // Verifica se o usuário existe
    const user = await User.findOne({ where: { Email: email } });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Usuário não encontrado' });
    }

    // Compara a senha inserida com a senha hash armazenada
    const isValidPassword = await bcrypt.compare(password, user.Senha);

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Senha incorreta' });
    }

    // Gera o token JWT
    const token = createToken(user);
    
    res.json({ success: true, message: 'Login realizado com sucesso!', user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao realizar login', error: error.message });
  }
});

module.exports = router;
