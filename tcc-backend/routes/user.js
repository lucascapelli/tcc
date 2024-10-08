const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Importa o modelo de usuário

// Rota para registrar um novo usuário
router.post('/register', async (req, res) => {
  const { email, name, password } = req.body;

  try {
    // Cria um novo usuário usando o modelo do Sequelize
    let newUser = await User.create({
      Email: email,
      Nome: name,
      Senha: password,
      Telefone: '',
      Preferencia_De_Viagem: '',
      Data_De_Cadastro: new Date(),
      Historico_De_Deslocamento: ''
    });

    res.status(201).json({ success: true, message: 'Usuário registrado com sucesso!', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao registrar o usuário' });
  }
});

// Rota para fazer login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Busca o usuário pelo email
    const user = await User.findOne({ where: { Email: email } });

    // Verifica se o usuário existe e se a senha está correta
    if (user && user.Senha === password) {
      res.status(200).json({ success: true, message: 'Login realizado com sucesso!', user });
    } else {
      res.status(401).json({ success: false, message: 'Usuário ou senha incorretos' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erro ao realizar login' });
  }
});

module.exports = router;
