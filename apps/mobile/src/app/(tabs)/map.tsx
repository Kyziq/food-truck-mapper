import React, { useCallback, useEffect, useState } from "react";
import { View, StyleSheet, Text, ActivityIndicator } from "react-native";
import { StatusBar } from "expo-status-bar";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import MapComponent from "@components/MapComponent";
import LocationPermission from "@components/LocationPermission";
import { fetchFoodTrucks } from "@utils/api";
import { LocationCoords, FoodTruck } from "@types";

export default function MapPage() {
  const [foodTrucks, setFoodTrucks] = useState<FoodTruck[]>([]);
  const [location, setLocation] = useState<LocationCoords | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const loadFoodTrucks = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFoodTrucks();
      setFoodTrucks(data);
      setErrorMsg(null);
    } catch (error) {
      console.error("Failed to fetch food trucks:", error);
      setErrorMsg("Failed to load food trucks.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFoodTrucks();
  }, [loadFoodTrucks]);

  const handleLocationRetrieved = (loc: LocationCoords) => setLocation(loc);
  const handleError = (error: string) => setErrorMsg(error);

  return (
    <View style={styles.container}>
      {/* Status bar with blur effect */}
      <BlurView intensity={5} style={styles.statusBarBlur}>
        <StatusBar style="auto" />
      </BlurView>

      {/* Location Permission component */}
      <LocationPermission
        onLocationRetrieved={handleLocationRetrieved}
        onError={handleError}
      />

      {/* Error message display */}
      {errorMsg && <Text style={styles.errorText}>{errorMsg}</Text>}

      {/* Map component with food trucks */}
      <MapComponent
        location={location}
        foodTrucks={foodTrucks}
        loadFoodTrucks={loadFoodTrucks}
      />

      {/* Loading overlay */}
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
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
  errorText: {
    color: "red",
    textAlign: "center",
    margin: 10,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
