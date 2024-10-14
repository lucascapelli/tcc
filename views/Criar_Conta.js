import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import styles from './styles'; // Importe os estilos do arquivo styles.js
import { LinearGradient } from 'expo-linear-gradient'; // Importe o componente de gradiente

export default function SignUpScreen() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    // Verifica se as senhas correspondem
    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem');
      return;
    }

    // Aqui você enviaria os dados para a sua API backend
    fetch('http://localhost:3000/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        name,
        password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Alert.alert('Sucesso', 'Conta criada com sucesso!');
          // Redirecionar ou limpar os campos
        } else {
          Alert.alert('Erro', data.message || 'Ocorreu um erro');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Não foi possível criar a conta');
      });
  };

  return (
    <LinearGradient 
        colors={['rgb(89, 26, 19)', 'rgba(242, 115, 51, 0.897)']}
        style={styles.container}
      >
    <View style={styles.boxLogin}>
      <Text style={styles.title}>Crie a sua conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        autoCapitalize="words"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Repetir Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Registrar</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}

