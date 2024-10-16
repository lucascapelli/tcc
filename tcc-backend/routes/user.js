const express = require('express');
const router = express.Router();
const { User, sequelize } = require('../models'); // Importa o modelo de usuário e o sequelize
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const validate = require('validate.js');
const config = require('../config/config.js'); // Importando o arquivo de configuração

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env
console.log('JWT_SECRET:', process.env.JWT_SECRET); // Verifica se a chave está definida

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
  return jwt.sign({ id: user.ID_Usuario, email: user.Email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
};

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;
  
  console.log('Dados recebidos:', { email, name, password }); // Log dos dados recebidos

  try {
    // Validação de entrada
    const validationErrors = validateUserInput(email, name, password);
    if (validationErrors) {
      console.log('Erros de validação:', validationErrors); // Log dos erros de validação
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
        Historico_De_Deslocamento: '', // Campo opcional
      }, { transaction: t });

      console.log('Usuário criado com sucesso:', newUser);

      // Geração do token JWT
      const token = createToken(newUser);
      
      res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', user: newUser, token });
    });
  } catch (error) {
    console.error('Erro ao registrar o usuário:', error); // Log de erros
    res.status(500).json({ success: false, message: 'Erro ao registrar o usuário', error: error.message });
  }
});

// Rota para login (exemplo)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Encontre o usuário pelo e-mail
    const user = await User.findOne({ where: { Email: email } });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Verifique se a senha está correta
    const isPasswordValid = await bcrypt.compare(password, user.Senha);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Credenciais inválidas' });
    }

    // Geração do token JWT
    const token = createToken(user);

    res.status(200).json({ success: true, message: 'Login realizado com sucesso!', user, token });
  } catch (error) {
    console.error('Erro ao fazer login:', error); // Log de erros
    res.status(500).json({ success: false, message: 'Erro ao fazer login', error: error.message });
  }
});

module.exports = router;
