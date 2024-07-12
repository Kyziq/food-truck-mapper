import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MapComponent from "./src/components/MapComponent";
import LocationPermission from "./src/components/LocationPermission";
import { fetchFoodTrucks } from "./src/utils/api";
import { StyleSheet, Dimensions } from "react-native";
import { LocationCoords, FoodTruck } from "./src/types";

export default function App() {
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);

  useEffect(() => {
    const loadFoodTrucks = async () => {
      const data = await fetchFoodTrucks();
      setFoodTrucks(data);
    };

    loadFoodTrucks();
  }, []);

  const handleLocationRetrieved = (loc: LocationCoords) => setLocation(loc);
  const handleError = (error: string) => setErrorMsg(error);

  return (
    <SafeAreaView style={styles.container}>
      <LocationPermission
        onLocationRetrieved={handleLocationRetrieved}
        onError={handleError}
      />
      <MapComponent location={location} foodTrucks={foodTrucks} />
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
