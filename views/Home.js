import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from '@teovilla/react-native-web-maps'; 
import MapViewDirections from 'react-native-maps-directions';
import styles from '../views/styles';
import GOOGLE_MAPS_API_KEY from '../google-maps-api-key';

const Home = () => {
    const [rotas, setRotas] = useState([]);
    const [origin, setOrigin] = useState({ latitude: 37.7749, longitude: -122.4194 });
    const [destination, setDestination] = useState({ latitude: 37.7849, longitude: -122.4094 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRotas = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/rotas'); // Cuidado com CORS
                setRotas(response.data);
                console.log('Rotas recebidas:', response.data);
            } catch (error) {
                console.error('Erro ao buscar rotas:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRotas();
    }, []);

    console.log('Estado das rotas:', rotas);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Bem-vindo à Home!</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : rotas.length > 0 ? (
                rotas.map(rota => (
                    <Text key={rota.ID_Rota}>{rota.Nome_Rota}</Text>
                ))
            ) : (
                <Text>Nenhuma rota encontrada.</Text>
            )}
            {/* Renderiza o mapa */}
            <MapView
                provider="google"
                style={{ flex: 1, height: 400 }}
                initialRegion={{
                    latitude: origin.latitude,
                    longitude: origin.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker coordinate={origin} title="Origem" />
                <Marker coordinate={destination} title="Destino" />
                {/* Adiciona a rota ao mapa */}
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onReady={(result) => {
                        console.log(result); // Você pode usar esse resultado se necessário
                    }}
                    onError={(errorMessage) => {
                        console.log('Error', errorMessage);
                    }}
                />
            </MapView>
        </View>
    );
};

export default Home;
