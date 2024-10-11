import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import styles from './styles'; // Importe os estilos do arquivo styles.js
import { LinearGradient } from 'expo-linear-gradient'; // Importe o componente de gradiente

export default function ResetPasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleResetPassword = () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não correspondem');
      return;
    }

    // Enviar o código de verificação e a nova senha para a sua API
    fetch('https://seu-backend.com/api/reset-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        verificationCode,
        newPassword,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          Alert.alert('Sucesso', 'Senha redefinida com sucesso!');
          // Redirecionar para a tela de login ou outra ação
          navigation.navigate('Login'); // Navegar para a tela de login após sucesso
        } else {
          Alert.alert('Erro', data.message || 'Ocorreu um erro');
        }
      })
      .catch(error => {
        console.error('Erro:', error);
        Alert.alert('Erro', 'Não foi possível redefinir a senha');
      });
  };

  return (
    <LinearGradient 
        colors={['rgb(89, 26, 19)', 'rgba(242, 115, 51, 0.897)']}
        style={styles.container}
      >
    <View style={styles.boxLogin}>
      <Text style={styles.title}>Redefinir Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Código de Verificação"
        value={verificationCode}
        onChangeText={setVerificationCode}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Nova Senha"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Nova Senha"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Redefinir Senha</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
}