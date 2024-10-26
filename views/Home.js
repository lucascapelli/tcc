import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from '../views/styles'; // Importa o arquivo de estilos

const Home = () => {
    const [rotas, setRotas] = useState([]);
    const [mapData, setMapData] = useState(null);

    useEffect(() => {
        // Função para buscar rotas
        const fetchRotas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/rotas');
                setRotas(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        // Função para buscar dados do mapa
        const getMapData = async () => {
            try {
                const latitude = 37.7749; // Substitua com coordenadas reais
                const longitude = -122.4194; // Substitua com coordenadas reais
                const response = await axios.get(`http://localhost:3000/api/map?latitude=${latitude}&longitude=${longitude}`);
                setMapData(response.data); // Armazena os dados do mapa no estado
            } catch (error) {
                console.log(error);
            }
        };

        fetchRotas();
        getMapData(); // Chama a função para buscar dados do mapa
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {rotas.map(rota => (
                <Text key={rota.ID_Rota}>{rota.Nome_Rota}</Text>
            ))}
            {/* Aqui você pode renderizar os dados do mapa conforme necessário */}
            {mapData && mapData.results && mapData.results.map((place, index) => (
                <Text key={index}>{place.name}</Text> // Renderiza o nome dos lugares encontrados
            ))}
        </View>
    );
};

export default Home;
