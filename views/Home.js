import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import GOOGLE_MAPS_API_KEY from "../google-maps-api-key";

const Home = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current) return;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.7749, lng: -122.4194 },
        zoom: 14,
      });

      const originMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 37.7749, lng: -122.4194 },
        title: "Origem",
      });

      const destinationMarker = new google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: 37.7849, lng: -122.4094 },
        title: "Destino",
      });
    };

    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      initializeMap();
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo à Home!</Text>
      <View style={styles.map} ref={mapRef}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 400,
  },
});

export default Home;
