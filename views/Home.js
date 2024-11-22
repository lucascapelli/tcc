import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import axios from "axios";
import MapView, { Marker } from "@teovilla/react-native-web-maps";
import MapViewDirections from "react-native-maps-directions";
import styles from "../views/styles";
import GOOGLE_MAPS_API_KEY from "../google-maps-api-key";

console.log("GOOGLE_MAPS_API_KEY (frontend):", GOOGLE_MAPS_API_KEY);

const Home = () => {
  const [origin, setOrigin] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
  });
  const [destination, setDestination] = useState({
    latitude: 37.7849,
    longitude: -122.4094,
  });
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Função para buscar a rota do backend
  const fetchRoute = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://192.168.56.1:3000/api/google-maps-directions", {
        params: {
          origin: `${origin.latitude},${origin.longitude}`,
          destination: `${destination.latitude},${destination.longitude}`,
        },
      });
      setRouteData(response.data);
      console.log("Dados da rota:", response.data);
    } catch (error) {
      console.error("Erro ao buscar a rota:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoute();
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : routeData ? (
        <Text>Distância: {routeData.routes[0]?.legs[0]?.distance?.text}</Text>
      ) : (
        <Text>Carregando dados da rota...</Text>
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
          apikey={GOOGLE_MAPS_API_KEY}
          strokeWidth={3}
          strokeColor="hotpink"
          onReady={(result) => console.log(result)}
          onError={(errorMessage) => console.log("Error", errorMessage)}
          mode="DRIVING"
        />
      </MapView>
    </View>
  );
};

export default Home;
