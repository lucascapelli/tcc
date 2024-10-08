import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View ,TextInput,TouchableOpacity, Button, Alert } from 'react-native';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native'; // Importe useNavigation
import styles from './styles'; // Importe os estilos
import { LinearGradient } from 'expo-linear-gradient'; // Importe o componente de gradiente
import axios from 'axios'; // Importe o axio

export default function login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation(); // Use o hook useNavigation

    const handleLogin = async () => {
      try {
          // Envia uma solicitação POST para o seu endpoint de login
          const response = await axios.post('http://10.10.10.42:3000/login', { // Altere a URL conforme necessário
              email,
              password,
          });

          // Verifica a resposta do servidor
          if (response.data.success) {
              // Se o login for bem-sucedido, navega para a tela inicial (home)
              navigation.navigate('Home'); // Certifique-se de que o nome da rota está correto
          } else {
              Alert.alert('Erro', response.data.message); // Mensagem de erro
          }
      } catch (error) {
          console.error(error);
          Alert.alert('Erro', 'Houve um problema ao tentar fazer login.');
      }
  };

    return (
        <LinearGradient 
        colors={['rgb(89, 26, 19)', 'rgba(242, 115, 51, 0.897)']}
        style={styles.container}
      >
      <View style={styles.boxLogin}>
        <Text style={styles.title}>Sejam Bem Vindos!</Text>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
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
            <Text style={styles.loginButtonText}>Login</Text> {/* Cor aplicada ao texto do botão */}
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