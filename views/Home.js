import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MapView, { Marker } from '@teovilla/react-native-web-maps';
import MapViewDirections from 'react-native-maps-directions';
import styles from '../views/styles';

const Home = () => {
    const [rotas, setRotas] = useState([]);
    const [origin, setOrigin] = useState({ latitude: 37.7749, longitude: -122.4194 });
    const [destination, setDestination] = useState({ latitude: 37.7849, longitude: -122.4094 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRotas = async () => {
            try {
                // Faz uma requisição para a rota '/api/rotas' no backend
                const response = await axios.get('http://192.168.0.7:3000/api/rotas'); 
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
                <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}  // Certifique-se de passar a chave corretamente aqui
                    strokeWidth={3}
                    strokeColor="hotpink"
                    onReady={(result) => {
                        console.log(result);
                    }}
                    onError={(errorMessage) => {
                        console.log('Error', errorMessage);
                    }}
                    // Endpoint modificado para utilizar o proxy local
                    mode="DRIVING"
                    precision="high"
                    optimizeWaypoints={true}
                />
            </MapView>
        </View>
    );
};

export default Home;
