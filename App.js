import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';

// Importe seus screens aqui
import login from './views/login';
import ForgotPasswordScreen from './views/Esqueceu_Senha';
import SignUpScreen from './views/Criar_Conta';
import ResetPasswordScreen from './views/Esqueceu_Senha';
import HomeScreen from './views/Home';

// Configurar Axios
const api = axios.create({
  baseURL: 'http://10.10.10.42:3000', // Substitua pela URL real do seu backend
  withCredentials: true, // Permite o uso de cookies
});

// Interceptores de Axios
api.interceptors.request.use(
  (config) => {
    // Adicione headers necessários aqui, se necessário
    return config;
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Erro de rede:', error.message);
    // Trate erros conforme necessário
    return Promise.reject(error);
  }
);

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {
    // Aqui você pode fazer chamadas de API iniciais, se necessário
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="login" component={login} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Criar Conta' }} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}