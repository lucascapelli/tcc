import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import axios from 'axios';
import styles from '../views/styles'; // Importa o arquivo de estilos
import GOOGLE_MAPS_API_KEY from '../google-maps-api-key'; // Importa a chave da API

const Home = () => {
    const [rotas, setRotas] = useState([]);
    const [mapImageUrl, setMapImageUrl] = useState(null); // Estado para armazenar a URL da imagem do mapa

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

        // Função para buscar imagem do mapa
        const getMapImage = async () => {
            try {
                const latitude = 37.7749; // Substitua com coordenadas reais
                const longitude = -122.4194; // Substitua com coordenadas reais
                const zoom = 13; // Nível de zoom
                const size = '600x300'; // Tamanho da imagem

                // Monta a URL da imagem do mapa
                const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&key=${GOOGLE_MAPS_API_KEY}`;
                setMapImageUrl(mapUrl); // Armazena a URL da imagem do mapa
            } catch (error) {
                console.log(error);
            }
        };

        fetchRotas();
        getMapImage(); // Chama a função para buscar a imagem do mapa
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {rotas.map(rota => (
                <Text key={rota.ID_Rota}>{rota.Nome_Rota}</Text>
            ))}
            {/* Renderiza a imagem do mapa */}
            {mapImageUrl && <Image source={{ uri: mapImageUrl }} style={styles.mapImage} />}
        </View>
    );
};

// Estilo para a imagem do mapa
const localStyles = StyleSheet.create({
    mapImage: {
        width: '100%',
        height: 200, // Ajuste a altura conforme necessário
    },
});

export default Home;
