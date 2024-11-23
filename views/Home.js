import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import GOOGLE_MAPS_API_KEY from "../google-maps-api-key";

const Home = () => {
  const mapRef = useRef(null);
  const [origin, setOrigin] = useState(""); // Estado para o endereço de origem
  const [destination, setDestination] = useState(""); // Estado para o endereço de destino
  const [directionsService, setDirectionsService] = useState(null); // Serviço de direções
  const [directionsRenderer, setDirectionsRenderer] = useState(null); // Renderizador de direções

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&callback=initMap`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    };

    // Inicializa o mapa e os serviços
    window.initMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14,
      });

      const directionsServiceInstance = new google.maps.DirectionsService();
      const directionsRendererInstance = new google.maps.DirectionsRenderer({
        map: map,
      });

      setDirectionsService(directionsServiceInstance);
      setDirectionsRenderer(directionsRendererInstance);
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      window.initMap();
    }
  }, []);

  const handleRouteCalculation = () => {
    if (!origin || !destination || !directionsService || !directionsRenderer) return;

    const geocoder = new google.maps.Geocoder();

    // Converte o endereço de origem em coordenadas
    geocoder.geocode({ address: origin }, (results, status) => {
      if (status === "OK") {
        const originLatLng = results[0].geometry.location;

        // Converte o endereço de destino em coordenadas
        geocoder.geocode({ address: destination }, (results, status) => {
          if (status === "OK") {
            const destinationLatLng = results[0].geometry.location;

            // Calcula a rota entre os dois locais
            const request = {
              origin: originLatLng,
              destination: destinationLatLng,
              travelMode: google.maps.TravelMode.DRIVING,
            };

            directionsService.route(request, (result, status) => {
              if (status === "OK") {
                directionsRenderer.setDirections(result);
              } else {
                alert("Erro ao calcular a rota: " + status);
              }
            });
          } else {
            alert("Não foi possível geocodificar o endereço de destino.");
          }
        });
      } else {
        alert("Não foi possível geocodificar o endereço de origem.");
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      
      {/* Input para endereço de origem */}
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço de origem"
        value={origin}
        onChangeText={setOrigin}
      />
      
      {/* Input para endereço de destino */}
      <TextInput
        style={styles.input}
        placeholder="Digite o endereço de destino"
        value={destination}
        onChangeText={setDestination}
      />
      
      {/* Botão para calcular a rota */}
      <Button title="Calcular Rota" onPress={handleRouteCalculation} />

      <View style={styles.map} ref={mapRef}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  map: {
    width: "100%",
    height: 400,
    marginTop: 20,
  },
});

export default Home;
