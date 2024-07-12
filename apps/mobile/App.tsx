import React, { useEffect, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import MapComponent from "./src/components/MapComponent";
import LocationPermission from "./src/components/LocationPermission";
import { fetchFoodTrucks } from "./src/utils/api";
import { StyleSheet, View } from "react-native";
import { LocationCoords, FoodTruck } from "./src/types";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
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
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.container}>
            <LocationPermission
              onLocationRetrieved={handleLocationRetrieved}
              onError={handleError}
            />
            <MapComponent location={location} foodTrucks={foodTrucks} />
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
