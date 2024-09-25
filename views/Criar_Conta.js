import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, View, Alert } from 'react-native';
import styles from './styles'; // Importe os estilos do arquivo styles.js

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
    fetch('https://seu-backend.com/api/register', {
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
    <View style={styles.body}>
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
  );
}

