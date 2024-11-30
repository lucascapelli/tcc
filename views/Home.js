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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f5ebeb', // Mesma cor de fundo usada na boxLogin
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    color: 'rgb(66, 65, 65)', // Cor consistente com os links
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 12,
    borderRadius: 5,
    backgroundColor: '#fff', // Fundo branco para contraste
    shadowColor: '#000', // Adicionando sombra similar à boxLogin
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  button: {
    backgroundColor: 'rgb(66, 65, 65)', // Cor do botão
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  map: {
    width: '100%',
    height: 400,
    marginTop: 20,
    borderRadius: 10, // Bordas arredondadas para o mapa
    overflow: 'hidden', // Garante que o conteúdo não ultrapasse as bordas
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default Home;
