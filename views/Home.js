import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';
import styles from '../views/styles'; // Importa o arquivo de estilos

const Home = () => {
    const [rotas, setRotas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/rota') // Altera para a rota correta
            .then(response => setRotas(response.data))
            .catch(error => console.log('Erro ao buscar rotas:', error)); // Mensagem de erro mais clara
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {rotas.map(rota => (
                <Text key={rota.id}> {/* Altera para o nome da chave correta (id) */}
                    {rota.nome_rota} {/* Altera para o nome da chave correta (nome_rota) */}
                </Text>
            ))}
        </View>
    );
};

export default Home;
