import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import MapComponent from "@components/MapComponent";
import LocationPermission from "@components/LocationPermission";
import { fetchFoodTrucks } from "@utils/api";
import { LocationCoords, FoodTruck } from "@types";

export default function MapPage() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

  useEffect(() => {
    const loadFoodTrucks = async () => {
      try {
        const data = await fetchFoodTrucks();
        setFoodTrucks(data);
      } catch (error) {
        console.error("Failed to fetch food trucks:", error);
      }
    };

    loadFoodTrucks();
  }, []);

  const handleLocationRetrieved = (loc: LocationCoords) => setLocation(loc);
  const handleError = (error: string) => setErrorMsg(error);
  return (
    <View style={styles.container}>
      <BlurView intensity={5} style={styles.statusBarBlur}>
        <StatusBar style="auto" />
      </BlurView>
      <LocationPermission
        onLocationRetrieved={handleLocationRetrieved}
        onError={handleError}
      />
      <MapComponent location={location} foodTrucks={foodTrucks} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBarBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Constants.statusBarHeight,
    zIndex: 1,
  },
});
