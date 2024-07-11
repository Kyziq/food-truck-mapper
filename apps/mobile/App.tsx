import React, { useEffect, useState } from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type LocationCoords = {
  latitude: number;
  longitude: number;
};

const coordinates = [
  { latitude: 6.484502613485699, longitude: 100.15292748609222 },
  { latitude: 6.464147480466234, longitude: 100.24028517369136 },
  { latitude: 6.465773594485885, longitude: 100.15569238870664 },
  { latitude: 6.42504136979509, longitude: 100.19511569310251 },
  { latitude: 6.461272961509523, longitude: 100.18291406671028 },
  { latitude: 6.422704650732263, longitude: 100.16859365742137 },
  { latitude: 6.398735169573326, longitude: 100.2084033033223 },
  { latitude: 6.453985319261708, longitude: 100.1848869267669 },
  { latitude: 6.477055850575472, longitude: 100.2025060561632 },
];

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  let region = {
    latitude: 3.139, // Latitude for Kuala Lumpur, Malaysia
    longitude: 101.6869, // Longitude for Kuala Lumpur, Malaysia
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  if (location) {
    region = {
      ...region,
      latitude: location.latitude,
      longitude: location.longitude,
    };
  }

  return (
    <SafeAreaView style={styles.container}>
      <MapView style={styles.map} initialRegion={region}>
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title={"Your Location"}
          />
        )}
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: coord.latitude,
              longitude: coord.longitude,
            }}
            title={`Location ${index + 1}`}
          />
        ))}
      </MapView>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
