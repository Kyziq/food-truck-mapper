import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";

type LocationCoords = {
  latitude: number;
  longitude: number;
};

type FoodTruck = {
  id: number;
  name: string;
  latitude: string;
  longitude: string;
  schedule: string;
  operator_name: string;
};

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

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

    // Fetch food trucks data from the API
    const fetchFoodTrucks = async () => {
      try {
        const response = await fetch("http://192.168.0.106:3234/foodtrucks"); // Change this to your local IP address
        const data: FoodTruck[] = await response.json();
        setFoodTrucks(data);
      } catch (error) {
        console.error("Failed to fetch food trucks:", error);
      }
    };

    fetchFoodTrucks();
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
        {foodTrucks.map((truck) => (
          <Marker
            key={truck.id}
            coordinate={{
              latitude: parseFloat(truck.latitude),
              longitude: parseFloat(truck.longitude),
            }}
            title={truck.name}
            description={truck.schedule}
          >
            <Image
              source={require("./assets/truck-icon.png")}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
            />
          </Marker>
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
