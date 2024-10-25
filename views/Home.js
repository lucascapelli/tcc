import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from '../views/styles'; // Importa o arquivo de estilos


const Home = () => {
    const [rotas, setRotas] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/rotas')
            .then(response => setRotas(response.data))
            .catch(error => console.log(error));
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {rotas.map(rota => (
                <Text key={rota.ID_Rota}>{rota.Nome_Rota}</Text>
            ))}
        </View>
    );
};

export default Home;
