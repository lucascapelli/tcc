import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from '../views/styles'; // Importa o arquivo de estilos
import GOOGLE_MAPS_API_KEY from '../google-maps-api-key'; // Importa a chave da API

const Home = () => {
    const [rotas, setRotas] = useState([]);
    const [origin, setOrigin] = useState({ latitude: 37.7749, longitude: -122.4194 }); // Coordenadas da origem
    const [destination, setDestination] = useState({ latitude: 37.7849, longitude: -122.4094 }); // Coordenadas do destino

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

        fetchRotas();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {rotas.map(rota => (
                <Text key={rota.ID_Rota}>{rota.Nome_Rota}</Text>
            ))}
            {/* Renderiza o mapa */}
            <MapView
                style={{ flex: 1, height: 400 }} // Ajuste a altura conforme necessário
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_API_KEY} // Substitua pela sua chave API do Google Maps
                    strokeWidth={3}
                    strokeColor="blue"
                />
                <Marker coordinate={origin} title="Origem" />
                <Marker coordinate={destination} title="Destino" />
            </MapView>
        </View>
    );
};

// Adicione seu estilo aqui, se necessário

export default Home;
