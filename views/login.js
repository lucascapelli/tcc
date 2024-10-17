import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import { LinearGradient } from 'expo-linear-gradient';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    console.log('Username:', username);
    console.log('Password:', password);
  }, [username, password]);

  const handleChange = (text) => {
    setUsername(text);
    console.log('Input value:', text);
  };

  const handleLogin = async () => {
    if (username.trim().length === 0 || password.trim().length === 0) {
      Alert.alert('Atenção', 'Por favor, preencha ambos os campos.');
      return;
    }

    try {
      // Atualizando a URL para o endpoint de login
      const response = await fetch('http://localhost:3000/api/login', { // Alterado para /api/login
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }) // Alterando "username" para "email"
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`HTTP error! status: ${response.status}. Message: ${errorData.message}`);
      }

      const data = await response.json();

      if (data.success) {
        // Autenticado com sucesso!
        console.log('Login bem-sucedido!');
        // Aqui você deve salvar o token de acesso ou realizar outras ações necessárias após o login bem-sucedido
        // Exemplo: salvar o token no AsyncStorage
        // await AsyncStorage.setItem('token', data.token);
        
        // Redirecionar para a tela inicial ou realizar outras ações
        navigation.navigate('Home'); // Redireciona para a tela inicial após o login
      } else {
        throw new Error(data.message || 'Falha na autenticação');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Erro', error.message || 'Falha na conexão com o servidor. Por favor, tente novamente.');
    }
  };

  return (
    <LinearGradient colors={['rgb(89, 26, 19)', 'rgba(242, 115, 51, 0.897)']} style={styles.container}>
      <View style={styles.boxLogin}>
        <Text style={styles.title}>Sejam Bem Vindos!</Text>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email" // Alterado de "Username" para "Email"
            value={username}
            onChangeText={handleChange}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.linkButtonText}>Esqueceu a sua senha?</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkButton} onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkButtonText}>Criar uma conta</Text>
          </TouchableOpacity>
        </View>
      </View>
      <StatusBar style="auto" />
    </LinearGradient>
  );
}
